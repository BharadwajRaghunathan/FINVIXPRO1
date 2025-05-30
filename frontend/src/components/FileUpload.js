import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/FileUpload.css';

const FileUpload = ({ onUpload }) => {
  const [modelType, setModelType] = useState('both');
  const [file, setFile] = useState(null);
  const [fileFormat, setFileFormat] = useState('csv');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
    document.querySelector('input[type="file"]').value = null; // Reset file input
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }
    setIsUploading(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model_type', modelType);
    formData.append('file_format', fileFormat);

    try {
      const res = await axios.post('http://localhost:5000/upload_predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });
      let results = res.data.results || (res.data.status === 'success' ? [res.data] : res.data);
      if (!Array.isArray(results)) {
        results = [results]; // Normalize single-object response to array
      }
      onUpload(results, modelType, fileFormat);
      toast.success('File uploaded and predictions generated successfully!');
    } catch (err) {
      console.error('File upload error:', err.response?.data || err);
      const errorMessage = err.response?.data?.error || 'Unknown error';
      toast.error(`Failed to upload file: ${errorMessage}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setFile(null);
      document.querySelector('input[type="file"]').value = null;
    }
  };

  return (
    <motion.div
      className="file-upload"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Upload Your Data</h3>
      <select value={fileFormat} onChange={(e) => setFileFormat(e.target.value)}>
        <option value="csv">CSV</option>
        <option value="xlsx">Excel</option>
      </select>
      <div className="file-input-container">
        <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />
        {file && (
          <span className="remove-file" onClick={handleRemoveFile}>
            ✕
          </span>
        )}
      </div>
      <select value={modelType} onChange={(e) => setModelType(e.target.value)}>
        <option value="roi">ROI</option>
        <option value="conversions">Conversions</option>
        <option value="both">Both</option>
      </select>
      {isUploading && (
        <div className="progress-bar">
          <motion.div
            className="progress"
            initial={{ width: 0 }}
            animate={{ width: `${uploadProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
      <motion.button
        onClick={handleUpload}
        disabled={isUploading}
        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 212, 255, 0.7)' }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {isUploading ? 'Uploading...' : 'Predict Now'}
      </motion.button>
    </motion.div>
  );
};

export default FileUpload;