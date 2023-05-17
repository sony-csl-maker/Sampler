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

        // Set up transport event to update offset in real-time
        // return the event id so that it can be cancelled
        Tone.Transport.scheduleRepeat(() => {
            setOffset(Tone.Transport.seconds);
        }, 0.1)
    }, [player]);

    // Onstop event to handle end of audio playback
    if (player !== null) {
        player.onstop = () => {
            if (offset >= player.buffer.duration) {
                Tone.Transport.stop();
                setOffset(0);
                setState('stopped');
            }
        }
    }

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
        if (player === null)
            return;
        if (state !== 'playing') {
            setOffset(Tone.Transport.seconds);
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

    // Convert seconds to minutes:seconds format
    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) {
            return '0:00.0';
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const remainingMilliseconds = Math.floor((seconds % 1) * 10);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}.${remainingMilliseconds}`;
    }

    return (
        <div>
            <button onClick={handlePlayButtonClick}>Play</button>
            <button onClick={handlePauseButtonClick}>Pause</button>
            <button onClick={handleStopButtonClick}>Stop</button>
            <button onClick={handleRemoveClick}>Remove</button>
            <p>{formatTime(offset)}</p>
        </div>
    )
}

export default Player;
