import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/ResultsDisplay.css';

const ResultsDisplay = ({ results, modelType }) => {
  if (!results || (Array.isArray(results) && results.length === 0)) {
    return <div>No results available</div>;
  }

  const normalizedResults = Array.isArray(results) ? results : [results];
  const headers = normalizedResults.length > 0 ? Object.keys(normalizedResults[0]) : [];

  const roiChartData = normalizedResults.map((row, index) => ({
    name: `Row ${index + 1}`,
    actual_roi: row.actual_roi || 0,
    predicted_roi: row.roi || 0,
  }));

  const convChartData = normalizedResults.map((row, index) => ({
    name: `Row ${index + 1}`,
    actual_conversions: row.actual_conversions || 0,
    predicted_conversions: row.conversions || 0,
  }));

  return (
    <motion.div
      className="results-display"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Prediction Results</h3>
      {modelType === 'roi' && (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roiChartData}>
              <XAxis dataKey="name" stroke="#E0E1DD" />
              <YAxis stroke="#E0E1DD" />
              <Tooltip contentStyle={{ background: '#0D1B2A', border: '1px solid #00D4FF' }} />
              <Legend />
              <Bar dataKey="actual_roi" fill="#00D4FF" name="Actual ROI" />
              <Bar dataKey="predicted_roi" fill="#FF6F61" name="Predicted ROI" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {modelType === 'conversions' && (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={convChartData}>
              <XAxis dataKey="name" stroke="#E0E1DD" />
              <YAxis stroke="#E0E1DD" />
              <Tooltip contentStyle={{ background: '#0D1B2A', border: '1px solid #00D4FF' }} />
              <Legend />
              <Bar dataKey="actual_conversions" fill="#00D4FF" name="Actual Conversions" />
              <Bar dataKey="predicted_conversions" fill="#FF6F61" name="Predicted Conversions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {modelType === 'both' && (
        <>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roiChartData}>
                <XAxis dataKey="name" stroke="#E0E1DD" />
                <YAxis stroke="#E0E1DD" />
                <Tooltip contentStyle={{ background: '#0D1B2A', border: '1px solid #00D4FF' }} />
                <Legend />
                <Bar dataKey="actual_roi" fill="#00D4FF" name="Actual ROI" />
                <Bar dataKey="predicted_roi" fill="#FF6F61" name="Predicted ROI" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={convChartData}>
                <XAxis dataKey="name" stroke="#E0E1DD" />
                <YAxis stroke="#E0E1DD" />
                <Tooltip contentStyle={{ background: '#0D1B2A', border: '1px solid #00D4FF' }} />
                <Legend />
                <Bar dataKey="actual_conversions" fill="#00D4FF" name="Actual Conversions" />
                <Bar dataKey="predicted_conversions" fill="#FF6F61" name="Predicted Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {normalizedResults.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex}>{row[header] !== undefined ? row[header] : 'N/A'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ResultsDisplay;