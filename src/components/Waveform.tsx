import {useEffect, useState} from 'react';
import * as Tone from 'tone';

type WaveformProps = {
    audioBuffer: AudioBuffer | undefined
    offset: number
};

function Waveform({ audioBuffer, offset }: WaveformProps) {
    const [waveform, setWaveform] = useState<Tone.Waveform | null>(null);
    return (
        <div className="waveform">
        </div>
    );
}
