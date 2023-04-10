import React, { useState } from "react";
import "./FileUpload.css";
import { MdDelete } from "react-icons/md";

function Uploader(): JSX.Element {
  const [status, setStatus] = useState<string>("Select File to Upload");
  const [fileName, setFileName] = useState<string>("No file selected");

  const input = document.querySelector(".input-field") as HTMLInputElement;

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
      </main>
    </>
  );
}

export default Uploader;
