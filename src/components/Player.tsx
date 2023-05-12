import {useEffect, useState} from 'react';
import * as Tone from 'tone';

type PlayerProps = {
    onAudioSelected: (audioBuffer: AudioBuffer | undefined) => void,
    audioBuffer: AudioBuffer | undefined
};

function Player({ onAudioSelected, audioBuffer }: PlayerProps) {
    const [player, setPlayer] = useState<Tone.Player | null>(null);
    const [state, setState] = useState<'playing' | 'paused' | 'stopped'>('stopped');
    const [offset, setOffset] = useState<number>(0);
    const [waveform, setWaveform] = useState<Tone.Waveform | null>(null);

    // Set Audio Buffer into Player if Audio Buffer changes
    useEffect(() => { handleAudioSelected();
                       }, [audioBuffer]);
    useEffect(() => {
            if (player === null)
                return;

            const newWaveform = new Tone.Waveform(1024);
            player.connect(newWaveform);
            setWaveform(newWaveform);
    }, [player]);

    // Set Audio Buffer into Player
    const handleAudioSelected = () => {
        if (audioBuffer !== undefined) {
            Tone.start();
            const newPlayer = new Tone.Player(audioBuffer).toDestination();

            if (newPlayer.loaded) {
                setPlayer(newPlayer);
                newPlayer.sync().start();
                setState('stopped');
                onAudioSelected(audioBuffer);
                console.log('loaded');
            }
        } else {
            setPlayer(null);
            setState('stopped');
        }
    };

    const handlePlayButtonClick = () => {
        if (player !== null && state !== 'playing') {
            Tone.Transport.start(undefined, offset);
            setState('playing');
        }
    };

    const handleStopButtonClick = () => {
      if (player !== null) {
        Tone.Transport.stop();
        setOffset(0);
        setState('stopped');
      }
    };

    const handlePauseButtonClick = () => {
        if (player !== null && state === 'playing') {
            Tone.Transport.pause();
            setOffset(Tone.Transport.seconds);
            setState('paused');
        }
    };

    const handleRemoveClick = () => {
        if (player !== null) {
            // Tone.Transport.stop();
            // Tone.Transport.dispose();
            // setOffset(0);
            // setPlayer(null);
            // setState('stopped');
            // onAudioSelected(undefined);
            console.log(Tone.Transport.seconds)
          }
    };

    return (
        <div>
            <button onClick={handlePlayButtonClick}>Play</button>
            <button onClick={handlePauseButtonClick}>Pause</button>
            <button onClick={handleStopButtonClick}>Stop</button>
            <button onClick={handleRemoveClick}>Remove</button>
        </div>
    )
}

export default Player;
