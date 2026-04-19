import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Connecting to server...');

  useEffect(() => {
    const messages = [
      "Initializing resources...",
      "Loading hero data...",
      "Checking Rank status...",
      "Welcome, Legend!"
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        
        if (newProgress === 25) setStatus(messages[0]);
        if (newProgress === 50) setStatus(messages[1]);
        if (newProgress === 75) setStatus(messages[2]);
        if (newProgress === 95) setStatus(messages[3]);
        
        if (newProgress >= 100) {
          clearInterval(interval);
        }
        
        return newProgress;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="animate-up">
        <h1 className="loading-text">LOADING</h1>
        <div className="loader-container">
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="status-msg">{status}</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;