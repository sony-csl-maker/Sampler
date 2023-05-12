import * as Tone from 'tone';

type audioProps = {
    audioBuffer: AudioBuffer | undefined,
    waveform: Tone.Waveform | undefined,
    offset : number | undefined
  };

type audioPropsSetter = {
    setAudioBuffer: (audioBuffer: AudioBuffer | undefined) => void,
    setWaveform: (waveform: Tone.Waveform | undefined) => void,
    setOffset: (offset: number | undefined) => void
};

export type { audioProps, audioPropsSetter };
