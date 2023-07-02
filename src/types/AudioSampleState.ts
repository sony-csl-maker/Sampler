export type VariationPlan = {
  e1: number[];
  e2: number[];
};

export type VariationValue = {
  x: number;
  y: number;
};

export type AudioSample = {
  filename: string;
  nickName?: string;
  kickValue: number;
  snareValue: number;
  cymbalValue: number;
  variationValue: VariationValue;
  blob?: any;
  latentVector: number[];
  currentVariationPlan: VariationPlan;
  isOriginal: boolean;
  originalSample: AudioSample | null;
};

export type AudioSamplesFromServerState = {
  currentSampleFetched: AudioSample;
  isFetching: boolean;
  isError: boolean;
  errorMessage: string;
  isSuccess: boolean;
  isLastFetchedSampleAVariation: boolean;
  samplesHistory: AudioSample[];
  lastOriginalSample: AudioSample;
};
