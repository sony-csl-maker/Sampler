import { theme } from "../constants/theme";
import { AudioSample } from "./AudioSampleState";

export const WorkSpacesInitialState: WorkSpacesState = {
  boxes: [
    {
      frenchKey: "a",
      englishKey: "q",
      isSelected: true,
      index: 0,
      sample: null,
      isPlaying: false,
      color: theme.palette.shinyPurple,
      lowOpacityColor: theme.palette.shinyPurpleLowOpacity
    },
    {
      frenchKey: "z",
      englishKey: "w",
      isSelected: false,
      index: 1,
      sample: null,
      isPlaying: false,
      color: theme.palette.darkPink,
      lowOpacityColor: theme.palette.darkPinkLowOpacity
    },
    {
      frenchKey: "e",
      englishKey: "e",
      isSelected: false,
      index: 2,
      sample: null,
      isPlaying: false,
      color: theme.palette.orange,
      lowOpacityColor: theme.palette.orangeLowOpacity
    },
    {
      frenchKey: "r",
      englishKey: "r",
      isSelected: false,
      index: 3,
      sample: null,
      isPlaying: false,
      color: theme.palette.lightPink,
      lowOpacityColor: theme.palette.lightPinkLowOpacity
    },
    {
      frenchKey: "q",
      englishKey: "a",
      isSelected: false,
      index: 4,
      sample: null,
      isPlaying: false,
      color: theme.palette.lightYellow,
      lowOpacityColor: theme.palette.lightYellowLowOpacity
    },
    {
      frenchKey: "s",
      englishKey: "s",
      isSelected: false,
      index: 5,
      sample: null,
      isPlaying: false,
      color: theme.palette.darkYellow,
      lowOpacityColor: theme.palette.darkYellowLowOpacity
    },
    {
      frenchKey: "d",
      englishKey: "d",
      isSelected: false,
      index: 6,
      sample: null,
      isPlaying: false,
      color: theme.palette.navyBlue,
      lowOpacityColor: theme.palette.navyBlueLowOpacity
    },
    {
      frenchKey: "f",
      englishKey: "f",
      isSelected: false,
      index: 7,
      sample: null,
      isPlaying: false,
      color: theme.palette.lightGreen,
      lowOpacityColor: theme.palette.lightGreenLowOpacity
    },
  ],
  keyBoardLanguage: "English"
};

export type WorkSpacesState = {
  boxes: WorkSpaceBoxState[];
  keyBoardLanguage: "French" | "English"
};

export type WorkSpaceBoxState = {
  frenchKey: string;
  englishKey: string;
  index: number;
  isSelected: boolean;
  sample: AudioSample | null;
  isPlaying: boolean;
  color: string;
  lowOpacityColor: string
};
