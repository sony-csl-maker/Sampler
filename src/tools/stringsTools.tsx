export const cutWavEndOfString = (song: string) => {
  const array = song.split(".");
  return array[0];
};

export const derivedRegex = new RegExp("_[0-9]+");

export const normalizeSampleName = (
  filename: string,
  toUpperCase: boolean,
  originalFile: boolean
) => {
  const noWav = cutWavEndOfString(filename);
  const splitted = noWav.replace("_", " ");
  const noDerived = originalFile
    ? splitted.replace(derivedRegex, "")
    : splitted.replace(derivedRegex, "*");
  return toUpperCase ? noDerived.toUpperCase() : noDerived;
};

export const addStarAtTheEndOfString = (filename: string) => {
  return filename.includes("*") ? filename : filename + "*";
};
