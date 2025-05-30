import React from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/ReportButton.css';

const ReportButton = ({ sectionId, type, results, modelType }) => {
  const handleFrontendDownload = () => {
    const section = document.getElementById(sectionId);
    if (!section) {
      toast.error('Unable to generate report: Section not found');
      return;
    }

    const buttons = section.querySelector('.report-buttons');
    if (buttons) buttons.style.display = 'none';

    html2canvas(section).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('prediction-report.pdf');
      toast.success('Frontend report downloaded successfully!');
      if (buttons) buttons.style.display = 'flex';
    }).catch((err) => {
      console.error('Frontend report generation error:', err);
      toast.error('Failed to download frontend report');
      if (buttons) buttons.style.display = 'flex';
    });
  };

  const handleBackendDownload = () => {
    if (!results || !modelType) {
      toast.error('No valid results or model type provided to generate report');
      return;
    }
    axios.post('http://localhost:5000/report', { results, model_type: modelType }, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'blob',
    })
      .then((res) => {
        const reportBlob = new Blob([res.data], { type: 'application/pdf' });
        if (reportBlob.size === 0) {
          throw new Error('Empty PDF received');
        }
        const reportUrl = window.URL.createObjectURL(reportBlob);
        const link = document.createElement('a');
        link.href = reportUrl;
        link.download = `${modelType}_backend_report.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(reportUrl);
        toast.success('Backend report downloaded successfully!');
      })
      .catch(async (err) => {
        if (err.response && err.response.data) {
          const errorText = await err.response.data.text();
          let errorMessage = 'Unknown error';
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.error || errorMessage;
          } catch {
            errorMessage = errorText;
          }
          console.error('Backend report generation error:', errorMessage);
          toast.error(`Failed to download backend report: ${errorMessage}`);
        } else {
          console.error('Backend report generation error:', err);
          toast.error(`Failed to download backend report: ${err.message || 'Unknown error'}`);
        }
      });
  };

  const handleUploadReportDownload = () => {
    console.log('Sending to /upload_report:', { results, model_type: modelType });
    if (!results || !Array.isArray(results) || results.length === 0 || !modelType) {
      toast.error('No valid results or model type provided to generate report');
      return;
    }
    axios.post('http://localhost:5000/upload_report', { results, model_type: modelType }, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'blob',
    })
      .then((res) => {
        const reportBlob = new Blob([res.data], { type: 'application/pdf' });
        if (reportBlob.size === 0) {
          throw new Error('Empty PDF received');
        }
        const reportUrl = window.URL.createObjectURL(reportBlob);
        const link = document.createElement('a');
        link.href = reportUrl;
        link.download = `${modelType}_report.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(reportUrl);
        toast.success('Upload report downloaded successfully!');
      })
      .catch(async (err) => {
        if (err.response && err.response.data) {
          const errorText = await err.response.data.text();
          let errorMessage = 'Unknown error';
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.error || errorMessage;
          } catch {
            errorMessage = errorText;
          }
          console.error('Upload report generation error:', errorMessage);
          toast.error(`Failed to download upload report: ${errorMessage}`);
        } else {
          console.error('Upload report generation error:', err);
          toast.error(`Failed to download upload report: ${err.message || 'Unknown error'}`);
        }
      });
  };

  const handleDownloadResults = () => {
    if (!results || !modelType) {
      toast.error('No results or model type provided to download');
      return;
    }
    const fileType = 'csv';
    axios.post('http://localhost:5000/download_results', { results, model_type: modelType, file_type: fileType }, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'blob',
    })
      .then((res) => {
        const blob = new Blob([res.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${modelType}_results.${fileType}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success('Results downloaded successfully!');
      })
      .catch((err) => {
        console.error('Results download error:', err);
        toast.error('Failed to download results: ' + (err.response?.data?.error || 'Unknown error'));
      });
  };

  const handleDownload = () => {
    if (type === 'frontend') {
      handleFrontendDownload();
    } else if (type === 'backend') {
      handleBackendDownload();
    } else if (type === 'upload-report') {
      handleUploadReportDownload();
    } else if (type === 'download-results') {
      handleDownloadResults();
    }
  };

  return (
    <motion.button
      onClick={handleDownload}
      className={`report-button ${type === 'backend' ? 'backend-report' : ''} ${type === 'upload-report' ? 'upload-report' : ''} ${type === 'download-results' ? 'download-results' : ''}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {type === 'frontend' ? 'Download Frontend Report' : 
       type === 'backend' ? 'Download Report' : 
       type === 'upload-report' ? 'Download Report (.pdf)' : 
       'Download Results (.csv)'}
    </motion.button>
  );
};

export default ReportButton;