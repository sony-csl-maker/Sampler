import {useEffect, useState} from 'react';
import * as Tone from 'tone';
import styles from './Player.module.css';
import { audioProps, audioPropsSetter } from './AudioProps';

function Player(props : audioProps & audioPropsSetter) {
    const [player, setPlayer] = useState<Tone.Player | null>(null);
    const [state, setState] = useState<'playing' | 'paused' | 'stopped'>('stopped');

    // Set Audio Buffer into Player if Audio Buffer changes
    useEffect(() => { handleAudioSelected();
                       }, [props.audioBuffer]);

    // Set Waveform into Player if Player changes
    useEffect(() => {
            if (player === null)
                return;

            const newWaveform = new Tone.Waveform(1024);
            player.connect(newWaveform);
            props.setWaveform(newWaveform);

            // Set up transport event to update offset in real-time
            // return the event id so that it can be cancelled
            Tone.Transport.scheduleRepeat(() => {
                props.setOffset(Tone.Transport.seconds);
            }, 0.01)
 
            // Set up envelope
            props.setEnvelope(new Tone.AmplitudeEnvelope({
                attack: 0.1,
                decay: 0.2,
                sustain: 0.1,
                release: 0.2,
            }));

            props.setEqualizer(new Tone.EQ3({
                low : 0,
                mid : 0,
                high : 0,
                lowFrequency : 400,
                highFrequency : 2500
            }));

    }, [player]);

    // Set Envelope into Player if Envelope changes
    useEffect(() => {
        if (props.envelope === null || player === null || props.equalizer_three === null)
            return;
        
        player.connect(props.envelope);
        props.envelope.connect(props.equalizer_three);
        props.equalizer_three.toDestination();
    }, [props.envelope]);


    // Onstop event to handle end of audio playback
    if (player !== null) {
        const releaseTime = Tone.Time(props.envelope?.release).toSeconds();
        if (props.offset >= player.buffer.duration - releaseTime) {
            props.envelope?.triggerRelease();
        }
        player.onstop = () => {
            if (props.offset >= player.buffer.duration) {
                Tone.Transport.stop();
                props.setOffset(0);
                setState('stopped');
            }
        }
    }

    // Set Audio Buffer into Player
    const handleAudioSelected = () => {
        if (props.audioBuffer !== undefined) {
            Tone.start();
            const newPlayer = new Tone.Player(props.audioBuffer);

            if (newPlayer.loaded) {
                setPlayer(newPlayer);
                setState('stopped');
                props.setAudioBuffer(props.audioBuffer);
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
            props.setOffset(Tone.Transport.seconds);
            Tone.Transport.start(undefined, props.offset);
            player.start(undefined, props.offset);
            setState('playing');
            // use default parameter for triggerAttackRelease
            if (props.offset === 0 && props.envelope !== null)
                props.envelope.triggerAttack();
        }

    };

    const handleStopButtonClick = () => {
      if (player !== null) {
        Tone.Transport.stop();
        player.stop();
        props.setOffset(0);
        setState('stopped');
      }
    };

    const handlePauseButtonClick = () => {
        if (player !== null && state === 'playing') {
            player.stop();
            props.setOffset(Tone.Transport.seconds);
            Tone.Transport.pause();
            setState('paused');
        }
        console.log(props.equalizer_three?.highFrequency.value);
        console.log(props.equalizer_three?.lowFrequency.value);
        console.log(props.equalizer_three?.high.value);
    };

    const handleRemoveClick = () => {
        if (player !== null) {
            player.stop();
            Tone.Transport.stop();
            player.dispose();
            props.setOffset(0);
            setPlayer(null);
            setState('stopped');
            props.setAudioBuffer(undefined);
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
            <button className={styles.buttonStyle} onClick={handlePlayButtonClick}>Play</button>
            <button className={styles.buttonStyle} onClick={handlePauseButtonClick}>Pause</button>
            <button className={styles.buttonStyle} onClick={handleStopButtonClick}>Stop</button>
            <button className={styles.buttonStyle} onClick={handleRemoveClick}>Remove</button>
            <div className={styles.currentTime}>
                <p>{formatTime(props.offset)}</p>
            </div>
        </div>
    )
}

export default Player;
