import {useEffect, useState} from 'react';
import * as Tone from 'tone';

interface EqualizerThreeProps {
    equalizer_three: Tone.EQ3 | null;
    setEqualizer: React.Dispatch<React.SetStateAction<Tone.EQ3 | null>>;
}

function EqualizerThree({ equalizer_three, setEqualizer }: EqualizerThreeProps) {
    const [low, setLow] = useState(0); // State for low frequency gain
    const [mid, setMid] = useState(0); // State for mid frequency gain
    const [high, setHigh] = useState(0); // State for high frequency gain
    const [lowFrequency, setLowFrequency] = useState(400); // State for low frequency
    const [highFrequency, setHighFrequency] = useState(2500); // State for high frequency

    useEffect(() => {        
        if (equalizer_three === null)
            return;
        // Update EQ3 parameters when the slider values change
        equalizer_three.low.value = low;
        equalizer_three.mid.value = mid;
        equalizer_three.high.value = high;
        equalizer_three.lowFrequency.value = lowFrequency;
        equalizer_three.highFrequency.value = highFrequency;
    }, [low, mid, high, lowFrequency, highFrequency, equalizer_three]);

    return (
    <div>
        <div>
            <label>Low</label>
            <input
            type="range"
            min="-12"
            max="12"
            value={low}
            onChange={(e) => setLow(Number(e.target.value))}
            />
        </div>
        <div>
            <label>Mid</label>
            <input
            type="range"
            min="-12"
            max="12"
            value={mid}
            onChange={(e) => setMid(Number(e.target.value))}
            />
        </div>
        <div>
            <label>High</label>
            <input
            type="range"
            min="-12"
            max="12"
            value={high}
            onChange={(e) => setHigh(Number(e.target.value))}
            />
        </div>
        <div>
            <label>Low Frequency</label>
            <input
            type="range"
            min="0"
            max="1000"
            value={lowFrequency}
            onChange={(e) => setLowFrequency(Number(e.target.value))}
            />
        <div>
            <label>High Frequency</label>
            <input
            type="range"
            min="1000"
            max="5000"
            value={highFrequency}
            onChange={(e) => setHighFrequency(Number(e.target.value))}
            />
        </div>
        </div>
    </div>
    );
};

export default EqualizerThree;