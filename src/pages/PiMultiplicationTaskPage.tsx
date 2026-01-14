import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PiMultiplicationTaskPage: React.FC = () => {
  const problems = useMemo(() => Array.from({ length: 9 }, (_, i) => {
    const n = i + 1;
    const ans = (3.14 * n).toFixed(2);
    return {
      id: n,
      text: `3.14 × ${n} = `,
      correctAnswer: parseFloat(ans).toString(),
    };
  }), []);

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [activeInputId, setActiveInputId] = useState<number>(1);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // For physical keyboard users, keep the focus management.
    const activeInput = inputRefs.current[activeInputId - 1];
    if (activeInput) {
      activeInput.focus();
    }
  }, [activeInputId]);
  
  const checkAnswer = (id: number, value: string) => {
    if (value === problems[id - 1].correctAnswer) {
      setTimeout(() => {
        if (id < problems.length) {
          setActiveInputId(id + 1);
        } else {
          inputRefs.current[id - 1]?.blur();
        }
      }, 300); // A small delay to show correctness
    }
  };

  const handleInputChange = (id: number, value: string) => {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    checkAnswer(id, value);
  };
  
  const handleKeypadClick = (key: string) => {
    if (activeInputId === null) return;

    const currentAnswer = answers[activeInputId] || '';
    let newAnswer = currentAnswer;

    switch (key) {
      case 'C':
        newAnswer = '';
        break;
      case 'BS':
        newAnswer = currentAnswer.slice(0, -1);
        break;
      case 'Enter':
        checkAnswer(activeInputId, currentAnswer);
        return; // Avoid re-setting the answer
      default: // Numbers and dot
        if (key === '.' && currentAnswer.includes('.')) return; // Avoid multiple dots
        newAnswer = currentAnswer + key;
        break;
    }
    
    handleInputChange(activeInputId, newAnswer);
  };

  const keypadLayout = [
    '7', '8', '9', 'C',
    '4', '5', '6', 'BS',
    '1', '2', '3', 'Enter',
    '0', '.',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#212529', color: '#f8f9fa' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 15px 0', fontSize: '1.5em', color: '#f8f9fa' }}>3.14の段</h2>
        <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {problems.map((problem, index) => {
              const isAnsweredCorrectly = answers[problem.id] === problem.correctAnswer;
              return (
                <div key={problem.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label htmlFor={`problem-${problem.id}`} style={{ flex: '0 0 120px', fontFamily: 'monospace', fontSize: '1.4em', color: '#ced4da' }}>
                    {problem.text}
                  </label>
                  <input
                    id={`problem-${problem.id}`}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    readOnly
                    value={answers[problem.id] || ''}
                    onFocus={() => setActiveInputId(problem.id)}
                    style={{
                      flex: 1,
                      fontSize: '1.4em',
                      padding: '8px',
                      border: `1px solid ${activeInputId === problem.id ? '#0d6efd' : '#6c757d'}`,
                      borderRadius: '4px',
                      backgroundColor: isAnsweredCorrectly ? '#28a745' : '#343a40',
                      color: isAnsweredCorrectly ? '#ffffff' : '#f8f9fa',
                      textAlign: 'right',
                      boxShadow: activeInputId === problem.id ? '0 0 0 2px rgba(13, 110, 253, 0.5)' : 'none',
                      outline: 'none',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/basic-learning-menu" style={{ color: '#8ab4f8' }}>基礎学習メニューに戻る</Link>
        </div>
      </div>

      {/* Keypad */}
      <div style={{ flexShrink: 0, padding: '5px', backgroundColor: '#343a40', borderTop: '1px solid #495057' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px', maxWidth: '400px', margin: '0 auto' }}>
          {keypadLayout.map(key => (
            <button
              key={key}
              onClick={() => handleKeypadClick(key)}
              style={{
                gridColumn: (key === 'Enter' || key === 'BS') ? 'span 1' : ((key === '0' || key === '.') ? 'span 2' : 'span 1'),
                padding: '15px 0',
                fontSize: '1.5em',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#495057',
                color: '#f8f9fa',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                cursor: 'pointer',
              }}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PiMultiplicationTaskPage;