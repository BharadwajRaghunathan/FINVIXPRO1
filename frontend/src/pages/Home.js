import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';
import { Link, useNavigate } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import Particles from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import axios from 'axios';
import { toast } from 'react-toastify';
import finvixLogo from '../assets/finvix_logo.jpg';
import '../styles/Home.css';

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const navLinks = useMemo(() => [
    { name: 'Home', path: '#home', id: 'home' },
    { name: 'About', path: '#about', id: 'about' },
    { name: 'Why Finvix?', path: '#why-finvix', id: 'why-finvix' },
    { name: 'Features', path: '#features', id: 'features' },
  ], []);

  // Define onPredict function to handle API call with token
  const onPredict = async (inputArray, modelType) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to make predictions');
        navigate('/login');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/predict',
        { inputArray, modelType },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('Prediction successful!');
      console.log('Prediction result:', response.data);
    } catch (error) {
      console.error('Prediction error:', error);
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized. Please log in again.');
        navigate('/login');
      } else {
        toast.error('Prediction failed. Please try again.');
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
            window.history.replaceState(null, null, `#${sectionId}`);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.5 }
    );

    navLinks.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    return () => {
      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section) observer.unobserve(section);
      });
    };
  }, [navLinks]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={finvixLogo} alt="Finvix Logo" />
        </div>
        <ul className="navbar-links">
          {navLinks.map((link, index) => (
            <li key={index}>
              <HashLink
                to={link.path}
                smooth
                className={activeSection === link.id ? 'active' : ''}
              >
                {link.name}
              </HashLink>
            </li>
          ))}
          <li>
            <Link to="/login" className="login-signup-button">Login / Signup</Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <Particles
          className="wave-container"
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 100, density: { enable: true, value_area: 800 } },
              color: { value: ['#00DDEB', '#4C78A8'] },
              shape: { type: 'circle' },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              move: {
                enable: true,
                speed: 2,
                direction: 'bottom',
                random: true,
                out_mode: 'out',
                attract: { enable: true, rotateX: 600, rotateY: 1200 },
              },
            },
            interactivity: {
              events: { onhover: { enable: true, mode: 'repulse' } },
              modes: { repulse: { distance: 100, duration: 0.4 } },
            },
            retina_detect: true,
          }}
        />
        <motion.div
          className="hero-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.img
            src={finvixLogo}
            alt="Finvix Logo"
            className="logo"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Transform Your Marketing with AI-Powered Precision
          </motion.h1>
          <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            Finvix delivers cutting-edge analytics and real-time insights to optimize your ad spend and boost ROI effortlessly.
          </motion.p>
          <motion.button
            className="neon-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Link to="/login">Start Now</Link>
          </motion.button>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          About Finvix
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <strong>Finvix empowers businesses with AI-driven marketing solutions.</strong> We simplify data into actionable strategies for growth.
        </motion.p>
      </section>

      {/* Why Finvix Section */}
      <section className="why-finvix" id="why-finvix">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Why Choose Finvix?
        </motion.h2>
        <div className="cards">
          {[
            { title: 'Instant Insights', desc: 'Real-time data analysis for immediate decision-making.' },
            { title: 'Predictive Modeling', desc: 'Boost ROI with AI-powered campaign predictions.' },
            { title: 'Tailored Recommendations', desc: 'Smart suggestions aligned with your business goals.' },
            { title: 'Enterprise-Grade Security', desc: 'Scalable solutions with top-tier data protection.' },
            { title: 'Seamless Integration', desc: 'Effortlessly integrates with your existing tools.' },
            { title: '24/7 Support', desc: 'Round-the-clock assistance for uninterrupted operations.' },
          ].map((item, index) => (
            <Tilt key={index} tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareMaxOpacity={0.3}>
              <motion.div
                className="card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </section>

      {/* Key Features Section */}
      <section className="features" id="features">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Key Features of Finvix
        </motion.h2>
        <div className="feature-cards">
          {[
            { icon: '📊', title: 'Predictive Analytics', desc: 'Leverage AI to predict campaign outcomes, optimize budgets, and maximize conversions with unparalleled accuracy.' },
            { title: 'Dynamic Visualizations', icon: '👁️', desc: 'Explore your data through interactive dashboards that make performance tracking intuitive and actionable.' },
            { title: 'Automated Reports', icon: '📄', desc: 'Get comprehensive reports with insights and suggestions, ready to share with your team in seconds.' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Ready to Transform Your Marketing?
        </motion.h2>
        <motion.button
          className="neon-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Link to="/login">Explore Dashboard</Link>
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Finvix. All rights reserved.</p>
          <ul className="footer-links">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;