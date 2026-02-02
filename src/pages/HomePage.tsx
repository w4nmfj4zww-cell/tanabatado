import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dog from '../components/Dog';

const HomePage: React.FC = () => {
  const [isDogVisible, setIsDogVisible] = useState(false);
  const [dogImageUrl, setDogImageUrl] = useState<string | null>(null);

  const handleDogCall = () => {
    if (isDogVisible) {
      setIsDogVisible(false);
    } else {
      const storedImage = localStorage.getItem('dogImage');
      if (storedImage) {
        setDogImageUrl(storedImage);
        setIsDogVisible(true);
      } else {
        alert('犬の画像が登録されていません。管理者ページで登録してください。');
      }
    }
  };

  const [isDogVisible, setIsDogVisible] = useState(true);

  const handleToggleDog = () => {
    setIsDogVisible(prev => !prev);
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '20px' }}>
      <h1>トップページ</h1>
      <div style={{ margin: '20px 0' }}>
        <Link to="/basic-learning-menu">
          <button style={{ padding: '10px 20px', fontSize: '1.2em', marginRight: '10px' }}>基礎学習</button>
        </Link>
        <Link to="/advanced-learning">
          <button style={{ padding: '10px 20px', fontSize: '1.2em' }}>応用学習</button>
        </Link>
      </div>
      
      <Dog isVisible={isDogVisible} />

      <div style={{ marginTop: '20px' }}>
        <h2>犬の成長状態</h2>
        <p>（ここに犬のステータスが表示されます）</p>
      </div>

      <button onClick={handleToggleDog} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1.2em' }}>
        {isDogVisible ? '犬を帰す' : '犬を呼び出す'}
      </button>
    </div>
  );
};

export default HomePage;