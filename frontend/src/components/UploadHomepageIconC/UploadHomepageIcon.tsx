import React, { useState } from "react";
import axios from "axios";
import "./HomepageIcon.css";

// https://www.youtube.com/watch?v=ijx0Uqlo3NA << to transition to multiple file uploads at once later

const UploadHomepageIcon = () => {
  //const fs = require('fs');

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState({ started: false, prcnt: 0 });
  const [msg, setMsg] = useState("");

  function handleUpload() {
    console.log("Entered handleUpload");
    if (!file) {
      setMsg("no file selected");
      return;
    }

    if (!file.type || !file.type.startsWith("image/")) {
      setMsg("Only images are allowed!");
      return;
    }

    const formData = new FormData();
    const userID = localStorage.getItem("userID");
    if (typeof userID === "string") {
      formData.append("file", file);
      formData.append("id", userID);
      formData.append("source", "homepage");
    } else {
      console.error("userID is null. localStorage.getItem is faulty");
      return;
    }

    setMsg("Uploading...");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    axios
      .post("http://localhost:8088/blob/", formData, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            if (progressEvent.progress !== undefined) {
              return { ...prevState, prcnt: progressEvent.progress * 100 };
            }
            return { ...prevState, prcnt: 0 };
          });
        },
      })
      .then((res) => {
        setMsg("Uploaded successfully");
        console.log(res); // Check the response structure
        console.log(res.data);
      }) // Now access res.data
      .catch((err) => {
        setMsg("Upload failed");
        console.error(err.response.data);
      });
  }

  return (
    <>
      <div className="upload-homepage-icon">
        <h3>Upload your store homepage icon here:</h3>
        <div>
          <input
            onChange={(event) => {
              if (!event.target.files) {
                return;
              }
              setFile(event.target.files[0]);
            }}
            type="file"
          />
          <button onClick={handleUpload} type="button">
            Upload
          </button>
        </div>

        {msg && <span style={{ color: "blue" }}>{msg}</span>}
        <br />
        {progress.started && (
          <progress max="100" value={progress.prcnt}></progress>
        )}
      </div>
    </>
  );
};

export default UploadHomepageIcon;
