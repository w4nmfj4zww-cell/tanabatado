import { createContext } from 'react';
import { DogState } from '../hooks/useDogState';

interface DogContextType {
  dogState: DogState;
  addExp: (amount: number) => void;
}

export const DogContext = createContext<DogContextType | undefined>(undefined);
