import React from 'react';
import { DogState } from '../hooks/useDogState';

interface DogProps {
  dogState: DogState;
}

const Dog: React.FC<DogProps> = ({ dogState }) => {
  const size = 30 + dogState.level * 5;

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>{dogState.name}</h3>
      <div style={{ fontSize: `${size}px` }}>
        🐶
      </div>
      <p>Level: {dogState.level}</p>
      <p>EXP: {dogState.exp}</p>
    </div>
  );
};

export default Dog;
