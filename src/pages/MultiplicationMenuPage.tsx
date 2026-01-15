import React from 'react';
import { Link } from 'react-router-dom';

const MultiplicationMenuPage: React.FC = () => {
  const levels = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>九九メニュー</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', maxWidth: '600px', margin: '0 auto' }}>
        {levels.map(level => (
          <Link key={level} to={`/multiplication-task/${level}`}>
            <button style={{ width: '100%', padding: '20px', fontSize: '1.2em' }}>
              {level}の段
            </button>
          </Link>
        ))}
        <Link key="pi" to="/pi-multiplication">
          <button style={{ width: '100%', padding: '20px', fontSize: '1.2em' }}>
            3.14の段
          </button>
        </Link>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Link to="/basic-learning-menu">
          <button>戻る</button>
        </Link>
      </div>
    </div>
  );
};

export default MultiplicationMenuPage;
