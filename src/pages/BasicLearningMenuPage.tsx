import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dog from '../components/Dog';

const BasicLearningMenuPage: React.FC = () => {
  const [isDogVisible, setIsDogVisible] = useState(true);

  const learningItems = [
    { id: 'kuku', name: '九九', path: '/multiplication-menu' },
    { id: 'karame', name: '唐目十六割', path: '/karame-jurokuwari-menu' },
    { id: 'karame', name: '唐目十六割', path: '/karame-juurokuwari-menu' },
    { id: 'hyakumasu', name: '百ます計算' }, // pathを削除し、選択ボタンを表示
    // 今後、他の項目をここに追加
  ];

  const handleToggleDog = () => {
    setIsDogVisible(prev => !prev);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '10px 20px', boxSizing: 'border-box', textAlign: 'center' }}>
      <div style={{ flexShrink: 0 }}>
        <h1 style={{ margin: '10px 0' }}>基礎学習内容選択</h1>
        <div>
          <h2 style={{ margin: '10px 0 5px' }}>習熟度・得点</h2>
          <p style={{ margin: 0 }}>（ここに習熟度や得点が表示されます）</p>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: '15px 0' }}>
          {learningItems.map(item => (
            <li key={item.id} style={{ marginBottom: '15px' }}>
              {item.id === 'hyakumasu' ? (
                <div>
                  <span style={{ fontSize: '1.2em', display: 'block', marginBottom: '8px' }}>{item.name}</span>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Link to="/hundred-square-addition">
                      <button style={{ padding: '10px 20px', fontSize: '1em' }}>足し算</button>
                    </Link>
                    <Link to="/hundred-square-calculation">
                      <button style={{ padding: '10px 20px', fontSize: '1em' }}>掛け算</button>
                    </Link>
                  </div>
                </div>
              ) : (
                <Link to={item.path!}>
                  <button style={{ width: '80%', maxWidth: '300px', padding: '12px', fontSize: '1.2em' }}>
                    {item.name}
                  </button>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flexShrink: 0, paddingBottom: '10px' }}>
        <Dog isVisible={isDogVisible} />
        <button onClick={handleToggleDog} style={{ width: '80%', maxWidth: '300px', padding: '12px', fontSize: '1.2em', marginTop: '10px' }}>
          {isDogVisible ? '犬を帰す' : '犬を呼び出す'}
        </button>
      </div>
    </div>
  );
};

export default BasicLearningMenuPage;