import React from 'react';

const Settings = ({ eatDuration, chewDuration, onEatChange, onChewChange, disabled }) => {
    return (
        <div className="card" style={{ marginTop: '2rem', textAlign: 'left' }}>
            <h3 style={{ marginTop: 0, fontSize: '1.2rem', color: '#888' }}>設定 (Settings)</h3>

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    食べる時間 (Eat Duration): {eatDuration}秒
                </label>
                <input
                    type="range"
                    min="1"
                    max="30"
                    value={eatDuration}
                    onChange={(e) => onEatChange(Number(e.target.value))}
                    disabled={disabled}
                    style={{ width: '100%' }}
                />
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    噛む時間 (Chew Duration): {chewDuration}秒
                </label>
                <input
                    type="range"
                    min="5"
                    max="60"
                    value={chewDuration}
                    onChange={(e) => onChewChange(Number(e.target.value))}
                    disabled={disabled}
                    style={{ width: '100%' }}
                />
            </div>
        </div>
    );
};

export default Settings;
