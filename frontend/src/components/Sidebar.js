import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const menuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Prediction', path: '/manualinputs' },
    { label: 'File Uploads', path: '/fileupload' },
  ];

  return (
    <motion.div
      className={`sidebar ${isOpen ? 'open' : ''}`}
      initial={{ x: '-100%' }}
      animate={{ x: isOpen ? 0 : '-100%' }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <div className="sidebar-header">
        <h3>Finvix</h3>
      </div>
      <ul>
        {menuItems.map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ x: 10 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={location.pathname === item.path ? 'active' : ''}
          >
            <Link to={item.path} onClick={toggleSidebar}>
              {item.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;