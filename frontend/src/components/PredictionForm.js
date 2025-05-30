import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaEraser } from 'react-icons/fa';
import '../styles/PredictionForm.css';

const PredictionForm = ({ onPredict, clearForm }) => {
  const [input, setInput] = useState({
    'Ad Spend': '', 'Clicks': '', 'Impressions': '', 'Conversion Rate': '',
    'Click-Through Rate (CTR)': '', 'Cost Per Click (CPC)': '', 'Cost Per Conversion': '',
    'Customer Acquisition Cost (CAC)': '', 'Campaign Type': 'Search Ads',
    'Region': 'North America', 'Industry': 'Retail', 'Company Size': 'Small',
    'Seasonality Factor': '',
  });
  const [modelType, setModelType] = useState('both');

  const handleChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputArray = [
      parseFloat(input['Ad Spend']) || 0,
      parseFloat(input['Clicks']) || 0,
      parseFloat(input['Impressions']) || 0,
      parseFloat(input['Conversion Rate']) || 0,
      parseFloat(input['Click-Through Rate (CTR)']) || 0,
      parseFloat(input['Cost Per Click (CPC)']) || 0,
      parseFloat(input['Cost Per Conversion']) || 0,
      parseFloat(input['Customer Acquisition Cost (CAC)']) || 0,
      input['Campaign Type'],
      input['Region'],
      input['Industry'],
      input['Company Size'],
      parseFloat(input['Seasonality Factor']) || 1.0,
    ];
    onPredict(inputArray, modelType);
  };

  const handleClear = () => {
    setInput({
      'Ad Spend': '', 'Clicks': '', 'Impressions': '', 'Conversion Rate': '',
      'Click-Through Rate (CTR)': '', 'Cost Per Click (CPC)': '', 'Cost Per Conversion': '',
      'Customer Acquisition Cost (CAC)': '', 'Campaign Type': 'Search Ads',
      'Region': 'North America', 'Industry': 'Retail', 'Company Size': 'Small',
      'Seasonality Factor': '',
    });
    setModelType('both');
    if (clearForm) clearForm();
  };

  return (
    <motion.div
      className="prediction-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <form className="prediction-form" onSubmit={handleSubmit}>
        <div className="section metrics-section">
          <h3>Campaign Metrics</h3>
          <input type="number" name="Ad Spend" placeholder="Ad Spend" onChange={handleChange} required value={input['Ad Spend']} autoComplete="off" />
          <input type="number" name="Clicks" placeholder="Clicks" onChange={handleChange} required value={input['Clicks']} autoComplete="off" />
          <input type="number" name="Impressions" placeholder="Impressions" onChange={handleChange} required value={input['Impressions']} autoComplete="off" />
        </div>

        <div className="section performance-section">
          <h3>Performance Rates</h3>
          <input type="number" step="0.01" name="Conversion Rate" placeholder="Conversion Rate" onChange={handleChange} required value={input['Conversion Rate']} autoComplete="off" />
          <input type="number" step="0.01" name="Click-Through Rate (CTR)" placeholder="CTR" onChange={handleChange} required value={input['Click-Through Rate (CTR)']} autoComplete="off" />
          <input type="number" name="Cost Per Click (CPC)" placeholder="CPC" onChange={handleChange} required value={input['Cost Per Click (CPC)']} autoComplete="off" />
          <input type="number" name="Cost Per Conversion" placeholder="Cost Per Conversion" onChange={handleChange} required value={input['Cost Per Conversion']} autoComplete="off" />
          <input type="number" name="Customer Acquisition Cost (CAC)" placeholder="CAC" onChange={handleChange} required value={input['Customer Acquisition Cost (CAC)']} autoComplete="off" />
        </div>

        <div className="section details-section">
          <h3>Campaign Details</h3>
          <select name="Campaign Type" onChange={handleChange} value={input['Campaign Type']} autoComplete="off">
            <option value="Search Ads">Search Ads</option>
            <option value="Display Ads">Display Ads</option>
            <option value="Social Media Ads">Social Media Ads</option>
          </select>
          <select name="Region" onChange={handleChange} value={input['Region']} autoComplete="off">
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
          </select>
          <select name="Industry" onChange={handleChange} value={input['Industry']} autoComplete="off">
            <option value="Retail">Retail</option>
            <option value="Tech">Tech</option>
            <option value="Finance">Finance</option>
          </select>
          <select name="Company Size" onChange={handleChange} value={input['Company Size']} autoComplete="off">
            <option value="Small">Small</option>
            <option value="Large">Large</option>
          </select>
          <input type="number" step="0.1" name="Seasonality Factor" placeholder="Seasonality Factor" onChange={handleChange} required value={input['Seasonality Factor']} autoComplete="off" />
        </div>

        <div className="section model-type-section">
          <h3>Prediction Type</h3>
          <div className="model-type-options">
            <label className="model-type-label">
              <input
                type="radio"
                name="modelType"
                value="conversions"
                checked={modelType === 'conversions'}
                onChange={(e) => setModelType(e.target.value)}
              />
              <span>Conversions</span>
            </label>
            <label className="model-type-label">
              <input
                type="radio"
                name="modelType"
                value="roi"
                checked={modelType === 'roi'}
                onChange={(e) => setModelType(e.target.value)}
              />
              <span>ROI</span>
            </label>
            <label className="model-type-label">
              <input
                type="radio"
                name="modelType"
                value="both"
                checked={modelType === 'both'}
                onChange={(e) => setModelType(e.target.value)}
              />
              <span>Both</span>
            </label>
          </div>
        </div>

        <div className="form-controls">
          <motion.button
            type="submit"
            className="predict-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FaChartLine /> Predict
          </motion.button>
          <motion.button
            type="button"
            className="clear-values-button"
            onClick={handleClear}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FaEraser /> Clear Values
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default PredictionForm;