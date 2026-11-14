import React, { useEffect, useState } from 'react'
import * as tf from "@tensorflow/tfjs"
import * as poseDetection from '@tensorflow-models/pose-detection'
import * as faceDetection from '@tensorflow-models/face-detection'
import './Upload.css'
import arrow from '../assets/group3.svg'

const Upload = ()=> {
    const poseModel = poseDetection.SupportedModels.MoveNet;
    const faceModel = faceDetection.SupportedModels.MediaPipeFaceDetector;
    const faceDetectorConfig: faceDetection.MediaPipeFaceDetectorTfjsModelConfig = {
        runtime: 'tfjs'
    }
    const [poseDetector, setPoseDetector] = useState<poseDetection.PoseDetector | null>(null);
    const[faceDetector, setFaceDetector] = useState<faceDetection.FaceDetector | null>(null);

    const [modelIsLoaded, setModelIsLoaded] = useState(false)

    useEffect(() => {
        async function loadModels() {
            try {
                await tf.ready();
                const poseDetector = await poseDetection.createDetector(poseModel); 
                setPoseDetector(poseDetector);
                const faceDetector = await faceDetection.createDetector(faceModel, faceDetectorConfig)
                setFaceDetector(faceDetector)
                setModelIsLoaded(true)
                alert('models loaded')
            } catch (error) {
                alert('models failed to load')
            }
        }
        loadModels();
    }, []);

    const [image, setImage] = useState<string | null>(null);

    const changeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        if (!file) return;

        const newImage = URL.createObjectURL(file);
        setImage(newImage);

        const img = new Image();
        img.src = newImage;

        img.onload = async () => {

            if (!poseDetector || !faceDetector) return;

            const poses = await poseDetector?.estimatePoses(img);
            const face = await faceDetector?.estimateFaces(img)
            console.log(poses);
            console.log(face);
        };

        img.onerror = () => {
            console.error("Failed to load image")
        };
    }

    return (
        <div className = "uploadContainer">
            {image ? (
                <img src = {image} className = "uploadedImage"/>
            ) : (
                <label className = "uploadButton">
                    <img src = {arrow} className = "uploadedImage"/>
                    <h2>upload</h2>

                    <input type = "file" accept = "image/*" hidden disabled={!modelIsLoaded} onChange = {changeImage}/>
                </label>
            )}
        </div>
    )
}

export default Upload