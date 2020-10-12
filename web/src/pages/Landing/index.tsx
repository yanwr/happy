import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { FiArrowRight } from 'react-icons/fi'
import './styles.css';


export default function LandingPage() {
  return (
    <div id="landing-page-container">
      <div className="welcome-container">
        <img src={logo} alt="Happy"/>
        <main>
          <h1>Take happiness to the world</h1>
          <p>Visit orphanages and change the day of many children.</p>
        </main>
        <div className="info-location-container">
          <strong>Florianópolis</strong>
          <span>Santa Catarina</span>
        </div>
        <Link to="/dashboard" className="btn-enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
};