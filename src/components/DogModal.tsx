import React, { useContext } from 'react';
import { DogContext } from '../contexts/DogContext';
import Dog from './Dog';

interface DogModalProps {
  onClose: () => void;
}

const DogModal: React.FC<DogModalProps> = ({ onClose }) => {
  const dogContext = useContext(DogContext);

  if (!dogContext) {
    return null;
  }

  const { dogState } = dogContext;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', color: 'black' }}>
        <Dog dogState={dogState} />
        <button onClick={onClose} style={{ marginTop: '20px' }}>閉じる</button>
      </div>
    </div>
  );
};

export default DogModal;
