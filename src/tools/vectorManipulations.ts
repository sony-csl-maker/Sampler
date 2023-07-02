import { VariationPlan } from "../types/AudioSampleState";

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function sumTwoArray(arrayOne: number[], arrayTwo: number[]) {
  var sum = arrayOne.map(function (num, idx) {
    return num + arrayTwo[idx];
  });
  return sum;
}

function substractTwoArray(arrayOne: number[], arrayTwo: number[]) {
  var sum = arrayOne.map(function (num, idx) {
    return num - arrayTwo[idx];
  });
  return sum;
}

export const getNewPairOfVariationPlan = () => {
  let e1 = getRandomInt(127);
  let e2 = getRandomInt(127);
  while (e1 === e2) {
    e2 = getRandomInt(127);
  }
  return { e1, e2 };
};

// export const getNewlatentVectorFromTwoDVector = (
//   latentVector: number[],
//   variationPlan: VariationPlan,
//   variationValue: VariationValue
// ) => {
//   let xArray: number[] = Array(128).fill(0);
//   let yArray = Array(128).fill(0);

//   xArray[variationPlan.e1] = variationValue.x;
//   yArray[variationPlan.e2] = variationValue.y;

//   let XYSum = sumTwoArray(xArray, yArray);
//   let newlatentVector = sumTwoArray(XYSum, latentVector);

//   return newlatentVector;
// };

// export const getNewlatentVectorFromAValue = (
//   latentVector: number[],
//   variationPlan: VariationPlan,
//   value: number
// ) => {
//   let array: number[] = Array(128).fill(0);
//   array[variationPlan.e1] = value * 5;
//   let newlatentVector = sumTwoArray(array, latentVector);
//   return newlatentVector;
// };

export const getNewlatentVectorFromAValueWithVectorVariationPlan = (
  latentVector: number[],
  variationPlan: VariationPlan,
  value: number
) => {
  let newVariationVector = scaleBy(variationPlan.e1, value * 5);
  let newlatentVector = sumTwoArray(latentVector, newVariationVector);
  return newlatentVector;
};

export const getNewVariationPlanVector = () => {
  let randomVector = Array.from({ length: 128 }, () => getRandomGaussian());
  const e1: number[] = normalize(randomVector);
  const e2 = Array(128).fill(0);
  return { e1, e2 };
};

export const getNewRandomlatentVector = () => {
  const vector = Array.from({ length: 128 }, () => getRandomGaussian());
  return vector;
};

const getNorm = (vector: number[]) => {
  return Math.hypot(...vector);
};

const scaleBy = (vector: number[], scale: number) => {
  return new Array(...vector.map((component) => component * scale));
};

const normalize = (vector: number[]) => {
  return scaleBy(vector, 1 / getNorm(vector));
};

const getRandomGaussian = () => {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  // Transform to the desired mean and standard deviation:
  return z;
};

export const getNewLatentVectorWithIncreasedDifferenciesFromTwoLatentVector = (
  initialVector: number[],
  differenceVector: number[],
  scale: number
) => {
  // Calculate initialVector - differenceVector
  let differenceSubstractionVector = substractTwoArray(
    differenceVector,
    initialVector
  );
  let scaledDifferenceSubstractionVector = scaleBy(
    differenceSubstractionVector,
    scale
  );
  let newVector = sumTwoArray(
    initialVector,
    scaledDifferenceSubstractionVector
  );
  return newVector;
};
