import React, { useState } from 'react';
import axios from 'axios';

const UploadProductImages = () => {
  const [files, setFiles] = useState<File[]>([]); // Manage multiple files
  const [captions, setCaptions] = useState<string[]>([]); // Store captions for each file
  const [prices, setPrices] = useState<string[]>([]); // Store prices for each file
  const [progress, setProgress] = useState({ started: false, prcnt: 0 });
  const [msg, setMsg] = useState("");

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;
    
    // Append selected files to the state
    setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
    setCaptions((prevCaptions) => [...prevCaptions, '']);
    setPrices((prevPrices) => [...prevPrices, '']);
  };

  // Handle file upload
  const handleUpload = () => {
    if (files.length === 0) {
      setMsg("No files selected");
      return;
    }

    if (captions.length === 0) {
      setMsg("No captions set");
      return;
    }

    if (prices.length === 0) {
      setMsg("No prices set");
      return;
    }

    const formData = new FormData();
    const userID = localStorage.getItem("userID");

    if (typeof userID === 'string') {
      files.forEach((file) => {
        formData.append('files', file); // Append multiple files
      });
      captions.forEach((caption) => {
        formData.append('captions', caption); // Append multiple cpations
      });
      prices.forEach((price) => {
        formData.append('prices', price); // Append multiple prices
      });
      formData.append('id', userID);
      formData.append('source', 'products');
    } else {
      console.error("userID is null. localStorage.getItem is faulty");
      return;
    }

    setMsg("Uploading...");
    setProgress({ started: true, prcnt: 0 });

    // Axios POST request to upload files
    axios.post('http://localhost:8088/blob/', formData, {
      onUploadProgress: (progressEvent) => {
        setProgress(prevState => {
          if (progressEvent.progress !== undefined) {
            return { ...prevState, prcnt: progressEvent.progress * 100 };
          }
          return { ...prevState, prcnt: 0 };
        });
      },
    })
      .then((res) => {
        setMsg("Uploaded successfully");
        console.log(res);
      })
      .catch((err) => {
        setMsg("Upload failed");
        console.error(err.response.data);
      });
  };

  // Add a new file input field
  const addNewFileField = () => {
    document.getElementById("fileInput")?.click();
  };

  // Handle caption change
  const handleCaptionChange = (index: number, value: string) => {
    const wordCount = value.split(/\s+/).length;

    if (wordCount <= 25 || wordCount >= 0) {
      const newCaptions = [...captions];
      newCaptions[index] = value;
      setCaptions(newCaptions);
    }
  };

  // Handle price change
  const handlePriceChange = (index: number, value: string) => {
    // Allow only valid decimal numbers with up to 2 decimal places
    const validPrice = /^[0-9]+(\.[0-9]{0,2})?$/.test(value);

    if (validPrice) {
      const newPrices = [...prices];
      newPrices[index] = value;
      setPrices(newPrices);
    }
  };

  return (
    <>
      <div>
        <h3>Upload your product images with captions and prices:</h3>
        <input
          id="fileInput"
          type="file"
          style={{ display: 'none' }}
          multiple // Allow multiple files selection
          onChange={handleFileChange}
        />
        <button onClick={addNewFileField}>Add another image</button>
        

        {/* Display the names of the selected files with captions and prices */}
        <div>
          <h4>Selected Files:</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                <div>{file.name}</div>

                {/* Caption input */}
                <div>
                  <label>Caption:</label>
                  <input
                    type="text"
                    value={captions[index]}
                    onChange={(e) => handleCaptionChange(index, e.target.value)}
                    maxLength={500} // Optional max character limit
                  />
                  {captions[index].split(/\s+/).length > 25 || captions[index].split(/\s+/).length === 0 && (
                    <span style={{ color: 'red' }}>Reached limit of 25 words</span>
                  )}
                </div>

                {/* Price input */}
                <div>
                  <label>Price ($):</label>
                  <input
                    type="text"
                    value={prices[index]}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                    placeholder="e.g. 12.34"
                  />
                  {!/^[0-9]+(\.[0-9]{0,2})?$/.test(prices[index]) && (
                    <span style={{ color: 'red' }}>Pricing must be valid</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>


        <br />
        <button onClick={handleUpload}>Upload</button>
        {msg && <span>{msg}</span>}

        <br />
        {progress.started && <progress max="100" value={progress.prcnt}></progress>}


      </div>
    </>
  );
};

export default UploadProductImages;
