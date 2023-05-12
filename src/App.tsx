import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Tone from 'tone';
import AudioUploader from './components/AudioUploader';
import Player from './components/Player';

function App() {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | undefined>(undefined);

  return (
    <div className="App">
      <div className="topHeader"> </div>
        {
            audioBuffer ? ( <div style={{ position: 'relative', marginTop: '300px'}}><Player audioBuffer={audioBuffer} onAudioSelected={setAudioBuffer}/> </div>) : (
          <div style={{ position: 'relative', marginTop: '300px'}}>
            <AudioUploader onAudioSelected={setAudioBuffer}/>
          </div>)
        }
      <div className="botHeader"> </div>
    </div>
  );
}

export default App;
