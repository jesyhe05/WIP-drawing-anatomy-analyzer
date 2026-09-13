import numpy
import torch
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

class Keypoint(BaseModel):
    points: list[float]

class PosePoints(BaseModel):
    keypoints: list[Keypoint]

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

#don't need memory because you arent storing just for learning purposes rn

# memory_db = {"keypoints": []}

# @app.get("/upload", response_model=PosePoints)
# def get_points():
#     return PosePoints(keypoints=memory_db["keypoints"])

# @app.post("/upload")
# def set_points(pose : PosePoints):
#     memory_db["keypoints"]=pose.keypoints
#     return pose

@app.post("/analyze")
def analyze_pose(pose: PosePoints):
    return pose