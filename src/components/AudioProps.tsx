import * as Tone from 'tone';

interface audioProps {
    audioBuffer: AudioBuffer;
    offset : number;
    waveform: Tone.Waveform | null;
    envelope: Tone.AmplitudeEnvelope | null;
};

interface audioPropsSetter {
    setOffset: React.Dispatch<React.SetStateAction<number>>;
    setAudioBuffer: React.Dispatch<React.SetStateAction<AudioBuffer | undefined>>;
    setWaveform: React.Dispatch<React.SetStateAction<Tone.Waveform | null>>;
    setEnvelope: React.Dispatch<React.SetStateAction<Tone.AmplitudeEnvelope | null>>;
};

export type { audioProps, audioPropsSetter };
