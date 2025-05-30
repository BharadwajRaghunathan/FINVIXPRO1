import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const DashboardContent = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You need to log in to access the dashboard');
        navigate('/login');
        return;
      }

      // Include token in Authorization header
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get('http://localhost:5000/dashboard', { headers });
      setDashboardData(res.data.data);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      if (err.response && err.response.status === 401) {
        // Handle invalid or expired token
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        // Handle other errors (e.g., network issues, server errors)
        toast.error('Failed to load dashboard data');
      }
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <motion.div
      className="section-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>24-Hour Performance Trends</h2>
      {dashboardData ? (
        <Dashboard data={dashboardData} />
      ) : (
        <p>Loading dashboard data...</p>
      )}
    </motion.div>
  );
};

export default DashboardContent;