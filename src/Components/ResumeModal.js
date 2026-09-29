import React from "react";
import { FaFilePdf, FaDownload, FaPrint, FaTimes, FaFileAlt } from "react-icons/fa";
import "./ResumeModal.css";

const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.open("/Djvon_Simpson_Resume.pdf", "_blank");
  };

  return (
    <div className="resume-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="resume-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal-header">
          <h3 className="resume-modal-title">
            <FaFileAlt color="#007bff" /> Djvon Simpson — Resume
          </h3>
          <div className="resume-modal-actions">
            <a
              href="/Djvon_Simpson_Resume.pdf"
              download="Djvon_Simpson_Resume.pdf"
              className="resume-action-btn primary"
              title="Download PDF"
            >
              <FaFilePdf size={14} />
              <span>Download PDF</span>
            </a>
            <a
              href="/Djvon_Simpson_Resume.png"
              download="Djvon_Simpson_Resume.png"
              className="resume-action-btn"
              title="Download Image"
            >
              <FaDownload size={14} />
              <span>Download Image</span>
            </a>
            <button
              onClick={handlePrint}
              className="resume-action-btn"
              title="Print Resume"
            >
              <FaPrint size={14} />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="resume-close-btn"
              aria-label="Close Resume Modal"
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>

        <div className="resume-modal-body">
          <img
            src="/Djvon_Simpson_Resume.png"
            alt="Djvon Simpson Resume - Full-Stack & Applied AI Engineer"
            className="resume-preview-img"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
