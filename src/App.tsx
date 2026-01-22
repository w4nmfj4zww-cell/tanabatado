import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleCameraOpen = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
    } catch (error) {
      console.error('Error opening camera:', error);
    }
  };

  const handleTakePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const imageDataUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageDataUrl);
        // Stop the camera stream
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
      }
    }
  };

  return (
    <div className="App">
      <h1>Camera App</h1>
      {!stream && !capturedImage && (
        <button onClick={handleCameraOpen}>
          Open Camera
        </button>
      )}
      <div className="camera-container">
        {stream && <video ref={videoRef} autoPlay playsInline className="camera-view" />}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      {stream && (
        <button onClick={handleTakePicture}>
          Take Picture
        </button>
      )}
      {capturedImage && (
        <div className="captured-image-container">
          <h2>Captured Image:</h2>
          <img src={capturedImage} alt="Captured" className="captured-image" />
          <button onClick={() => setCapturedImage(null)}>
            Take Another Picture
          </button>
        </div>
      )}
    </div>
  );
}

export default App;