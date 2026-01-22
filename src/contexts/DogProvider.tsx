import React, { ReactNode } from 'react';
import { DogContext } from './DogContext';
import { useDogState } from '../hooks/useDogState';

interface DogProviderProps {
  children: ReactNode;
}

export const DogProvider: React.FC<DogProviderProps> = ({ children }) => {
  const { dogState, addExp } = useDogState();

  return (
    <DogContext.Provider value={{ dogState, addExp }}>
      {children}
    </DogContext.Provider>
  );
};
