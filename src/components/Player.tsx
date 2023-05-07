import {useEffect, useState} from 'react';
import * as Tone from 'tone';

type PlayerProps = {
    onAudioSelected: (audioBuffer: AudioBuffer | undefined) => void,
    audioBuffer: AudioBuffer | undefined
};

function Player({ onAudioSelected, audioBuffer }: PlayerProps) {
    const [player, setPlayer] = useState<Tone.Player | null>(null);
    const [state, setState] = useState<'playing' | 'paused' | 'stopped'>('stopped');
    const [currentTime, setCurrentTime] = useState(0);
    const [startPosition, setStartPosition] = useState(0);

    // Set Audio Buffer into Player if Audio Buffer changes
    useEffect(() => { handleAudioSelected() }, [audioBuffer]);

    // Set Audio Buffer into Player
    const handleAudioSelected = () => {
        if (audioBuffer !== undefined) {
            Tone.start();
            const newPlayer = new Tone.Player(audioBuffer).toDestination();
            setPlayer(newPlayer);
            setState('stopped');
            setCurrentTime(0);
        } else {
            setPlayer(null);
            setState('stopped');
            setCurrentTime(0);
        }
    };

    const handlePlayButtonClick = () => {
        if (player !== null) {
            player.start(undefined, currentTime);
            setState('playing');
        }
    };

    const handleStopButtonClick = () => {
      if (player !== null) {
        player.stop();
        setState('stopped');
        setCurrentTime(0);
      }
    };

    const handlePauseButtonClick = () => {
        if (player !== null && state === 'playing') {
            setCurrentTime(player.toSeconds());
            console.log(currentTime);
            player.stop();
            setState('paused');
        }
    };

    const handleRemoveClick = () => {
        onAudioSelected(undefined);
        if (player !== null) {
            player.stop();
            player.dispose();
            setPlayer(null);
            setState('stopped');
            setCurrentTime(0);
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
