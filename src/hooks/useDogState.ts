import { useState, useEffect } from 'react';

export interface DogState {
  name: string;
  level: number;
  exp: number;
}

const getInitialState = (): DogState => {
  const savedState = localStorage.getItem('dogState');
  if (savedState) {
    return JSON.parse(savedState);
  }
  return {
    name: 'ポチ',
    level: 1,
    exp: 0,
  };
};

export const useDogState = () => {
  const [dogState, setDogState] = useState<DogState>(getInitialState);

  useEffect(() => {
    localStorage.setItem('dogState', JSON.stringify(dogState));
  }, [dogState]);

  const addExp = (amount: number) => {
    setDogState(prevState => {
      const newExp = prevState.exp + amount;
      const newLevel = Math.floor(newExp / 100) + 1;
      return {
        ...prevState,
        exp: newExp,
        level: newLevel,
      };
    });
  };

  return { dogState, addExp };
};
