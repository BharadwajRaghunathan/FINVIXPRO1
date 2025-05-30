import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FileUpload from './FileUpload';
import ResultsDisplay from './ResultsDisplay';
import ReportButton from './ReportButton';


const FileUploadContent = () => {
  const [fileUploadResults, setFileUploadResults] = useState(null);
  const [modelType, setModelType] = useState('both');

  const handleFileUploadResults = (results, modelType) => {
    const normalizedResults = Array.isArray(results) ? results : [results];
    setFileUploadResults(normalizedResults);
    setModelType(modelType);
  };

  return (
    <motion.div
      className="section-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>File Uploads & Predictions</h2>
      <FileUpload onUpload={handleFileUploadResults} />
      {fileUploadResults && (
        <ResultsDisplay results={fileUploadResults} modelType={modelType} />
      )}
      {fileUploadResults && (
        <div className="report-buttons">
          <ReportButton
            type="upload-report"
            results={fileUploadResults}
            modelType={modelType}
          />
          <ReportButton
            type="download-results"
            results={fileUploadResults}
            modelType={modelType}
          />
        </div>
      )}
    </motion.div>
  );
};

export default FileUploadContent;