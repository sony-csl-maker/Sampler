import {useEffect, useRef, useState} from 'react';
import * as Tone from 'tone';
import { audioProps, audioPropsSetter } from './AudioProps';

function Waveform(props: audioProps & audioPropsSetter) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
  
      if (!canvas || !context) return;
  
      const { audioBuffer, offset } = props;
      // Get waveform data from the first channel
      const data = audioBuffer.getChannelData(0);
  
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

      // Draw a line at the current time
      context.beginPath();
      context.lineWidth = 1;
      context.strokeStyle = '#f00';
      context.moveTo(offset / audioBuffer.duration * width, 0);
      context.lineTo(offset / audioBuffer.duration * width, height);
      context.stroke();
  }, [props.audioBuffer, props.offset]);

    return (
      <div className="waveform">
        <canvas ref={canvasRef} height={150} width={500} />
      </div>
    );
}

export default Waveform;
