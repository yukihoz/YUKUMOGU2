import React from 'react';

const RhythmVisualizer = ({ phase, timeLeft, duration }) => {
  // phase: 'idle', 'eating', 'chewing'
  
  const getMessage = () => {
    switch(phase) {
      case 'eating': return 'いただきます (Eat)';
      case 'chewing': return 'よく噛んで (Chew)';
      default: return '準備 (Ready)';
    }
  };

  const getColor = () => {
    switch(phase) {
      case 'eating': return 'var(--color-primary)';
      case 'chewing': return 'var(--color-secondary)';
      default: return '#ddd';
    }
  };

  const size = 250;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = phase === 'idle' ? 0 : ((duration - timeLeft) / duration) * circumference;
  
  // Invert progress for countdown effect if desired, or keep as filling up
  // Let's make it a countdown (depleting ring)
  const strokeDashoffset = phase === 'idle' ? 0 : -progress;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      margin: '2rem 0'
    }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        {/* Background Circle */}
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            stroke="#eee"
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress Circle */}
          <circle
            stroke={getColor()}
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            strokeDasharray={circumference + ' ' + circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.1s linear, stroke 0.5s ease' }}
          />
        </svg>
        
        {/* Center Content */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          animation: phase === 'eating' ? 'breathe 3s infinite ease-in-out' : 'none'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            margin: 0, 
            color: getColor(),
            transition: 'color 0.5s ease'
          }}>
            {getMessage()}
          </h2>
          {phase !== 'idle' && (
            <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#555' }}>
              {Math.ceil(timeLeft)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RhythmVisualizer;
