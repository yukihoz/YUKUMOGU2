import { useState, useEffect, useRef } from 'react'
import RhythmVisualizer from './components/RhythmVisualizer'
import TimerControls from './components/TimerControls'
import Settings from './components/Settings'
import './App.css' // We might not need this if we put everything in index.css, but let's keep it empty or remove it.

function App() {
  // Settings
  const [eatDuration, setEatDuration] = useState(5);
  const [chewDuration, setChewDuration] = useState(20);

  // State
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('idle'); // 'idle', 'eating', 'chewing'
  const [timeLeft, setTimeLeft] = useState(0);

  const timerRef = useRef(null);

  // Start/Stop Logic
  const toggleTimer = () => {
    if (isActive) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsActive(true);
      if (phase === 'idle') {
        setPhase('eating');
        setTimeLeft(eatDuration);
      }
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setPhase('idle');
    setTimeLeft(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Timer Loop
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0.1) {
            // Phase transition
            if (phase === 'eating') {
              setPhase('chewing');
              return chewDuration;
            } else {
              setPhase('eating');
              return eatDuration;
            }
          }
          return prev - 0.1;
        });
      }, 100);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, phase, eatDuration, chewDuration]);

  return (
    <div className="container">
      <h1>Yukumogu</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        ゆっくり食べる、健やかなリズム。<br />
        Slow eating for a healthy life.
      </p>

      <div className="card" style={{ padding: '3rem 2rem' }}>
        <RhythmVisualizer
          phase={phase}
          timeLeft={timeLeft}
          duration={phase === 'eating' ? eatDuration : chewDuration}
        />

        <TimerControls
          isActive={isActive}
          onToggle={toggleTimer}
          onReset={resetTimer}
        />
      </div>

      <Settings
        eatDuration={eatDuration}
        chewDuration={chewDuration}
        onEatChange={setEatDuration}
        onChewChange={setChewDuration}
        disabled={isActive}
      />
    </div>
  )
}

export default App
