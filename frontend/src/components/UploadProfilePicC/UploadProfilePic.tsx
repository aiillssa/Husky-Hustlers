import React, { useState } from 'react';
import axios from 'axios';

// https://www.youtube.com/watch?v=ijx0Uqlo3NA << to transition to multiple file uploads at once later

const UploadBannerImage = () => {
    //const fs = require('fs');

    const[ file, setFile ] = useState<File | null>(null);
    const[ progress, setProgress ] = useState({started: false, prcnt: 0});
    const[ msg, setMsg ] = useState("");
    
    function handleUpload() {
        console.log("Entered handleUpload")
        if(!file) {
            setMsg("no file selected");
            return;
        }
        
        
        
        const formData = new FormData();
        const userID = localStorage.getItem("userID");
        if( typeof userID === 'string') {
            formData.append('file', file);
            formData.append('id', userID); 
            formData.append('source', 'profile');
        } else {
            console.error("userID is null. localStorage.getItem is faulty");
            return;
        }

        

        setMsg("Uploading...");
        setProgress(prevState => {
            return {...prevState, started: true}
        })

        // change this route!!!
        axios.post('http://localhost:8088/blob/profile', formData, {
            onUploadProgress: ( progressEvent ) => { setProgress(prevState => {
                if(progressEvent.progress !== undefined) {
                    return {...prevState, prcnt: progressEvent.progress*100}
                }
                return {...prevState, prcnt:0}
            }) }
        })
        .then(res => {
            setMsg("Uploaded successfully");
            console.log(res);  // Check the response structure
            console.log(res.data);})  // Now access res.data
        .catch(err => {
            setMsg("Upload failed");
            console.error(err.response.data)})
    }

    return (
        <>
            <div>
                <h3>Upload your profile picture here:</h3>
                <input onChange={ (event) => {
                        if(!event.target.files) {
                            return;
                        }
                        setFile(event.target.files[0])
                    }} type='file'/>
                <button onClick={ handleUpload }>Upload</button>
                {msg && <span>{msg}</span>}
                <br/>
                {progress.started && <progress max="100" value={progress.prcnt}></progress>}
                
            </div>
            
        </>
        
    )
};

export default UploadBannerImage;