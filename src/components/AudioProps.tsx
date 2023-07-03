import * as Tone from 'tone';

interface audioProps {
    player: Tone.Player | null;
    audioBuffer: AudioBuffer;
    offset : number;
    waveform: Tone.Waveform | null;
    pitchShift : Tone.PitchShift | null;
    envelope: Tone.AmplitudeEnvelope | null;
    equalizer_three: Tone.EQ3 | null;
    startTime : number;
    endTime : number;
};

interface audioPropsSetter {
    setPlayer: React.Dispatch<React.SetStateAction<Tone.Player | null>>;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
    setAudioBuffer: React.Dispatch<React.SetStateAction<AudioBuffer | undefined>>;
    setWaveform: React.Dispatch<React.SetStateAction<Tone.Waveform | null>>;
    setPitchShift: React.Dispatch<React.SetStateAction<Tone.PitchShift | null>>;
    setEnvelope: React.Dispatch<React.SetStateAction<Tone.AmplitudeEnvelope | null>>;
    setEqualizer: React.Dispatch<React.SetStateAction<Tone.EQ3 | null>>;
    setStartTime: React.Dispatch<React.SetStateAction<number>>;
    setEndTime: React.Dispatch<React.SetStateAction<number>>;
};

export type { audioProps, audioPropsSetter };
