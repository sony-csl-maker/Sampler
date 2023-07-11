import {useEffect, useState} from 'react';
import * as Tone from 'tone';
import styles from './Player.module.css';
import { audioProps, audioPropsSetter } from './AudioProps';

function Player(props : audioProps & audioPropsSetter) {
    const [state, setState] = useState<'playing' | 'paused' | 'stopped'>('stopped');
    const { audioBuffer, offset, envelope, equalizer_three, startTime, endTime,
            pitchShift, setPitchShift, player, setPlayer,
            setAudioBuffer, setOffset, setEnvelope, setEqualizer, setStartTime, setEndTime } = props;

    // Set Audio Buffer into Player if Audio Buffer changes
    useEffect(() => {
        if (audioBuffer !== undefined) {
            Tone.start();
            const newPlayer = new Tone.Player(audioBuffer);

            if (newPlayer.loaded) {
                setPlayer(newPlayer);
                setState('stopped');
                setAudioBuffer(audioBuffer);
            }
        } else {
            setPlayer(null);
            setState('stopped');
        }
    }, [audioBuffer, setAudioBuffer]);

    useEffect(() => {
            if (player === null)
                return;

            // Set up transport event to update offset in real-time
            // return the event id so that it can be cancelled
            Tone.Transport.scheduleRepeat(() => {
                setOffset(Tone.Transport.seconds);
            }, 0.01)

            // Set end time to the duration of the audio (default)
            setOffset(startTime)
            setEndTime(player.buffer.duration);
            // Set up envelope
            setEnvelope(new Tone.AmplitudeEnvelope({
                attack: 0,
                decay: 0.2,
                sustain: 0.1,
                release: 0.2,
            }));

            // Set up EQ3
            setEqualizer(new Tone.EQ3({
                low : 0,
                mid : 0,
                high : 0,
                lowFrequency : 400,
                highFrequency : 2500
            }));

            setPitchShift(new Tone.PitchShift({
                pitch: 0,
            }));

    }, [player, setOffset, setEnvelope, setEqualizer]);

    // Set Envelope and EQ3 to Player
    useEffect(() => {
        if (envelope === null || player === null || equalizer_three === null || pitchShift === null)
            return;
        
        player.connect(envelope);
        envelope.connect(equalizer_three);
        equalizer_three.connect(pitchShift);
        pitchShift.toDestination();
    }, [envelope, player, equalizer_three]);

    // Onstop event to handle end of audio playback
    useEffect(() => {
        const releaseTime = Tone.Time(envelope?.release).toSeconds();
        if (offset >= endTime - releaseTime) {
            envelope?.triggerRelease();
        }

        if (offset >= endTime) {
            Tone.Transport.stop();
            setOffset(startTime);
            setState('stopped');
        }
    }, [offset, endTime, envelope?.release, startTime]);

    // Play, Pause, Stop, Remove audio
    const handlePlayButtonClick = () => {
        if (player === null)
            return;
        if (state !== 'playing') {
            Tone.Transport.start(undefined, offset);
            player.start(undefined, offset);
            setState('playing');
            // triggerAttack() only works if the playback is started from the beginning
            if (offset === 0 && envelope !== null)
                envelope.triggerAttack();
        }
    };

    const handleStopButtonClick = () => {
      if (player !== null) {
        Tone.Transport.stop();
        player.stop();
        setOffset(startTime);
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
            setAudioBuffer(undefined);
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
                <p>{formatTime(offset)}</p>
            </div>
        </div>
    )
}

export default Player;
