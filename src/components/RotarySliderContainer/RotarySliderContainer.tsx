import { FC, useMemo } from "react";
import "./RotarySliderContainer.css";
import SimpleSVGComponent from "../UI/SimpleSVGComponent";
import kickSVG from "../../assets/kick.svg";
import snareSVG from "../../assets/snare.svg";
import cymbalSVG from "../../assets/crash.svg";
import { theme } from "../../constants/theme";
import RotarySlider from "./RotarySlider";
import { KSCSliderState } from "../../types/KSCSliderState";
import { log } from "console";

interface RotarySliderContainerProps {
  onChange: (
    value: number,
    type: "Kick" | "Snare" | "Cymbal",
    setTheRestToZero: boolean
  ) => void;
  type: "Kick" | "Snare" | "Cymbal";
  value: number;
  setKSCSliderState: (value: React.SetStateAction<KSCSliderState>) => void;
}

const RotarySliderContainer: FC<RotarySliderContainerProps> = ({
  onChange,
  type,
  value,
  setKSCSliderState,
}) => {
  const currentIcon = useMemo(() => {
    switch (type) {
      case "Kick":
        return kickSVG;
      case "Snare":
        return snareSVG;
      case "Cymbal":
        return cymbalSVG;
    }
  }, [type]);

  const currentColor = useMemo(() => {
    switch (type) {
      case "Kick":
        return theme.palette.green;
      case "Snare":
        return theme.palette.purple;
      case "Cymbal":
        return theme.palette.red;
    }
  }, [type]);
  const onChangeSlider = (value: number) => {
    switch (type) {
      case "Kick":
        setKSCSliderState((data: any) => {
          return { ...data, kickValue: value };
        });
        break;
      case "Snare":
        setKSCSliderState((data: any) => {
          return { ...data, snareValue: value };
        });
        break;
      case "Cymbal":
        setKSCSliderState((data: any) => {
          return { ...data, cymbalValue: value };
        });
        break;
    }
  };
  const onClickOnSliderType = () => {
    onChange(2, type, true);
    switch (type) {
      case "Kick":
        setKSCSliderState((data: any) => {
          return { ...data, kickValue: 2, snareValue: 0, cymbalValue: 0 };
        });
        break;
      case "Snare":
        setKSCSliderState((data: any) => {
          return { ...data, kickValue: 0, snareValue: 2, cymbalValue: 0 };
        });
        break;
      case "Cymbal":
        setKSCSliderState((data: any) => {
          return { ...data, kickValue: 0, snareValue: 0, cymbalValue: 2 };
        });
        break;
    }
  };
  const onChangeSliderEnd = (newValue: number) => {
    onChange(newValue, type, false);
  };
  return (
    <div className="rotary-slider-container-border-container">
      <div className="rotary-slider-container-main-container">
        <div className="rotary-slider-container-top-part">
          <div
            className="rotary-slider-container-type-container"
            style={{ backgroundColor: currentColor }}
            onClick={onClickOnSliderType}
          >
            <SimpleSVGComponent
              width="1.8rem"
              height="240%"
              icon={currentIcon}
              alt="drum-icon"
            />
            {type}
          </div>
        </div>
        <div className="rotary-slider-container-bottom-part">
          <RotarySlider
            value={value}
            onChange={onChangeSlider}
            onChangeEnd={onChangeSliderEnd}
            type={type}
            size={1}
            showGauge={true}
            showHand={true}
            maxValue={2}
          />
        </div>
      </div>
    </div>
  );
};

export default RotarySliderContainer;
