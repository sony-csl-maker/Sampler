import React, {FC, useRef, useState} from 'react';

interface DistanceTrackerProps {
  localValue: number;

  setIsSliding: (value: boolean) => void;
  sliderAcceleration: number;

  onChange: (value: number) => void;
  onChangeEnd: (value: number) => void;
  minValue: number;
  maxValue: number;
}

const DistanceTracker: FC<DistanceTrackerProps> = ({
  localValue,

  setIsSliding,
  sliderAcceleration,

  onChange,
  onChangeEnd,
  minValue,
  maxValue,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [distance, setDistance] = useState<number>(0);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setStartY(event.clientY);
    setIsSliding(true);
  };

  const handleMouseUp = () => {
    setStartY(null);
    setDistance(0);

    setIsSliding(false);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (startY !== null) {
      const currentY = event.clientY;
      const calculatedDistance = Math.abs(currentY - startY);

      const acceleratedMovement = (distance / 750) * (sliderAcceleration / 100);

      if (currentY > startY) {

        const sliderValue = (localValue - acceleratedMovement > maxValue ? maxValue : localValue - acceleratedMovement < minValue ? minValue : localValue - acceleratedMovement)

        setDistance(calculatedDistance);
        onChange(sliderValue);
      } else {
        const sliderValue = (localValue + acceleratedMovement > maxValue ? maxValue : localValue + acceleratedMovement < minValue ? minValue : localValue + acceleratedMovement)

        setDistance(calculatedDistance);
        onChange(sliderValue);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
      onMouseDown={(event: any) => {
        handleMouseDown(event);
        setIsMouseDown(true);
      }}
      onMouseUp={() => {
        handleMouseUp();
        onChangeEnd(localValue);
        setIsMouseDown(false)
      }}

      onMouseMove={(event: any) => {
        handleMouseMove(event);
      }}
      onMouseLeave={(event: any) => {
        if (event.target === containerRef.current && isMouseDown) {
          setIsMouseDown(false);
          handleMouseUp();
          onChangeEnd(localValue)
        }
      }}
    />
  );
};

export default DistanceTracker;
