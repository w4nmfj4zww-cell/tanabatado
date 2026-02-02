import React from 'react';
// import dogImage from '../assets/chihuahua.jpg';
import reactLogo from '../assets/react.svg';


interface DogProps {
  isVisible: boolean;
}

const Dog: React.FC<DogProps> = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <p>Visible: {String(isVisible)}</p>
      <img src={reactLogo} alt="React Logo" style={{ width: '150px' }} />
    </div>
  );
};

export default Dog;
