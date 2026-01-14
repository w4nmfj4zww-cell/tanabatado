import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BasicLearningTaskPage: React.FC = () => {
  const [timer, setTimer] = useState(30);
  const [question, setQuestion] = useState('8 x 7 = ?'); // Placeholder question
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      // Navigate to results page when timer is up
      navigate('/results');
    }
  }, [timer, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple feedback logic
    if (answer === '56') {
      setFeedback('正解！');
      // Move to next question or end session
    } else {
      setFeedback('残念、不正解です。');
    }
    setAnswer('');
    // For now, just showing feedback. In a real scenario, we'd load a new question.
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <p>タイマー: {timer}秒</p>
        <div style={{ fontSize: '2rem', margin: '20px' }}>
          {/* For LaTeX, we'd use a component like <Latex>{`\(${question}\)`}</Latex> */}
          {question}
        </div>
        {feedback && <p>{feedback}</p>}
      </div>
      <div style={{ height: '10vh', borderTop: '1px solid #ccc', padding: '10px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            style={{ marginRight: '10px', width: '200px', padding: '10px' }}
            placeholder="答えを入力"
          />
          <button type="submit">回答</button>
        </form>
      </div>
    </div>
  );
};

export default BasicLearningTaskPage;