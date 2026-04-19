import React, { useState, useEffect } from 'react';

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
        
        return newProgress;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      margin: 0,
      padding: 0,
      height: '100vh',
      background: '#050505',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Oswald', sans-serif",
      overflow: 'hidden'
    }}>
      <div className="animate-up">
        <h1 style={{
          fontSize: '5rem',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '20px',
          margin: 0,
          textTransform: 'uppercase',
          background: 'linear-gradient(90deg, #555, #f1c40f, #fff, #f1c40f, #555)',
          backgroundSize: '80% auto',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shine 3s linear infinite'
        }}>LOADING</h1>
        <div style={{ width: '350px', marginTop: '20px', textAlign: 'center' }}>
          <div style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: '#f1c40f',
              boxShadow: '0 0 15px #f1c40f',
              transition: 'width 0.1s linear'
            }}></div>
          </div>
          <div style={{
            color: '#666',
            fontSize: '0.8rem',
            letterSpacing: '5px',
            marginTop: '15px',
            textTransform: 'uppercase'
          }}>{status}</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;