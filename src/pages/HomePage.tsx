import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
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
      <button>犬を呼び出す</button>
    </div>
  );
};

export default HomePage;