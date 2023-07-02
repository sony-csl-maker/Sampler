import { AudioSample } from "./AudioSampleState";

export const SamplePackInitialState: SamplePackState = {
  samples: [],
};

export type SamplePackState = {
  samples: AudioSample[];
};
