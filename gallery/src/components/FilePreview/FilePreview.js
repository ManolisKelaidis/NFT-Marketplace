import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { Row, Col, Button, Image } from "react-bootstrap";
import { ReactComponent as AddNewCertification } from "../../assets/img/icons/certifications.svg";
const FilePreview = ({ file }) => {
  console.log(file);
  return (
    <div className="file-card ">
      <div>
        <AddNewCertification
          style={{ width: "30px", height: "30px", float: "left" }}
        />
        <h4
          style={{
            float: "left",
            position: "center",
            marginLeft: "10px",
            color: "grey",
          }}
        >
          {file.title}
        </h4>
      </div>

      <h5 style={{ position: "center", color: "grey" }}>{file.description}</h5>

      <div
        style={{
          marginTop: "10px",
          marginRight: "10px",
          width: "800px",
          height: "300px",
          backgroundColor: "#e4e4e4",
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer
            fileUrl={file.fileView}
            // plugins={[defaultLayoutPluginInstance]}
          ></Viewer>
        </Worker>
      </div>
    </div>
  );
};

export default FilePreview;
