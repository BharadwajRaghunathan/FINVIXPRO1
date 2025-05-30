import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';

import PredictionForm from './PredictionForm';
import ReportButton from './ReportButton';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnimatedNumber = ({ value, isPercentage = false, status }) => {
  const motionValue = useRef(0);
  const [displayValue, setDisplayValue] = useState(
    `${motionValue.current.toFixed(2)}${isPercentage ? '%' : ''}`
  );

  useEffect(() => {
    let start = 0;
    const end = value || 0;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / (end || 1)));
    const timer = setInterval(() => {
      start += 1;
      motionValue.current = start;
      setDisplayValue(
        `${motionValue.current.toFixed(2)}${isPercentage ? '%' : ''}`
      );
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, isPercentage]);

  const color =
    status === 'positive' ? '#00FF00' : status === 'negative' ? '#FF3333' : '#FFD700';

  return (
    <span style={{ color, transition: 'color 0.3s ease' }}>{displayValue}</span>
  );
};

const PredictionCharts = ({ predictions, chartRefs, modelType }) => {
  useEffect(() => {
    return () => {
      Object.values(chartRefs).forEach((ref) => {
        if (ref.current) {
          ref.current.destroy();
          ref.current = null;
        }
      });
    };
  }, [chartRefs]);

  if (!predictions) return <div>No prediction data available</div>;

  const actualConversions = predictions.actual_conversions || 0;
  const predictedConversions = predictions.conversions || 0;
  const actualRoi = predictions.actual_roi || 0;
  const predictedRoi = predictions.roi || 0;

  return (
    <div className="charts-container">
      {(modelType === 'roi' || modelType === 'both') && (
        <>
          <div className="comparison-chart">
            <h3>Actual vs Predicted ROI (Bar)</h3>
            <Bar
              ref={chartRefs.barROI}
              data={{
                labels: ['ROI'],
                datasets: [
                  { label: 'Actual ROI', data: [actualRoi], backgroundColor: '#FF6F61' },
                  { label: 'Predicted ROI', data: [predictedRoi], backgroundColor: '#00D4FF' },
                ],
              }}
              options={{
                responsive: true,
                animation: { duration: 2000, easing: 'easeOutBounce' },
                scales: {
                  y: { beginAtZero: true, ticks: { color: '#E0E1DD' } },
                  x: { ticks: { color: '#E0E1DD' } },
                },
                plugins: {
                  legend: { position: 'top', labels: { color: '#E0E1DD' } },
                  title: { display: true, text: 'ROI Bar Comparison', color: '#00D4FF' },
                },
              }}
            />
          </div>
          <div className="comparison-chart">
            <h3>ROI Trend Over Time</h3>
            <Line
              ref={chartRefs.lineROI}
              data={{
                labels: ['Past', 'Present', 'Predicted'],
                datasets: [
                  {
                    label: 'ROI',
                    data: [actualRoi * 0.9, actualRoi, predictedRoi],
                    borderColor: '#00D4FF',
                    fill: false,
                  },
                ],
              }}
              options={{
                responsive: true,
                animation: { duration: 2000, easing: 'easeOutQuad' },
                scales: {
                  y: { beginAtZero: true, ticks: { color: '#E0E1DD' } },
                  x: { ticks: { color: '#E0E1DD' } },
                },
                plugins: {
                  legend: { position: 'top', labels: { color: '#E0E1DD' } },
                  title: { display: true, text: 'ROI Line Trend', color: '#00D4FF' },
                },
              }}
            />
          </div>
          <div className="comparison-chart">
            <h3>ROI Prediction Breakdown</h3>
            <Pie
              ref={chartRefs.pieROI}
              data={{
                labels: ['Actual ROI', 'Predicted ROI'],
                datasets: [
                  { data: [actualRoi, predictedRoi], backgroundColor: ['#FF6F61', '#00D4FF'] },
                ],
              }}
              options={{
                responsive: true,
                animation: { duration: 2000, easing: 'easeOutElastic' },
                plugins: {
                  legend: { position: 'top', labels: { color: '#E0E1DD' } },
                  title: { display: true, text: 'ROI Pie Breakdown', color: '#00D4FF' },
                },
              }}
            />
          </div>
        </>
      )}
      {(modelType === 'conversions' || modelType === 'both') && (
        <>
          <div className="comparison-chart">
            <h3>Actual vs Predicted Conversions (Bar)</h3>
            <Bar
              ref={chartRefs.barConversions}
              data={{
                labels: ['Conversions'],
                datasets: [
                  { label: 'Actual Conversions', data: [actualConversions], backgroundColor: '#FF6F61' },
                  { label: 'Predicted Conversions', data: [predictedConversions], backgroundColor: '#00D4FF' },
                ],
              }}
              options={{
                responsive: true,
                animation: { duration: 2000, easing: 'easeOutBounce' },
                scales: {
                  y: { beginAtZero: true, ticks: { color: '#E0E1DD' } },
                  x: { ticks: { color: '#E0E1DD' } },
                },
                plugins: {
                  legend: { position: 'top', labels: { color: '#E0E1DD' } },
                  title: { display: true, text: 'Conversions Bar Comparison', color: '#00D4FF' },
                },
              }}
            />
          </div>
          <div className="comparison-chart">
            <h3>Conversions Trend Over Time</h3>
            <Line
              ref={chartRefs.lineConversions}
              data={{
                labels: ['Past', 'Present', 'Predicted'],
                datasets: [
                  {
                    label: 'Conversions',
                    data: [actualConversions * 0.8, actualConversions, predictedConversions],
                    borderColor: '#FF6F61',
                    fill: false,
                  },
                ],
              }}
              options={{
                responsive: true,
                animation: { duration: 2000, easing: 'easeOutQuad' },
                scales: {
                  y: { beginAtZero: true, ticks: { color: '#E0E1DD' } },
                  x: { ticks: { color: '#E0E1DD' } },
                },
                plugins: {
                  legend: { position: 'top', labels: { color: '#E0E1DD' } },
                  title: { display: true, text: 'Conversions Line Trend', color: '#00D4FF' },
                },
              }}
            />
          </div>
          <div className="comparison-chart">
            <h3>Conversions Prediction Breakdown</h3>
            <Pie
              ref={chartRefs.pieConversions}
              data={{
                labels: ['Actual Conversions', 'Predicted Conversions'],
                datasets: [
                  { data: [actualConversions, predictedConversions], backgroundColor: ['#FF6F61', '#00D4FF'] },
                ],
              }}
              options={{
                responsive: true,
                animation: { duration: 2000, easing: 'easeOutElastic' },
                plugins: {
                  legend: { position: 'top', labels: { color: '#E0E1DD' } },
                  title: { display: true, text: 'Conversions Pie Breakdown', color: '#00D4FF' },
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

const ManualInputsContent = () => {
  const [predictions, setPredictions] = useState(null);
  const [modelType, setModelType] = useState('both');
  const [predictionLoading, setPredictionLoading] = useState(false);

  const barROIRef = useRef(null);
  const lineROIRef = useRef(null);
  const pieROIRef = useRef(null);
  const barConversionsRef = useRef(null);
  const lineConversionsRef = useRef(null);
  const pieConversionsRef = useRef(null);

  const chartRefs = useMemo(
    () => ({
      barROI: barROIRef,
      lineROI: lineROIRef,
      pieROI: pieROIRef,
      barConversions: barConversionsRef,
      lineConversions: lineConversionsRef,
      pieConversions: pieConversionsRef,
    }),
    []
  );

  const handlePredict = async (input, modelType) => {
    setPredictionLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/predict', {
        input,
        model_type: modelType,
      });
      setPredictions(res.data);
      setModelType(modelType);
      toast.success('Prediction completed!');
    } catch (err) {
      console.error('Prediction error:', err.response?.data || err.message);
      if (err.response?.status === 429) {
        toast.error('Too many requests. Please try again later.');
      } else {
        toast.error('Prediction failed: ' + (err.response?.data?.error || 'Unknown error'));
      }
    } finally {
      setPredictionLoading(false);
    }
  };

  return (
    <>
      <motion.div
        className="section-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Forecasting Input</h2>
        <PredictionForm onPredict={handlePredict} />
      </motion.div>
      <AnimatePresence>
        {predictionLoading ? (
          <motion.div
            className="loader-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="loader"></div>
          </motion.div>
        ) : (
          predictions && (
            <motion.div
              className="section-card prediction-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Prediction Insights</h2>
              <div className="prediction-cards">
                {(modelType === 'conversions' || modelType === 'both') &&
                  predictions.conversions !== undefined && (
                    <motion.div
                      className="prediction-card"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="prediction-label">Conversions</div>
                      <div className="prediction-value">
                        <AnimatedNumber
                          value={predictions.conversions}
                          status={predictions.conversions_status || 'moderate'}
                        />
                      </div>
                      <p>Actual: {predictions.actual_conversions?.toFixed(2) || 'N/A'}</p>
                      <span
                        className={`status ${predictions.conversions_status || 'moderate'}`}
                      >
                        {predictions.conversions_status || 'moderate'}
                      </span>
                    </motion.div>
                  )}
                {(modelType === 'roi' || modelType === 'both') && predictions.roi !== undefined && (
                  <motion.div
                    className="prediction-card"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="prediction-label">ROI</div>
                    <div className="prediction-value">
                      <AnimatedNumber
                        value={predictions.roi}
                        isPercentage={true}
                        status={predictions.roi_status || 'moderate'}
                      />
                    </div>
                    <p>Actual: {predictions.actual_roi?.toFixed(2)}%</p>
                    <span className={`status ${predictions.roi_status || 'moderate'}`}>
                      {predictions.roi_status || 'moderate'}
                    </span>
                  </motion.div>
                )}
              </div>
              <PredictionCharts
                predictions={predictions}
                chartRefs={chartRefs}
                modelType={modelType}
              />
              <div className="suggestions">
                {(modelType === 'conversions' || modelType === 'both') &&
                  predictions.conversions_suggestions && (
                    <>
                      <h3>Conversion Report</h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {predictions.conversions_suggestions}
                      </motion.p>
                    </>
                  )}
                {(modelType === 'roi' || modelType === 'both') &&
                  predictions.roi_suggestions && (
                    <>
                      <h3>ROI Report</h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {predictions.roi_suggestions}
                      </motion.p>
                    </>
                  )}
              </div>
              <div className="report-buttons">
                <ReportButton type="backend" results={predictions} modelType={modelType} />
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </>
  );
};

export default ManualInputsContent;