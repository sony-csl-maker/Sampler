import {FC, useEffect, useRef, useState} from "react";
import "./RotarySliderGauge.css";

import CircularSlider from "react-circular-slider-svg";

interface RotarySliderGaugeProps {
  value: number;
  onChange: (value: number) => void;

  size: number;
  minValue: number;
  maxValue: number;
}

const RotarySliderGauge: FC<RotarySliderGaugeProps> = ({ value, onChange, size, minValue, maxValue }) => {

  const handleChange = (value: number) => {
    onChange(value);
  };

  return (
    <div className="rotary-slider-gauge" >
      <CircularSlider
        size={138 * size}
        minValue={minValue}
        maxValue={maxValue}
        startAngle={40}
        endAngle={320}
        angleType={{
          direction: "cw",
          axis: "-y"
        }}
        handle1={{
          value: value,
          // onChange: (v) => handleChange(Math.floor(v))
        }}
        arcColor="#ffffff"
        arcBackgroundColor="#424242"
      />
    </div>
  );
};

export default RotarySliderGauge;
