import {useEffect, useRef, useState, useMemo} from 'react';
import { audioProps, audioPropsSetter } from './AudioProps';

function Waveform(props: audioProps & audioPropsSetter) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [offsetPosX, setOffsetPosX] = useState(0);

    const drawBuffer = useMemo(() => () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');

      if (!canvas || !context) return;

      const { audioBuffer } = props;

      // Get the waveform data from the audio buffer
      const data = audioBuffer.getChannelData(0);
      
      if (!data) return;

      const width = canvas.width;
      const height = canvas.height;

      const step = Math.ceil( data.length / width );
      const amp = height / 2;

      context.fillStyle = "silver";
      context.clearRect(0,0,width,height);

      for(let i=0; i < width; i++){
        // loops through canvas pixels horizontally
        let max = 1.0;
        let min = -1.0;
        
        for (let j=0; j<step; j++) {
          // loops through data ponits step times
          let datum = data[(i*step)+j];
          if (datum < max)
            max = datum;
          if (datum > min)
            min = datum;
        }

        context.fillRect(i, (1+max)*amp, 1, Math.max(1,(min-max)*amp));
      }
    }, [props.audioBuffer]);

    const drawOffsetBar = () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');

      if (!canvas || !context) return;

      const { audioBuffer, offset } = props;

      const width = canvas.width;
      const height = canvas.height;
      const offsetWidth = offset * width / audioBuffer.duration;
      setOffsetPosX(offsetWidth);

      context.fillStyle = "red";
      context.fillRect(offsetPosX, 0, 1, height);

    }

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;
  
        drawBuffer();
        drawOffsetBar();
        canvas.addEventListener('click', handleCanvasClick);

        return () => {
          canvas.removeEventListener('click', handleCanvasClick);
        };
    }, [props.audioBuffer, props.offset]);

    const handleCanvasClick = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
  
      const rect = canvas.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
  
      const { audioBuffer } = props;
      const newOffset = (offsetX / canvas.width) * audioBuffer.duration;
      setOffsetPosX(offsetX);
      props.setOffset(newOffset);
    };

    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (parseFloat(event.target.value) > props.endTime)
        return;
      const newStartTime = parseFloat(event.target.value);
      props.setStartTime(newStartTime);
    };

    const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (parseFloat(event.target.value) < props.startTime)
        return;
      const newEndTime = parseFloat(event.target.value);
      props.setEndTime(newEndTime);
    };

    return (
      <div>
        <canvas ref={canvasRef} height={100} width={700} />
        <div>
        Start Time:
        <input type="number" value={props.startTime} onChange={handleStartTimeChange} />
      </div>
        <div>
          End Time:
          <input type="number" value={props.endTime} onChange={handleEndTimeChange} />
        </div>
      </div>
    );
}
export default Waveform;
