import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DogContext } from '../contexts/DogContext';
import Dog from '../components/Dog';
import DogModal from '../components/DogModal';

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dogContext = useContext(DogContext);

  if (!dogContext) {
    // or a loading spinner
    return <div>Loading...</div>;
  }

  const { dogState } = dogContext;

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
        <Dog dogState={dogState} />
      </div>
      <button onClick={() => setIsModalOpen(true)}>犬を呼び出す</button>

      {isModalOpen && <DogModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default HomePage;
