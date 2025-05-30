import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar';
import '../styles/DashboardPage.css';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <motion.div
      className="dashboard-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <nav className="layout-navbar">
        <h2>Finvix</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="menu-button" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`dashboard-content ${isSidebarOpen ? 'shifted' : ''}`}>
        <Outlet />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </motion.div>
  );
};

export default Layout;