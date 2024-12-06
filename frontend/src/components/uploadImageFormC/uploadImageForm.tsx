import React, { useState } from 'react';
import axios from 'axios';

// https://www.youtube.com/watch?v=ijx0Uqlo3NA << to transition to multiple file uploads at once later

interface DataToSend {
    images: FormData;
    id: string;
    source: string;
  }
const UploadImageForm = () => {
    //const fs = require('fs');

    const[ file, setFile ] = useState<File | null>(null);
    const[ progress, setProgress ] = useState({started: false, prcnt: 0});
    const[ msg, setMsg ] = useState("");
    
    function handleUpload() {
        if(!file) {
            setMsg("no file selected");
            return;
        }
        
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', 'userID test');
        formData.append('source', 'source test');

        setMsg("Uploading...");
        setProgress(prevState => {
            return {...prevState, started: true}
        })

        
        axios.post('http://localhost:8088/blob/', formData, {
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
                <h3>Upload your business gallery images here:</h3>
                <input onChange={ (event) => {
                        if(!event.target.files) {
                            return;
                        }
                        setFile(event.target.files[0])
                    }} type='file'/>
                <br/>
                <button onClick={ handleUpload }>Upload</button>
                {msg && <span>{msg}</span>}
                <br/>
                {progress.started && <progress max="100" value={progress.prcnt}></progress>}
                
            </div>
            
        </>
        
    )
};

export default UploadImageForm;