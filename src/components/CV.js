import React from "react";
import { config } from "../../config";

const CV = () => {
  return (
    <div className="cv-section">
      <div className="cv-header">
        <h2 className="section-title">CV</h2>
        <a href={`${config.basePath}/resume.pdf`} download className="cv-download-btn">
          ⬇ Download Resume
        </a>
      </div>
      <div className="cv-pdf-container">
        <iframe
          src={`${config.basePath}/resume.pdf`}
          className="cv-pdf-viewer"
          title="CV PDF Viewer"
        />
      </div>
    </div>
  );
};

export default CV;
