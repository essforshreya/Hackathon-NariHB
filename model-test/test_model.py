
import torch
import torch.nn as nn
import timm
from pathlib import Path

BASE = Path(__file__).resolve().parent
CHECKPOINT = BASE / "model.pt"

class AnemiaDetector(nn.Module):
    def __init__(self):
        super().__init__()
        self.backbone = timm.create_model(
            "efficientnet_b0",
            pretrained=False,
            num_classes=0,
        )
        self.head_cls = nn.Sequential(
            nn.Dropout(0.3),
            nn.Linear(1280, 1),
        )
        self.head_reg = nn.Sequential(
            nn.Linear(1280, 512),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(512, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, 1),
        )

    def forward(self, x):
        features = self.backbone(x)
        class_logit = self.head_cls(features)
        hb_normalized = self.head_reg(features)
        return class_logit, hb_normalized


def main():
    model = AnemiaDetector()
    state = torch.load(
        CHECKPOINT,
        map_location="cpu",
        weights_only=True,
    )

    model.load_state_dict(state, strict=True)
    model.eval()

    # Synthetic input only — no patient image.
    dummy = torch.zeros(1, 3, 224, 224)

    with torch.inference_mode():
        class_logit, hb_normalized = model(dummy)
        probability = torch.sigmoid(class_logit).item()
        hb_estimate = (
            hb_normalized.item() * 2.259 + 10.359
        )

    print("Checkpoint loaded strictly: PASS")
    print("Synthetic input forward pass: PASS")
    print(f"Anemia-head sigmoid output: {probability:.4f}")
    print(f"Unvalidated Hb-head output: {hb_estimate:.2f} g/dL")
    print("WARNING: Synthetic-input outputs are not medical results.")


if __name__ == "__main__":
    main()
