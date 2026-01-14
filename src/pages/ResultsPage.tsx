import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ResultsPage: React.FC = () => {
  // In a real app, results would be passed via state or context
  // For example: const location = useLocation();
  // const { score, correctAnswers, totalQuestions } = location.state || {};

  // Using placeholder data for now
  const score = 80;
  const correctAnswers = 8;
  const totalQuestions = 10;
  const correctRate = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  return (
    <div>
      <h1>学習結果</h1>
      <div>
        <h2>成績</h2>
        <p>正答率: {correctRate.toFixed(1)}%</p>
        <p>得点: {score}点</p>
      </div>
      <div>
        <h2>犬の成長</h2>
        <p>（ここに犬の成長度合いが表示されます）</p>
        <p>（経験値がXX増えました！）</p>
      </div>
      <div>
        <h2>次の学習へ</h2>
        <Link to="/basic-learning-menu">
          <button>もう一度基礎学習をする</button>
        </Link>
        <Link to="/advanced-learning">
          <button>応用学習に進む</button>
        </Link>
        <Link to="/">
          <button>トップページに戻る</button>
        </Link>
      </div>
    </div>
  );
};

export default ResultsPage;