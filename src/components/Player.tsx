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
    
    // Set Waveform into Player if Player changes
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
                setState('stopped');
                onAudioSelected(audioBuffer);
            }
        } else {
            setPlayer(null);
            setState('stopped');
        }
    };

    // Play, Pause, Stop, Remove audio
    const handlePlayButtonClick = () => {
        if (player !== null && state !== 'playing') {
            Tone.Transport.start(undefined, offset);
            player.start(undefined, offset);
            setState('playing');
        }
    };

    const handleStopButtonClick = () => {
      if (player !== null) {
        Tone.Transport.stop();
        player.stop();
        setOffset(0);
        setState('stopped');
      }
    };

    const handlePauseButtonClick = () => {
        if (player !== null && state === 'playing') {
            player.stop();
            setOffset(Tone.Transport.seconds);
            Tone.Transport.pause();
            setState('paused');
        }
    };

    const handleRemoveClick = () => {
        if (player !== null) {
            player.stop();
            Tone.Transport.stop();
            player.dispose();
            setOffset(0);
            setPlayer(null);
            setState('stopped');
            onAudioSelected(undefined);
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
