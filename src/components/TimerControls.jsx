import React from 'react';

const TimerControls = ({ isActive, onToggle, onReset }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <button
                className={isActive ? 'secondary' : 'primary'}
                onClick={onToggle}
            >
                {isActive ? '一時停止 (Pause)' : 'スタート (Start)'}
            </button>
            <button onClick={onReset}>
                リセット (Reset)
            </button>
        </div>
    );
};

export default TimerControls;
