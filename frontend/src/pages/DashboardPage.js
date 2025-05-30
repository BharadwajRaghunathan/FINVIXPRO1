import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <motion.div
      className="dashboard-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="menu-button" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="dashboard-content">
        <Outlet />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </motion.div>
  );
};

export default DashboardPage;