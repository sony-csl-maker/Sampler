import {useEffect, useRef, useCallback} from 'react';
import { audioProps, audioPropsSetter } from './AudioProps';

function Waveform(props: audioProps & audioPropsSetter) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const paintWaveform = useCallback(() => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
  
      if (!canvas || !context) return;

      const { audioBuffer } = props;

      // Get the waveform data from the audio buffer
      const data = audioBuffer.getChannelData(0);

      if (!data) return;
  
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const length = data.length;
      const sliceWidth = width / length;
  
      const paddingTop = 10; // Adjust the top padding as needed
      const paddingBottom = 10; // Adjust the bottom padding as needed
  
      canvas.width = width;
      canvas.height = height;
  
      context.clearRect(0, 0, width, height);
  
      // Fill the canvas background
      context.fillStyle = 'rgba(0, 0, 0, 0)';
      context.fillRect(0, 0, width, height);
  
      // Increase the lineWidth to get a "bold" waveform
      context.lineWidth = 1;
      context.strokeStyle = '#fff';
  
      context.beginPath();

      for (let i = 0; i < length; i++) {
        const x = i * sliceWidth;
        const y = (data[i] + 1) * (height - paddingTop - paddingBottom) * 0.5 + paddingTop;
  
        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }
      context.stroke();
  }, []);

  useEffect(() => {
    if (canvasRef.current)
      paintWaveform();
  }, [canvasRef]);

    return (
      <div className="waveform">
        <canvas ref={canvasRef} height={150} width={500} />
      </div>
    );
}
export default Waveform;
