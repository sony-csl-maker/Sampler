import { useState, useEffect, useCallback, useMemo, SetStateAction } from 'react';
import * as Tone from 'tone';
import Sketch from 'react-p5';
import RotarySliderContainer from "./RotarySliderContainer/RotarySliderContainer";
import { KSCSliderState, KSCSliderStateInitialValue } from "../types/KSCSliderState";
import RotarySlider from './RotarySliderContainer/RotarySlider';
import "./Component.css";
import { ADSREnvelopeProps } from './AudioProps';

function ADSREnvelope({ envelope, setEnvelope, audioBuffer }: ADSREnvelopeProps) {

  const [attackTime, setAttackTime] = useState(0);
  const [decayTime, setDecayTime] = useState(0.2);
  const [sustainLevel, setSustainLevel] = useState(0.5);
  const [releaseTime, setReleaseTime] = useState(0.1);

  const handleAttackChange = (value: number) => {
    if (envelope === null) return;
    setAttackTime(value);
    envelope.attack = value;
  };

  const handleDecayChange = (value: number) => {
    if (envelope === null) return;
    setDecayTime(value);
    envelope.decay = value;
  };

  const handleSustainChange = (value: number) => {
    if (envelope === null) return;
    setSustainLevel(value);
    envelope.sustain = value;
  };

  const handleReleaseChange = (value: number) => {
    if (envelope === null) return;
    setReleaseTime(value);
    envelope.release = value;
  };

  const setKSCSliderState = (value: SetStateAction<KSCSliderState>) => {
  };

  return (
    <div>
      <div className="knob">

      <div className="individual-knob">
      <p className='element-name'>Attack</p>
      <p className='element-name'>{attackTime.toFixed(2)} ms</p>
          <RotarySlider
            value={attackTime}
            onChange={handleAttackChange}
            size={1}
            type="Kick"
            showGauge={true}
            showHand={true}
            onChangeEnd={handleAttackChange}
            minValue={0}
            maxValue={audioBuffer.duration}
          />
        </div>

        <div className="individual-knob">
        <p className='element-name'>Decay</p>
        <p className='element-name'>{decayTime.toFixed(2)} ms</p>
          <RotarySlider
            value={decayTime}
            onChange={handleDecayChange}
            size={1}
            type="Kick"
            showGauge={true}
            showHand={true}
            onChangeEnd={handleDecayChange}
            minValue={0}
            maxValue={audioBuffer.duration}
          />
      </div>

      <div className="individual-knob">
      <p className='element-name'>Sustain</p>
          <p className='element-name'>{sustainLevel.toFixed(2)}</p>
          <RotarySlider
            value={sustainLevel}
            onChange={handleSustainChange}
            size={1}
            type="Kick"
            showGauge={true}
            showHand={true}
            onChangeEnd={handleSustainChange}
            minValue={0}
            maxValue={1}
          />
        </div>

      <div className="individual-knob">
      <p className='element-name'>Release</p>
          <p className='element-name'>{releaseTime.toFixed(2)} ms</p>
          <RotarySlider
            value={releaseTime}
            onChange={handleReleaseChange}
            size={1}
            type="Kick"
            showGauge={true}
            showHand={true}
            onChangeEnd={handleReleaseChange}
            minValue={0}
            maxValue={1}
          />
          </div>
        </div>
    </div>
  );
}

export default ADSREnvelope;
