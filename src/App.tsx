import { useState } from 'react';
import './App.css';
import * as Tone from 'tone';
import AudioUploader from './components/AudioUploader';
import Player from './components/Player';
import Waveform from './components/Waveform';
import ADSREnvelope from "./components/Envelope"
import EqualizerThree from './components/EqualizerThree';

function App() {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | undefined>(undefined);
  const [offset, setOffset] = useState<number>(0);
  const [waveform, setWaveform] = useState<Tone.Waveform | null>(null);
  const [envelope, setEnvelope] = useState<Tone.AmplitudeEnvelope | null>(null);
  const [equalizer_three, setEqualizer] = useState<Tone.EQ3 | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(audioBuffer?.duration || 0);

  return (
    <div className="App">
      <div className="topHeader"> </div>
        {
            audioBuffer ? ( <div className='audioPlayer'>
              <Player audioBuffer={audioBuffer} offset={offset} waveform={waveform}
                      setOffset={setOffset} setAudioBuffer={setAudioBuffer} setWaveform={setWaveform}
                      envelope={envelope} setEnvelope={setEnvelope}
                      equalizer_three={equalizer_three} setEqualizer={setEqualizer}
                      startTime={startTime} setStartTime={setStartTime}
                      endTime={endTime} setEndTime={setEndTime}
              />
              <Waveform waveform={waveform} setWaveform={setWaveform} 
                        audioBuffer={audioBuffer} setAudioBuffer={setAudioBuffer}
                        offset={offset} setOffset={setOffset}
                        envelope={envelope} setEnvelope={setEnvelope}
                        equalizer_three={equalizer_three} setEqualizer={setEqualizer}
                        startTime={startTime} setStartTime={setStartTime}
                        endTime={endTime} setEndTime={setEndTime}
                        />
              <ADSREnvelope envelope={envelope} setEnvelope={setEnvelope}
                            audioBuffer={audioBuffer}/>
              <EqualizerThree equalizer_three={equalizer_three} setEqualizer={setEqualizer}/>
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
