import { FC, useEffect, useState } from "react";

import "./RotarySlider.css";
import RotarySliderGauge from "./RotarySliderGauge";

import DistanceTracker from "./DistanceTracker";

interface RotarySliderProps {
  value: number;
  onChange: (value: number) => void;
  type: "Kick" | "Snare" | "Cymbal" | "Variation";

  size: number;

  showGauge: boolean;
  showHand: boolean;
  onChangeEnd: (value: number) => void;
  minValue: number;
  maxValue: number;
}

const RotarySlider: FC<RotarySliderProps> = ({
  value,
  onChange,
  type,
  size,
  showGauge,
  showHand,
  onChangeEnd,
  minValue,
  maxValue
}) => {
  const [rotation, setRotation] = useState(0);

  const [localValue, setLocalValue] = useState<number>(value);

  const [gaugeDots, setGaugeDots] = useState<JSX.Element[]>([]);

  const [isSliding, setIsSliding] = useState<boolean>(false);

  useEffect(() => {
    const rotation = localValue * (100 / maxValue) * 2.6 - 130;
    setRotation(rotation);
  }, [localValue]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMouseMove = (event: any) => {
    const knob = document.getElementById(`rotary-knob-${type}`);
    // @ts-ignore
    const knobRect = knob.getBoundingClientRect();
    const centerX = knobRect.left + knobRect.width / 2;
    const centerY = knobRect.top + knobRect.height / 2;

    const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
    const degrees = (angle * 180) / Math.PI;

    let newValue = Math.round((degrees + 180) / 2.6);
    const rotation = localValue * 2.6 - 120;

    if (newValue < minValue) newValue = minValue;
    if (newValue > maxValue && value < Infinity) {
      if (rotation < minValue) {
        newValue = minValue;
      } else {
        newValue = maxValue;
      }
    }
    onChange(newValue);
  };

  useEffect(() => {
    const dotsToFill = (localValue / 2) * 16;

    const dots = Array(16)
      .fill(null)
      .map((_, index) => (
        <svg
          key={`rotary-slider-gauge-dot-${index}`}
          style={{
            transform: `rotate(${
              index * (360 / 20)
            }deg) translate(46px) rotate(-${index * (360 / 20)}deg)`,
            fill: index <= dotsToFill ? `rgba(255, 255, 255, 1)` : "#424242",
            width: "4px",
            height: "4px",
            position: "absolute",
          }}
          viewBox="0 0 6 6"
        >
          <circle
            cx="2.71966"
            cy="3.31009"
            r="2.5"
            transform="rotate(4.46501 2.71966 3.31009)"
          />
        </svg>
      ));
    setGaugeDots(dots);
  }, [localValue]);

  return (
    <div
      id={`rotary-knob-${type}`}
      className="rotary-slider-container"
      style={{
        width: `${40 * size}%`,
        aspectRatio: "1/1",
      }}
    >
      {showGauge ? (
        <RotarySliderGauge value={localValue} onChange={onChange} size={size} minValue={minValue} maxValue={maxValue} />
      ) : (
        <div className={"rotary-slider-doted-gauge"}>{gaugeDots}</div>
      )}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          alignItems: "center",
          borderRadius: "50%",
          justifyContent: "center",
          backgroundColor: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: '300%',
            height: (isSliding ? "900%" : "300%"),
            opacity: "0",
            zIndex: (isSliding ? "7" : "2"),
            cursor: (isSliding ? "" : ""),
          }}
        >
          <DistanceTracker
            localValue={localValue}

            setIsSliding={setIsSliding}
            sliderAcceleration={100}

            onChange={onChange}
            onChangeEnd={onChangeEnd}
            minValue={minValue}
            maxValue={maxValue}
          />
        </div>
      </div>
      <div className="rotary-slider-knob">
        <div
          id={`rotary-slider-hand-${type}`}
          className="rotary-slider-hand"
          style={{
            transform: `rotate(${rotation}deg)`,
            backgroundColor: showHand ? "white" : "none",
            border: showHand ? "1px solid black" : "none",
          }}
        >
          {showHand ? (
            <div></div>
          ) : (
            <div className="rotary-slider-hand-point" />
          )}
          {/*<div className="rotary-slider-hand-before" style={{ transform: `rotate(${-rotation}deg)`, bottom: `${165 + (Math.abs(rotation) * 0.30)}%` }} >*/}
          {/*  {localValue}*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default RotarySlider;
