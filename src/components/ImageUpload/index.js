import { Button } from '@mui/material'
import React, { useState } from 'react'
import { storage, db } from '../../firebase.js'
import firebase from 'firebase/compat';
import './style.css'

function ImageUpload({ username }) {
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
            },
            (error) => {
                //Error function
                console.log(error);
            },
            () => {
                //onComplete function
                storage
                    .ref("images")
                    .child(image.name)
                    //get dowload link after being uploaded
                    .getDownloadURL()
                    .then(url => {
                        //post image inside db
                        db.collection("posts").add({
                            //timestamp sllows us to sort post according to timing
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });
                        //set input back to empty
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }
        )
    }

    return (
        <div className="image__upload">
            <progress className="upload__progress" value={progress} max="100" />
            {/*caption input */}
            <input className="caption__input" type="text" placeholder="?????? Enter a caption..." onChange={event => setCaption(event.target.value)} value={caption} />
            {/* file picker*/}
            <input type="file" onChange={handleChange} />
            {/*post button */}
            <Button style={{ color: "black" }} onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
