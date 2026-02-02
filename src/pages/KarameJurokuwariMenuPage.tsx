import React from 'react';
import { Link } from 'react-router-dom';

const KarameJurokuwariMenuPage: React.FC = () => {
  const levels = [2, 4, 8, 16];

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>唐目十六割メニュー</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
        {levels.map(level => (
          <Link key={level} to={`/karame-jurokuwari-task/${level}`}>
            <button style={{ width: '100%', padding: '20px', fontSize: '1.2em' }}>
              {level}の段
            </button>
          </Link>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <Link to="/basic-learning-menu">
          <button>戻る</button>
        </Link>
      </div>
    </div>
  );
};

export default KarameJurokuwariMenuPage;
