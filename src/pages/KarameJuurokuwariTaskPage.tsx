import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

const KarameJuurokuwariTaskPage: React.FC = () => {
  const { level: levelString } = useParams<{ level: string }>();
  const level = levelString ? parseInt(levelString, 10) : 2; // Default to 2

  const problems = useMemo(() => {
    const problemCount = level === 2 ? 1 : level;
    return Array.from({ length: problemCount }, (_, i) => {
      const numerator = i + 1;
      const ans = (numerator / level).toString();
      return {
        id: numerator,
        text: `${numerator} / ${level} = `,
        correctAnswer: ans,
      };
    });
  }, [level]);

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [activeInputId, setActiveInputId] = useState<number | null>(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (activeInputId === null) return;
    const activeInput = inputRefs.current[activeInputId - 1];
    if (activeInput) {
      activeInput.focus();
    }
  }, [activeInputId]);
  
  useEffect(() => {
    if (isTimeUp || activeInputId === null) return;

    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setIsTimeUp(true);
      setActiveInputId(null); // Disable keypad
    }
  }, [timeLeft, isTimeUp, activeInputId]);

  const checkAnswer = (id: number, value: string) => {
    const problem = problems.find(p => p.id === id);
    if (problem && value === problem.correctAnswer) {
      setTimeout(() => {
        const currentIndex = problems.findIndex(p => p.id === id);
        if (currentIndex < problems.length - 1) {
          setActiveInputId(problems[currentIndex + 1].id);
        } else {
          inputRefs.current[currentIndex]?.blur();
          setActiveInputId(null); // All questions answered
        }
      }, 300); // A small delay to show correctness
    }
  };

  const handleInputChange = (id: number, value: string) => {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    const problem = problems.find(p => p.id === id);
    if (problem && value === problem.correctAnswer) {
      checkAnswer(id, value);
    }
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
        const problem = problems.find(p => p.id === activeInputId);
        if (problem && currentAnswer === problem.correctAnswer) {
          const currentIndex = problems.findIndex(p => p.id === activeInputId);
          if (currentIndex < problems.length - 1) {
            setActiveInputId(problems[currentIndex + 1].id);
          } else {
            setActiveInputId(null); // All questions answered
          }
        }
        return; // Avoid re-setting the answer
      default: // Numbers and dot
        if (key === '.' && currentAnswer.includes('.')) return;
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

  const getProblemIndex = (id: number) => problems.findIndex(p => p.id === id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#212529', color: '#f8f9fa' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 15px 0', fontSize: '1.5em', color: '#f8f9fa' }}>唐目十六割 - {level}の段</h2>
        <div style={{ textAlign: 'center', margin: '15px 0', fontSize: '1.2em' }}>
          <p>残り時間: {timeLeft} 秒</p>
          {isTimeUp && <p style={{ color: 'red' }}>時間切れ！</p>}
        </div>
        <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {problems.map((problem) => {
              const isAnsweredCorrectly = answers[problem.id] === problem.correctAnswer;
              return (
                <div key={problem.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label htmlFor={`problem-${problem.id}`} style={{ flex: '0 0 120px', fontFamily: 'monospace', fontSize: '1.4em', color: '#ced4da' }}>
                    {problem.text}
                  </label>
                  <input
                    id={`problem-${problem.id}`}
                    ref={el => {
                      const index = getProblemIndex(problem.id);
                      if(index !== -1) inputRefs.current[index] = el;
                    }}
                    type="text"
                    readOnly
                    value={answers[problem.id] || ''}
                    onFocus={!isTimeUp ? () => setActiveInputId(problem.id) : undefined}
                    style={{
                      flex: 1,
                      fontSize: '1.4em',
                      padding: '8px',
                      border: `1px solid ${activeInputId === problem.id && !isTimeUp ? '#0d6efd' : '#6c757d'}`,
                      borderRadius: '4px',
                      backgroundColor: isAnsweredCorrectly ? '#28a745' : '#343a40',
                      color: isAnsweredCorrectly ? '#ffffff' : '#f8f9fa',
                      textAlign: 'right',
                      boxShadow: activeInputId === problem.id && !isTimeUp ? '0 0 0 2px rgba(13, 110, 253, 0.5)' : 'none',
                      outline: 'none',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/karame-juurokuwari-menu" style={{ color: '#8ab4f8' }}>メニューに戻る</Link>
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

export default KarameJuurokuwariTaskPage;
