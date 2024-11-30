import React, { useState } from 'react';
import axios from 'axios';

const uploadImageForm = () => {
    const[ file, setFile ] = useState<File | null>(null);
    const[ progress, setProgress ] = useState({started: false, prcnt: 0});
    const[ msg, setMsg ] = useState("no file selected");


    function handleUpload() {
        if(!file) {
            setMsg("no file selected");
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        setMsg("Uploading...");
        setProgress(prevState => {
            return {...prevState, started: true}
        })
        // what goes in here???
        axios.post('http://localhost:8088/blobs', formData, {
            onUploadProgress: ( progressEvent ) => { setProgress(prevState => {
                if(progressEvent.progress !== undefined) {
                    return {...prevState, prcnt: progressEvent.progress*100}
                }
                return {...prevState, prcnt:0}
            }) },
            headers: {
                "Custome-Header": "value"
            }
        })
        .then(res => {
            setMsg("Uploaded successfully");
            console.log(res.data)})
        .catch(err => {
            setMsg("Upload failed");
            console.error(err)})
    }

  return (
    <div>
        <input onChange={ (event) => {
                if(!event.target.files) {
                    return;
                }
                setFile(event.target.files[0])
            }} type='file'/>
        <button onClick={ handleUpload }>Upload</button>
        {progress.started && <progress max="100" value={progress.prcnt}></progress>}
        (msg && <span>{msg}</span>)
    </div>
    
  )
};

export default uploadImageForm;