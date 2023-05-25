import {useEffect, useRef, useState} from 'react';
import * as Tone from 'tone';

interface ADSREnvelopeProps {
  envelope: Tone.AmplitudeEnvelope | null;
  setEnvelope: React.Dispatch<React.SetStateAction<Tone.AmplitudeEnvelope | null>>;
}

function ADSREnvelope({ envelope, setEnvelope }: ADSREnvelopeProps) {
  const [attackTime, setAttackTime] = useState(0.1);
  const [decayTime, setDecayTime] = useState(0.1);
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

  return (
    <div>
      <div>
        <label>Attack Time:</label>
        <input type="range" min="0" max="1" step="0.01" value={attackTime} onChange={(e) => handleAttackChange(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>Decay Time:</label>
        <input type="range" min="0" max="1" step="0.01" value={decayTime} onChange={(e) => handleDecayChange(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>Sustain Level:</label>
        <input type="range" min="0" max="1" step="0.01" value={sustainLevel} onChange={(e) => handleSustainChange(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>Release Time:</label>
        <input type="range" min="0" max="1" step="0.01" value={releaseTime} onChange={(e) => handleReleaseChange(parseFloat(e.target.value))} />
      </div>
    </div>
  );
}

export default ADSREnvelope;
