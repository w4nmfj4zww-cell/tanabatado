import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Keypad from '../components/Keypad';

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
  const navigate = useNavigate();
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
    if (isTimeUp || elapsedTime) {
      setTimeout(() => {
        navigate('/results', { state: { score: correctAnswersCount, total: totalCells } });
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
      setActiveCell(null); // Disable keypad
    }
  }, [timeLeft, isTimeUp, elapsedTime, navigate, correctAnswersCount, totalCells]);

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
          setElapsedTime(Date.now() - (startTime || 0));
        }
      }, 100); // Faster feedback
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
    
    const correctAnswer = correctAnswers[answerKey];
    if (correctAnswer === newAnswer) {
      handleAnswerChange(row, col, newAnswer);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#212529', color: '#f8f9fa' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px', paddingBottom: '30vh' /* Space for keypad */ }}>
        <h1 style={{ textAlign: 'center', fontSize: '1.8em', margin: '10px 0' }}>100マス計算</h1>
        <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '1.2em' }}>
          <p>残り時間: {timeLeft} 秒</p>
          {isTimeUp && <p style={{ color: 'red' }}>時間切れ！</p>}
        </div>
        <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
          {/* ... table content ... */}
        </table>
        <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '1.2em' }}>
          <p>正解数: {correctAnswersCount} / {totalCells}</p>
          {elapsedTime && <p>クリアタイム: {(elapsedTime / 1000).toFixed(2)} 秒</p>}
        </div>
      </div>
      
      <Keypad onKeypadClick={handleKeypadClick} />
    </div>
  );
};

// ... styles ...

export default HundredSquareCalculationPage;
