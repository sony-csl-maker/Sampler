import { useState, useEffect, useCallback, useMemo, SetStateAction } from 'react';
import * as Tone from 'tone';
import Sketch from 'react-p5';
import P5Types from 'p5';
import { ADSREnvelopeProps, coordinates } from './AudioProps';

function ADSREnvelopeCurve ({ envelope, setEnvelope, audioBuffer }: ADSREnvelopeProps) {
    // Coordinates of the ADSR curve
    let points: coordinates[] = [
        { x: 0, y: 200 }, // CurveBegin
        { x: 0, y: 140 }, // Attack Control
        { x: 0, y: 100 }, // Attack
        { x: 240, y: 100 }, // Decay-Sustain Control
        { x: 320, y: 100 }, // Decay-Sustain
        { x: 360, y: 60 }, // Release Control
        { x: 400, y: 200 }, // Release
    ];
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

  const resetControlPoint = (firstPoint : coordinates, controlPoint : coordinates, endPoint : coordinates) => {
    const x = (firstPoint.x + endPoint.x) / 2;
    const y = (firstPoint.y + endPoint.y) / 2;
    controlPoint.x = x;
    controlPoint.y = y;
  }

  const drawCurve = (p5: P5Types) => {
    p5.strokeWeight(2);
    p5.beginShape();
    p5.vertex(points[0].x, points[0].y);
    for (let i = 0; i < points.length - 2; i += 2) {
      p5.bezierVertex(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, points[i + 2].x, points[i + 2].y);
    }
    p5.endShape();
  }

  const drawPoints = (p5: P5Types) => {
    for (let i = 0; i < points.length; i++) {
      p5.strokeWeight(5);
      p5.stroke("#197FD2");
      p5.point(points[i].x, points[i].y);
    }
  };

  const setup = (p5: P5Types, canvasParentRef: Element) => {
    const canvas = p5.createCanvas(500, 250).parent(canvasParentRef);
  };

  const draw = (p5: P5Types) => {
    p5.background("#28272c");
    p5.noFill();
    p5.stroke(255);
    drawCurve(p5);
    drawPoints(p5);

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
  };

  const updateEnvelope = (p5: P5Types) => {
    if (envelope === null) return;
    envelope.attack = points[2].x / 100;
    envelope.decay = points[4].x / 100;
    envelope.sustain = 1 - points[4].y / 200;
    envelope.release = points[6].x / 100;
    setEnvelope(envelope);
  };

  const handleMouseDragged = (p5: any) => {

    if (p5.mouseButton === p5.LEFT) {
      for (let i = 1; i < points.length; i++) {
        if (p5.dist(p5.mouseX, p5.mouseY, points[i].x, points[i].y) < 10) {
          points[i].x = p5.mouseX;
          points[i].y = p5.mouseY;
          break;
        }
      }
      updateEnvelope(p5);
    }
    if (envelope === null) return;
  };

    return (
        <div>
            <h1 className="title">Envelope</h1>
            <Sketch setup={setup} draw={draw} mouseDragged={handleMouseDragged}/>
        </div>
    );

};

export default ADSREnvelopeCurve;