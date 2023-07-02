import { getNewVariationPlanVector } from "../tools/vectorManipulations";
import { VariationPlan, VariationValue } from "./AudioSampleState";

export const variationInititalState: VariationState = {
  variationPlan: getNewVariationPlanVector(),
  variationValue: { x: 0, y: 0 },
};

export type VariationState = {
  variationPlan: VariationPlan;
  variationValue: VariationValue;
};
