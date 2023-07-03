import { useState, useEffect, useCallback, useMemo, SetStateAction } from 'react';
import * as Tone from 'tone';
import Sketch from 'react-p5';
import RotarySliderContainer from "./RotarySliderContainer/RotarySliderContainer";
import { KSCSliderState, KSCSliderStateInitialValue } from "../types/KSCSliderState";
import RotarySlider from './RotarySliderContainer/RotarySlider';
import "./Component.css";

interface ADSREnvelopeProps {
  envelope: Tone.AmplitudeEnvelope | null;
  setEnvelope: React.Dispatch<React.SetStateAction<Tone.AmplitudeEnvelope | null>>;
  audioBuffer: AudioBuffer;
}

interface coordinates {
  x: number;
  y: number;
}

function ADSREnvelope({ envelope, setEnvelope, audioBuffer }: ADSREnvelopeProps) {

  useEffect(() => {
    // define a custom handler function
    // for the contextmenu event
    const handleContextMenu = (e: { preventDefault: () => void; }) => {
      // prevent the right-click menu from appearing
      e.preventDefault()
    }

    // attach the event listener to 
    // the document object
    document.addEventListener("contextmenu", handleContextMenu)
  }, []);

  const [attackTime, setAttackTime] = useState(0.1);
  const [decayTime, setDecayTime] = useState(0.1);
  const [sustainLevel, setSustainLevel] = useState(0.5);
  const [releaseTime, setReleaseTime] = useState(0.1);
  const [x, setX] = useState(85);
  const [y, setY] = useState(85);
  const [decay, setDecay] = useState(120);
  const [sustain, setSustain] = useState(120);

  // Coordinates of the curve
  let points: coordinates[] = [
    { x: 100, y: 200 }, // CurveBegin
    { x: 120, y: 140 }, // Attack Control
    { x: 200, y: 60 }, // Attack
    { x: 240, y: 100 }, // Decay-Sustain Control
    { x: 320, y: 100 }, // Decay-Sustain
    { x: 360, y: 60 }, // Release Control
    { x: 400, y: 200 }, // Release
  ]

  const resetControlPoint = (firstPoint : coordinates, controlPoint : coordinates, endPoint : coordinates) => {
    const x = (firstPoint.x + endPoint.x) / 2;
    const y = (firstPoint.y + endPoint.y) / 2;
    controlPoint.x = x;
    controlPoint.y = y;
  }

  const drawCurve = (p5: any, points: coordinates[]) => {
    p5.strokeWeight(2);
    p5.beginShape();
    p5.vertex(points[0].x, points[0].y);
    for (let i = 0; i < points.length - 2; i += 2) {
      p5.bezierVertex(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, points[i + 2].x, points[i + 2].y);
    }
    p5.endShape();
  }

  const drawPoints = (p5: any, points: coordinates[]) => {
    for (let i = 0; i < points.length; i++) {
      p5.strokeWeight(5);
      p5.stroke("#197FD2");
      p5.point(points[i].x, points[i].y);
    }
  };

  const setup = (p5: any, canvasParentRef: Element) => {
    p5.createCanvas(500, 250).parent(canvasParentRef);
  };

  const draw = (p5: any) => {
    p5.background("#28272c");
    p5.noFill();
    p5.stroke(255);
    drawCurve(p5, points);
    drawPoints(p5, points);

    // Move control points with left click
    if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
      for (let i = 1; i < points.length; i++) {
        if (p5.dist(p5.mouseX, p5.mouseY, points[i].x, points[i].y) < 10) {
          points[i].x = p5.mouseX;
          points[i].y = p5.mouseY;
          break;
        }
      }
    }

    // Reset control points with right click
    if (p5.mouseIsPressed && p5.mouseButton === p5.RIGHT
        && p5.mouseX > 0 && p5.mouseX < p5.width && p5.mouseY > 0 && p5.mouseY < p5.height) {
      for (let i = 1; i < points.length; i += 2) {
        if (p5.dist(p5.mouseX, p5.mouseY, points[i].x, points[i].y) < 10) {
          if (i % 2 !== 0) {
            resetControlPoint(points[i - 1], points[i], points[i + 1]);
            break;
          }
        }
      }
    };

    // Prevent control points from going out of bounds
    for (let i = 1; i < points.length; i++) {
      if (i === points.length - 1)
        break;
      if (points[i].x > points[i + 1].x) {
        points[i].x = points[i + 1].x;
      }
      if (points[i].x < points[i - 1].x) {
        points[i].x = points[i - 1].x;
      }
    }
    if (envelope === null) return;

    // envelope.attack = 10 * points[2].x / 300; 
    // envelope.decay = 10 * points[4].x / 300;
    // envelope.sustain = 1 - points[4].y / 200;
    // envelope.release = 10 * points[6].x / 300;
  };

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
      <h1 className="title">Envelope</h1>
      <Sketch setup={setup} draw={draw}/>

      <div className="knob">

      <div className="individual-knob">
      <p className='element-name'>Attack</p>
          <RotarySlider
            value={attackTime}
            onChange={handleAttackChange}
            size={1}
            type="Kick"
            showGauge={true}
            showHand={true}
            onChangeEnd={handleAttackChange}
            maxValue={audioBuffer.duration}
          />
        </div>

      <div className="individual-knob">
        <p className='element-name'>Decay</p>
          <RotarySlider
            value={decayTime}
            onChange={handleDecayChange}
            size={1}
            type="Kick"
            showGauge={true}
            showHand={true}
            onChangeEnd={handleDecayChange}
            maxValue={audioBuffer.duration}
          />
      </div>

      <div className="individual-knob">
      <p className='element-name'>Sustain</p>
          <RotarySlider
            value={sustainLevel}
            onChange={handleSustainChange}
            size={1}
            type="Kick"
            showGauge={true}
            showHand={true}
            onChangeEnd={handleSustainChange}
            maxValue={1}
          />
        </div>

      <div className="individual-knob">
      <p className='element-name'>Release</p>
          <RotarySlider
            value={releaseTime}
            onChange={handleReleaseChange}
            size={1}
            type="Kick"
            showGauge={true}
            showHand={true}
            onChangeEnd={handleReleaseChange}
            maxValue={1}
          />
          </div>
        </div>
    </div>
  );
}

export default ADSREnvelope;
