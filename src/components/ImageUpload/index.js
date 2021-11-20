import { Button } from '@mui/material'
import React, { useState } from 'react'
import { storage, db } from '../../firebase.js'

function ImageUpload() {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        //listen for state_change
        uploadTask.on('state_changed',
            (snapshot) => {
                //progress logic, as image gets uploaded give user progress snapshots based on %
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                //set progress from 0-100
                setProgress(progress);
            }
        )
    }

    return (
        <div>
            <h1>abc</h1>
            {/*caption input */}
            <input type="text" placeholder="Enter a caption" onChange={event => setCaption(event.target.value)} value={caption} />
            {/* file picker*/}
            <input type="file" onChange={handleChange} />
            {/*post button */}
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
