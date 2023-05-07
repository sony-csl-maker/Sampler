import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Tone from 'tone';
import AudioUploader from './components/AudioUploader';
import Player from './components/Player';

function App() {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | undefined>(undefined);
  const getAudioBufferFromPlayer = (audioBuffer: AudioBuffer | undefined) => {
    setAudioBuffer(audioBuffer);
  }

  return (
    <div className="App">
      {audioBuffer ? (
        <Player audioBuffer={audioBuffer} onAudioSelected={getAudioBufferFromPlayer} />
        ) : (
        <AudioUploader onAudioSelected={setAudioBuffer}/>)
      }
    </div>
  );
}

export default App;
