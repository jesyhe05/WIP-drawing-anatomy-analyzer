import numpy
import torch
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

class PoseKeypoint(BaseModel):
    x: float
    y: float
    score: float
    name: str | None = None

class FacePoints(BaseModel):
    xMin: float
    yMin: float
    xMax: float
    yMax: float
    width: float
    height: float

class Points(BaseModel):
    pose_keypoints: list[PoseKeypoint]
    face_keypoints: FacePoints

app = FastAPI();

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.post("/analyze")
def analyze_pose(data: Points):
    pose = data.pose_keypoints
    face = data.face_keypoints

    return {
        "pose_count": len(pose),
    }