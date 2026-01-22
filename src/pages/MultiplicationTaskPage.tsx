import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Keypad from '../components/Keypad';

const MultiplicationTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const { level: levelString } = useParams<{ level: string }>();
  const level = levelString ? parseInt(levelString, 10) : 1;

  const problems = useMemo(() => Array.from({ length: 9 }, (_, i) => {
    const n = i + 1;
    const ans = (level * n).toString();
    return {
      id: n,
      text: `${level} × ${n} = `,
      correctAnswer: ans,
    };
  }), [level]);

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
    if (isTimeUp || (activeInputId === null && !isTimeUp)) { // Trigger navigation when time is up or all questions answered
      setTimeout(() => {
        // Calculate score for MultiplicationTaskPage
        const correctCount = problems.filter(p => answers[p.id] === p.correctAnswer).length;
        navigate('/results', { state: { score: correctCount, total: problems.length } });
      }, 1000); // Wait a bit to show the final state
      return;
    }

    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setIsTimeUp(true);
      setActiveInputId(null); // Disable keypad
    }
  }, [timeLeft, isTimeUp, activeInputId, navigate, problems, answers]);

  const checkAnswer = (id: number, value: string) => {
    if (value === problems[id - 1].correctAnswer) {
      setTimeout(() => {
        if (id < problems.length) {
          setActiveInputId(id + 1);
        } else {
          inputRefs.current[id - 1]?.blur();
          setActiveInputId(null); // All questions answered
        }
      }, 300); // A small delay to show correctness
    }
  };

  const handleInputChange = (id: number, value: string) => {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    // Only check answer, don't auto-advance here. Let Enter or full correct answer do that.
    if (value === problems[id - 1].correctAnswer) {
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
        if (currentAnswer === problems[activeInputId - 1].correctAnswer) {
          if (activeInputId < problems.length) {
            setActiveInputId(activeInputId + 1);
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#212529', color: '#f8f9fa' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', paddingBottom: '30vh' /* Space for keypad */ }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 15px 0', fontSize: '1.5em', color: '#f8f9fa' }}>{level}の段</h2>
        <div style={{ textAlign: 'center', margin: '15px 0', fontSize: '1.2em' }}>
          <p>残り時間: {timeLeft} 秒</p>
          {isTimeUp && <p style={{ color: 'red' }}>時間切れ！</p>}
        </div>
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
        {/* Removed Link to multiplication-menu */}
      </div>

      <Keypad onKeypadClick={handleKeypadClick} />
    </div>
  );
};

export default MultiplicationTaskPage;
