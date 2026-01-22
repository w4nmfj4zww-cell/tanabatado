import React from 'react';

interface KeypadProps {
  onKeypadClick: (key: string) => void;
}

const Keypad: React.FC<KeypadProps> = ({ onKeypadClick }) => {
  const keypadLayout = [
    '7', '8', '9', 'C',
    '4', '5', '6', 'BS',
    '1', '2', '3', 'Enter',
    '0', '.',
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '5px',
      backgroundColor: '#343a40',
      borderTop: '1px solid #495057',
      height: '25vh', // A bit more than 5% to be usable
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px', maxWidth: '400px', margin: '0 auto', height: '100%' }}>
        {keypadLayout.map(key => (
          <button
            key={key}
            onClick={() => onKeypadClick(key)}
            style={{
              gridColumn: (key === 'Enter' || key === 'BS') ? 'span 1' : ((key === '0' || key === '.') ? 'span 2' : 'span 1'),
              padding: '15px 0',
              fontSize: '1.5em',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: '#495057',
              color: '#f8f9fa',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              height: '100%',
            }}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Keypad;
