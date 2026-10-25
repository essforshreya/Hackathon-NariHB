
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


app = FastAPI(
    title="NariHB API",
    description=(
        "Backend API for NariHB, a women's health "
        "and anemia-screening support application."
    ),
    version="1.0.0",
)

# Frontend development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)


class PredictionRequest(BaseModel):
    user_name: str | None = None
    answers: dict[str, Any] = Field(default_factory=dict)


@app.get("/")
def home():
    return {
        "app": "NariHB",
        "message": "NariHB API is running",
        "status": "success",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "NariHB backend",
    }


@app.post("/predict")
def predict(data: PredictionRequest):
    if not data.answers:
        raise HTTPException(
            status_code=422,
            detail="Please provide questionnaire answers.",
        )

    # TODO: Connect the actual trained NariHB model here.
    # Do not generate a medical score until the real
    # model or validated scoring logic is integrated.

    return {
        "status": "received",
        "app": "NariHB",
        "user_name": data.user_name,
        "answers_received": data.answers,
        "prediction_ready": False,
        "message": (
            "Questionnaire received. The trained model "
            "or validated scoring logic is not connected yet."
        ),
        "recommendation": (
            "Consult a qualified healthcare professional "
            "for medical assessment."
        ),
    }
