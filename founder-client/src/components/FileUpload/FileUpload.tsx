import React, { useState } from "react";
import "./FileUpload.css";
import { MdDelete } from "react-icons/md";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { uploadResumeThunk } from "../../services/user/thunks";

function Uploader(): JSX.Element {

  const [status, setStatus] = useState<string>("Select File to Upload");
  const [fileName, setFileName] = useState<string>("No file selected");
  const [fileContent, setFileContent] = useState<any>(null);
  const [userId] = useState<any>(localStorage.getItem('currentUserID'));
  const input = document.querySelector(".input-field") as HTMLInputElement;

  const dispatch = useDispatch<any>();
  
  function handleSubmit() {
    const formData = new FormData();
    formData.append('file_content', fileContent);
    formData.append('file_name', fileName);
    formData.append('applicant_id', userId)
    console.log(fileContent)
    try {
      dispatch(uploadResumeThunk(formData));
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <h1 className="boxHeader"> Resume Upload </h1>

      <main>
        <form
          action=""
          onClick={() => {
            if (input) {
              input.click();
            }
            
          }}
        >
          <input
            type="file"
            accept="application/pdf"
            className="input-field"
            hidden
            onChange={({ target: { files } }) => {
              setStatus("File Uploaded Successfully!");
              files && files[0] && setFileName(files[0].name);
              files && files[0] && setFileContent(files[0]);
            }}
          />

          <h3 className="selector">{status}</h3>
        </form>

        <section className="uploaded-row">
          <span>
            {fileName}
            <MdDelete
              onClick={() => {
                setFileName("No file selected");
                setStatus("Select File to Upload");
              }}
            />
          </span>
          <p>Accepted file type is a .pdf</p>
        </section>

        <Button onClick={handleSubmit}>
            Click here to submit
        </Button>

      </main>
    </>
  );
}

export default Uploader;
