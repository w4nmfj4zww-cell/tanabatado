import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  return (
    <div>
      <h1>トップページ</h1>
      <div>
        <Link to="/basic-learning-menu">
          <button>基礎学習</button>
        </Link>
        <Link to="/advanced-learning">
          <button>応用学習</button>
        </Link>
      </div>
      <div>
        <h2>犬の成長状態</h2>
        <p>（ここに犬のステータスが表示されます）</p>
      </div>
      
      {isDogVisible && dogImageUrl && (
        <div style={{ marginTop: '20px' }}>
          <img src={dogImageUrl} alt="呼び出された犬" style={{ maxWidth: '300px', maxHeight: '300px' }} />
        </div>
      )}

      <button onClick={handleDogCall} style={{ marginTop: '20px' }}>
        {isDogVisible ? '犬を隠す' : '犬を呼び出す'}
      </button>

      <div style={{ marginTop: '50px' }}>
        <Link to="/admin">
          <button>管理者用UI</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;