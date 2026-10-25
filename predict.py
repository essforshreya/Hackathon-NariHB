"""NariHB inference adapter for the EfficientNet-B0 dual-head checkpoint.

Research prototype only. The checkpoint's reported metrics are not clinical validation.
"""
from __future__ import annotations
import json
from dataclasses import asdict, dataclass, field
from pathlib import Path
from time import perf_counter
import torch
from torch import nn
from PIL import Image, ImageOps
from torchvision import transforms
import timm

from config import PROJECT_ROOT, TRAINING_CONFIG
from image_validator import validate_image
from model import latest_available_checkpoint

HB_MEAN = 10.359
HB_STD = 2.259
IMG_SIZE = 224
MEAN = (0.485, 0.456, 0.406)
STD = (0.229, 0.224, 0.225)

def autocast_context():
    from contextlib import nullcontext
    return nullcontext()

def normalize_prediction_label(predicted_class: str) -> str:
    return "Non-Anemic" if predicted_class.strip().lower().startswith("non") else "Anemic"

def compute_risk_metadata(prediction: str, confidence: float) -> tuple[str, str]:
    # Labels are presentation-only and must not be interpreted as clinical risk scores.
    return ("Screening flag", "Experimental image-model output only; confirm concerns with a qualified clinician and a blood test.")

def medical_advice_lines(prediction: str) -> list[str]:
    return [
        "This experimental image result cannot diagnose or rule out anaemia.",
        "Please consult a qualified healthcare professional and consider a laboratory haemoglobin test or complete blood count (CBC).",
        "Seek urgent care for severe breathlessness, chest pain, fainting, or severe weakness."
    ]

def estimate_hemoglobin_range(prediction: str, confidence: float) -> str:
    return "Not available from the legacy categorical estimate; see experimental regression output when provided."

@dataclass(frozen=True)
class PredictionResult:
    prediction: str | None
    confidence: float
    anemic_probability: float
    non_anemic_probability: float
    risk_level: str | None
    risk_explanation: str
    gradcam_path: str | None
    medical_advice: str
    hemoglobin_estimate: str | None
    processing_time_ms: int
    image_quality: str | None
    error: str | None = None
    warnings: list[str] = field(default_factory=list)
    experimental_hb_g_dl: float | None = None

    @property
    def predicted_class(self) -> str:
        return (self.prediction or "").lower()
    @property
    def predicted_index(self) -> int:
        return 1 if self.prediction == "Anemic" else 0
    @property
    def probabilities(self) -> dict[str, float]:
        return {"anemic": self.anemic_probability, "non_anemic": self.non_anemic_probability}
    def to_dict(self) -> dict[str, object]:
        return asdict(self)
    def to_json(self) -> str:
        return json.dumps(self.to_dict(), indent=2)

class AnemiaDetector(nn.Module):
    def __init__(self):
        super().__init__()
        self.backbone = timm.create_model("efficientnet_b0", pretrained=False, num_classes=0)
        self.head_cls = nn.Sequential(nn.Dropout(0.3), nn.Linear(1280, 1))
        self.head_reg = nn.Sequential(
            nn.Linear(1280, 512), nn.ReLU(), nn.Dropout(0.3),
            nn.Linear(512, 128), nn.ReLU(), nn.Dropout(0.3), nn.Linear(128, 1)
        )
    def forward(self, x):
        features = self.backbone(x)
        return self.head_cls(features), self.head_reg(features)

class AnemiaPredictor:
    def __init__(self, checkpoint_path: Path | None = None, auto_calibrate: bool = False):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.checkpoint_path = Path(checkpoint_path or latest_available_checkpoint() or (PROJECT_ROOT / "models" / "narihb_efficientnet_b0.pt"))
        self.model = AnemiaDetector()
        state = torch.load(self.checkpoint_path, map_location="cpu", weights_only=True)
        if isinstance(state, dict) and "state_dict" in state:
            state = state["state_dict"]
        # The supplied model.pt is a direct state_dict.
        self.model.load_state_dict(state, strict=True)
        self.model.to(self.device).eval()
        self.transform = transforms.Compose([
            transforms.Resize((IMG_SIZE, IMG_SIZE)),
            transforms.ToTensor(),
            transforms.Normalize(MEAN, STD),
        ])
        self.temperature_scaler = None  # compatibility with existing warm-up hook

    def predict_image(self, image_path, patient_info=None, save_gradcam=False):
        start = perf_counter()
        path = Path(image_path)
        try:
            if not path.exists():
                raise ValueError("The uploaded image could not be found.")
            validation = validate_image(path)
            with Image.open(path) as raw:
                image = ImageOps.exif_transpose(raw).convert("RGB")
            tensor = self.transform(image).unsqueeze(0).to(self.device)
            with torch.inference_mode():
                cls_logit, hb_z = self.model(tensor)
                p_anemic = float(torch.sigmoid(cls_logit).item())
                hb = float((hb_z.item() * HB_STD) + HB_MEAN)
            label = "Anemic" if p_anemic >= 0.5 else "Non-Anemic"
            confidence = max(p_anemic, 1.0 - p_anemic)
            risk, explanation = compute_risk_metadata(label, confidence)
            warnings = [
                "Research prototype only; not a diagnosis or a laboratory measurement.",
                "Model training/validation population differs from many intended users; clinical performance is not established."
            ]
            quality_label = "checked" if validation else None
            return PredictionResult(
                prediction=label, confidence=confidence,
                anemic_probability=p_anemic, non_anemic_probability=1.0-p_anemic,
                risk_level=risk, risk_explanation=explanation, gradcam_path=None,
                medical_advice=" ".join(medical_advice_lines(label)),
                hemoglobin_estimate=f"{hb:.2f} g/dL (experimental model estimate; not a lab result)",
                processing_time_ms=int((perf_counter()-start)*1000),
                image_quality=quality_label, warnings=warnings, experimental_hb_g_dl=hb
            )
        except Exception as exc:
            return PredictionResult(
                prediction=None, confidence=0.0, anemic_probability=0.0,
                non_anemic_probability=0.0, risk_level=None,
                risk_explanation="Prediction could not be completed.",
                gradcam_path=None, medical_advice="Please seek professional advice if concerned.",
                hemoglobin_estimate=None, processing_time_ms=int((perf_counter()-start)*1000),
                image_quality=None, error=str(exc), warnings=[]
            )

def predict(image_path):
    return AnemiaPredictor().predict_image(image_path)
