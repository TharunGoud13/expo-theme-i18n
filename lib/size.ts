import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const SIZES = {
  // Global SIZES
  base: 8,
  font: 14,
  radius: 30,
  padding: 8,
  padding2: 12,
  padding3: 16,

  // FONTS Sizes
  largeTitle: 50,
  h1: 36,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,

  // App Dimensions
  width,
  height,
};
