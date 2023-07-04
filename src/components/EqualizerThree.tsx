import {useEffect, useState} from 'react';
import * as Tone from 'tone';
import RotarySlider from './RotarySliderContainer/RotarySlider';
import "./Component.css";

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

    const handleLowChange = (nb: number) => {
        setLow(nb);
    };

    const handleMidChange = (nb: number) => {
        setMid(nb);
    };

    const handleHighChange = (nb: number) => {
        setHigh(nb);
    };

    const handleLowFrequencyChange = (nb: number) => {
        setLowFrequency(nb);
    };

    const handleHighFrequencyChange = (nb: number) => {
        setHighFrequency(nb);
    };

    return (
    <div>
        <h1 className='title'>Equalizer</h1>
        <div className="knob">
        <div className="individual-knob">
            <p className='element-name'>Low</p>
            {/* Display low value */}
            <p className='element-name'>{low.toFixed(2)}</p>
                <RotarySlider
                    value={low}
                    onChange={handleLowChange}
                    size={1}
                    type="Kick"
                    showGauge={true}
                    showHand={true}
                    onChangeEnd={handleLowChange}
                    minValue={-12}
                    maxValue={12}
                />
        </div>
        <div className="individual-knob">
            <p className='element-name'>Mid</p>
            {/* Display mid value */}
            <p className='element-name'>{mid.toFixed(2)}</p>
                <RotarySlider
                    value={mid}
                    onChange={handleMidChange}
                    size={1}
                    type="Kick"
                    showGauge={true}
                    showHand={true}
                    onChangeEnd={handleMidChange}
                    minValue={0}
                    maxValue={12}
                />
        </div>
        <div className="individual-knob">
            <p className='element-name'>High</p>
            {/* Display high value */}
            <p className='element-name'>{high.toFixed(2)}</p>
                <RotarySlider
                    value={high}
                    onChange={handleHighChange}
                    size={1}
                    type="Kick"
                    showGauge={true}
                    showHand={true}
                    onChangeEnd={handleHighChange}
                    minValue={-12}
                    maxValue={12}
                />
        </div>
        <div className="individual-knob">
            <p className='element-name'>Low Frequency</p>
            {/* Display high value */}
            <p className='element-name'>{lowFrequency.toFixed(2)}</p>
                <RotarySlider
                    value={lowFrequency}
                    onChange={handleLowFrequencyChange}
                    size={1}
                    type="Kick"
                    showGauge={true}
                    showHand={true}
                    onChangeEnd={handleLowFrequencyChange}
                    minValue={20}
                    maxValue={1000}
                />
        </div>
        <div className="individual-knob">
            <p className='element-name'>High Frequency</p>
            {/* Display high value */}
            <p className='element-name'>{highFrequency.toFixed(2)}</p>
                <RotarySlider
                    value={highFrequency}
                    onChange={handleHighFrequencyChange}
                    size={1}
                    type="Kick"
                    showGauge={true}
                    showHand={true}
                    onChangeEnd={handleHighFrequencyChange}
                    minValue={1000}
                    maxValue={5000}
                />
        </div>
        </div>
    </div>
    );
};

export default EqualizerThree;