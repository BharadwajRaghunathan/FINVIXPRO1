// src/components/Greeting.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../styles/Greeting.css';

const Greeting = () => {
  const [username, setUsername] = useState('');
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:5000/greeting', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsername(response.data.username);
        setQuotes(response.data.quotes);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          console.error('Error fetching greeting data:', error);
        }
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <motion.div
      className="greeting-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="greeting-card">
        <motion.h2
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Welcome, {username || 'User'}!
        </motion.h2>
        <div className="quotes">
          {quotes.map((quote, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              "{quote}"
            </motion.p>
          ))}
        </div>
        <motion.button
          className="neon-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </motion.button>
        <motion.button
          className="neon-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
        >
          Logout
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Greeting;