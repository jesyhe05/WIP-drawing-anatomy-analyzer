import React, { useEffect, useState } from 'react'
import * as tf from "@tensorflow/tfjs"
import * as poseDetection from '@tensorflow-models/pose-detection'
import './Upload.css'
import arrow from '../assets/group3.svg'

const Upload = ()=> {
    const model = poseDetection.SupportedModels.MoveNet;
    const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null);

    useEffect(() => {
        async function loadModel() {
            await tf.ready();
            const poseDetector = await poseDetection.createDetector(model); 
            setDetector(poseDetector);
            alert("loaded");
        }
        if (detector === null) {
            loadModel();
        }
    }, [detector]);

    const [image, setImage] = useState<string | null>(null);

    const changeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        if (!file) return;

        const newImage = URL.createObjectURL(file);
        setImage(newImage);

        const img = new Image();
        img.src = newImage;

        img.onload = async () => {
            console.log(img.width, img.height);
            const poses = await detector?.estimatePoses(img);
            console.log(poses);
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

                    <input type = "file" accept = "image/*" hidden onChange = {changeImage}/>
                </label>
            )}
        </div>
    )
}

export default Upload