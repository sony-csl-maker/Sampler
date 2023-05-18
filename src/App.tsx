import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Tone from 'tone';
import AudioUploader from './components/AudioUploader';
import Player from './components/Player';
import { audioProps, audioPropsSetter } from './components/AudioProps';

function App() {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | undefined>(undefined);
  const [offset, setOffset] = useState<number>(0);
  const [waveform, setWaveform] = useState<Tone.Waveform | null>(null);

  return (
    <div className="App">
      <div className="topHeader"> </div>
        {
            audioBuffer ? ( <div className='audioPlayer'>
              <Player audioBuffer={audioBuffer} offset={offset} waveform={waveform}
                      setOffset={setOffset} setAudioBuffer={setAudioBuffer} setWaveform={setWaveform}
                      />
                           </div>
                          ) : ( <div className='audioUploader'>
              <AudioUploader onAudioSelected={setAudioBuffer}/>
                          </div>
                          )
        }
      <div className="botHeader"> </div>
    </div>
  );
}

export default App;
