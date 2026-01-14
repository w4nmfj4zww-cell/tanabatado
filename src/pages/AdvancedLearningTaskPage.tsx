import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  correctAnswer: string;
}

const initialQuestions: Question[] = [
  { id: 1, text: '12 + 45 = ?', correctAnswer: '57' },
  { id: 2, text: '100 - 33 = ?', correctAnswer: '67' },
  { id: 3, text: '15 x 5 = ?', correctAnswer: '75' },
];

const AdvancedLearningTaskPage: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();

  const handleInputChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would calculate the score here.
    console.log('Submitted Answers:', answers);
    navigate('/results');
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 2, padding: '20px' }}>
        <h1>応用学習</h1>
        <form onSubmit={handleSubmit}>
          {initialQuestions.map(q => (
            <div key={q.id} style={{ marginBottom: '15px' }}>
              <label htmlFor={`q-${q.id}`}>{q.text}</label>
              <input
                id={`q-${q.id}`}
                type="text"
                value={answers[q.id] || ''}
                onChange={(e) => handleInputChange(q.id, e.target.value)}
                style={{ marginLeft: '10px' }}
              />
            </div>
          ))}
          <button type="submit">回答を提出する</button>
        </form>
      </div>
      <div style={{ flex: 1, borderLeft: '1px solid #ccc', padding: '20px', textAlign: 'center' }}>
        <h2>犬のアニメーション</h2>
        <div style={{ width: '100%', height: '200px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>（犬がリラックスしています）</p>
        </div>
        <p>（学習状況に応じてアニメーションが変化します）</p>
      </div>
    </div>
  );
};

export default AdvancedLearningTaskPage;