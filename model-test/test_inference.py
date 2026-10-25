
import torch
import torch.nn as nn
import timm
from pathlib import Path
from PIL import Image
from torchvision import transforms

BASE = Path(__file__).resolve().parent
CHECKPOINT = BASE / "model.pt"

HB_MEAN = 10.359
HB_STD = 2.259

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
        return self.head_cls(features), self.head_reg(features)


def main():
    model = AnemiaDetector()
    state = torch.load(CHECKPOINT, map_location="cpu", weights_only=True)
    model.load_state_dict(state, strict=True)
    model.eval()

    image_path = input(
        "Enter the full path to a suitable test image (or leave blank to test loading only): "
    ).strip().strip('"')

    if not image_path:
        print("Checkpoint load test: PASS")
        print("No image inference was performed.")
        return

    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225],
        ),
    ])

    with Image.open(image_path) as image:
        tensor = transform(image.convert("RGB")).unsqueeze(0)

    with torch.inference_mode():
        class_logit, hb_normalized = model(tensor)
        probability = torch.sigmoid(class_logit).item()
        hb_estimate = hb_normalized.item() * HB_STD + HB_MEAN

    print(f"Anemia-head sigmoid output: {probability:.4f}")
    print(f"Experimental Hb estimate: {hb_estimate:.2f} g/dL")
    print("Research prototype only — not a diagnosis or validated clinical measurement.")


if __name__ == "__main__":
    main()
