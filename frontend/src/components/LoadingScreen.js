import React from 'react';

const LoadingScreen = ({ progress = 0 }) => {
  const messages = [
    "Initializing resources...",
    "Loading hero data...",
    "Checking Rank status...",
    "Welcome, Legend!"
  ];

  let status = messages[0];
  if (progress >= 25) status = messages[0];
  if (progress >= 50) status = messages[1];
  if (progress >= 75) status = messages[2];
  if (progress >= 95) status = messages[3];

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
      <div className="animate-up" style={{
        textAlign: 'center',
        padding: '20px'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 10vw, 5rem)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: 'clamp(5px, 3vw, 20px)',
          margin: 0,
          textTransform: 'uppercase',
          background: 'linear-gradient(90deg, #555, #f1c40f, #fff, #f1c40f, #555)',
          backgroundSize: '80% auto',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shine 3s linear infinite',
          whiteSpace: 'nowrap'
        }}>LOADING</h1>
        <div style={{ 
          width: 'clamp(200px, 80vw, 350px)', 
          marginTop: '20px', 
          textAlign: 'center' 
        }}>
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
            fontSize: 'clamp(10px, 4vw, 14px)',
            letterSpacing: 'clamp(2px, 2vw, 5px)',
            marginTop: '15px',
            textTransform: 'uppercase'
          }}>{status}</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;