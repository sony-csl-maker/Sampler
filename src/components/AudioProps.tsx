import * as Tone from 'tone';

interface audioProps {
    audioBuffer: AudioBuffer;
    offset : number;
    waveform: Tone.Waveform | null;
    envelope: Tone.AmplitudeEnvelope | null;
    equalizer_three: Tone.EQ3 | null;
};

interface audioPropsSetter {
    setOffset: React.Dispatch<React.SetStateAction<number>>;
    setAudioBuffer: React.Dispatch<React.SetStateAction<AudioBuffer | undefined>>;
    setWaveform: React.Dispatch<React.SetStateAction<Tone.Waveform | null>>;
    setEnvelope: React.Dispatch<React.SetStateAction<Tone.AmplitudeEnvelope | null>>;
    setEqualizer: React.Dispatch<React.SetStateAction<Tone.EQ3 | null>>;
};

export type { audioProps, audioPropsSetter };
