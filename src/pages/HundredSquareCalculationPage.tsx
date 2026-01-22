import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

// Function to generate and shuffle an array of numbers
const generateShuffledNumbers = (size: number): number[] => {
  const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers.slice(0, size);
};

const HundredSquareCalculationPage: React.FC = () => {
  const gridSize = 9;
  const [horizontalNumbers, setHorizontalNumbers] = useState<number[]>([]);
  const [verticalNumbers, setVerticalNumbers] = useState<number[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [correctAnswers, setCorrectAnswers] = useState<{ [key: string]: string }>({});
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>({ row: 0, col: 0 });
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (activeCell) {
      const { row, col } = activeCell;
      const index = row * gridSize + col;
      inputRefs.current[index]?.focus();
    }
  }, [activeCell]);

  useEffect(() => {
    const hNumbers = generateShuffledNumbers(gridSize);
    const vNumbers = generateShuffledNumbers(gridSize);
    setHorizontalNumbers(hNumbers);
    setVerticalNumbers(vNumbers);

    const allCorrectAnswers: { [key: string]: string } = {};
    for (let i = 0; i < vNumbers.length; i++) {
      for (let j = 0; j < hNumbers.length; j++) {
        const key = `${i}-${j}`;
        allCorrectAnswers[key] = String(vNumbers[i] * hNumbers[j]);
      }
    }
    setCorrectAnswers(allCorrectAnswers);

    setStartTime(Date.now());
  }, []);

  const totalCells = useMemo(() => gridSize * gridSize, [gridSize]);
  const correctAnswersCount = useMemo(() => {
    return Object.keys(answers).reduce((count, key) => {
      if (answers[key] === correctAnswers[key]) {
        return count + 1;
      }
      return count;
    }, 0);
  }, [answers, correctAnswers]);

  useEffect(() => {
    if (correctAnswersCount === totalCells && startTime) {
      setElapsedTime(Date.now() - startTime);
    }
  }, [correctAnswersCount, totalCells, startTime]);

  useEffect(() => {
    if (isTimeUp || elapsedTime) return;

    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setIsTimeUp(true);
      setActiveCell(null); // Disable keypad
    }
  }, [timeLeft, isTimeUp, elapsedTime]);

  const handleAnswerChange = (row: number, col: number, value: string) => {
    const key = `${row}-${col}`;
    const isCorrect = correctAnswers[key] === value;

    setAnswers(prev => ({ ...prev, [key]: value }));

    if (isCorrect) {
      // Move to the next cell
      setTimeout(() => {
        if (col + 1 < gridSize) {
          setActiveCell({ row, col: col + 1 });
        } else if (row + 1 < gridSize) {
          setActiveCell({ row: row + 1, col: 0 });
        } else {
          setActiveCell(null); // All done
        }
      }, 300);
    }
  };

  const handleKeypadClick = (key: string) => {
    if (!activeCell) return;

    const { row, col } = activeCell;
    const answerKey = `${row}-${col}`;
    const currentAnswer = answers[answerKey] || '';
    let newAnswer = currentAnswer;

    switch (key) {
      case 'C':
        newAnswer = '';
        break;
      case 'BS':
        newAnswer = currentAnswer.slice(0, -1);
        break;
      case 'Enter':
        handleAnswerChange(row, col, newAnswer);
        return;
      default:
        newAnswer += key;
        break;
    }
    setAnswers(prev => ({ ...prev, [answerKey]: newAnswer }));
    
    // Check answer immediately after input for single-digit answers in multiplication
    const correctAnswer = correctAnswers[answerKey];
    if (correctAnswer === newAnswer) {
      handleAnswerChange(row, col, newAnswer);
    }
  };

  const keypadLayout = ['7', '8', '9', 'C', '4', '5', '6', 'BS', '1', '2', '3', 'Enter', '0'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#212529', color: '#f8f9fa' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        <h1 style={{ textAlign: 'center', fontSize: '1.8em', margin: '10px 0' }}>100マス計算</h1>
        <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{...headerCellStyle, backgroundColor: '#343a40'}}>×</th>
              {horizontalNumbers.map((num, index) => (
                <th key={index} style={headerCellStyle}>{num}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {verticalNumbers.map((vNum, rowIndex) => (
              <tr key={rowIndex}>
                <th style={headerCellStyle}>{vNum}</th>
                {horizontalNumbers.map((hNum, colIndex) => {
                  const key = `${rowIndex}-${colIndex}`;
                  const isCorrect = answers[key] === correctAnswers[key];
                  const isActive = activeCell?.row === rowIndex && activeCell?.col === colIndex;

                  return (
                    <td key={colIndex} style={{...cellStyle, backgroundColor: isCorrect ? '#28a745' : '#343a40'}}>
                      <input
                        ref={el => {
                          const index = rowIndex * gridSize + colIndex;
                          if (el) inputRefs.current[index] = el;
                        }}
                        type="text"
                        readOnly
                        onFocus={!isTimeUp ? () => setActiveCell({ row: rowIndex, col: colIndex }) : undefined}
                        value={answers[key] || ''}
                        style={{
                          ...inputStyle,
                          color: isCorrect ? '#ffffff' : '#f8f9fa',
                          backgroundColor: 'transparent',
                          boxShadow: isActive && !isTimeUp ? '0 0 0 2px rgba(13, 110, 253, 0.7) inset' : 'none'
                        }}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '1.2em' }}>
          <p>残り時間: {timeLeft} 秒</p>
          {isTimeUp && <p style={{ color: 'red' }}>時間切れ！</p>}
          <p>正解数: {correctAnswersCount} / {totalCells}</p>
          {elapsedTime && <p>クリアタイム: {(elapsedTime / 1000).toFixed(2)} 秒</p>}
        </div>
        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <Link to="/basic-learning-menu" style={{color: '#8ab4f8'}}>基礎学習メニューに戻る</Link>
        </div>
      </div>
      
      {/* Keypad */}
      <div style={{ flexShrink: 0, padding: '5px', backgroundColor: '#343a40', borderTop: '1px solid #495057' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px', maxWidth: '400px', margin: '0 auto' }}>
          {keypadLayout.map(key => (
            <button key={key} onClick={() => handleKeypadClick(key)}
              style={{
                gridColumn: key === '0' ? 'span 2' : 'span 1',
                padding: '15px 0',
                fontSize: '1.5em',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#495057',
                color: '#f8f9fa',
                cursor: 'pointer',
              }}>
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const headerCellStyle: React.CSSProperties = {
  border: '1px solid #495057',
  padding: '0',
  textAlign: 'center',
  width: '36px',
  height: '36px',
  backgroundColor: '#495057',
  fontSize: '1.2em',
  color: '#f8f9fa',
};

const cellStyle: React.CSSProperties = {
  border: '1px solid #495057',
  padding: '0',
  width: '36px',
  height: '36px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  border: 'none',
  textAlign: 'center',
  fontSize: '1.2em',
  boxSizing: 'border-box',
  outline: 'none',
};

export default HundredSquareCalculationPage;
