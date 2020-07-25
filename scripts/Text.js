import React, { memo } from "react";
import { Text as RNText, StyleSheet } from "react-native";
import propTypes from "prop-types";
import { RegularFont } from "./Fonts";

const Text = ({ fontFamily = RegularFont, style, children, color }) => {
  const textStyles = [TextStyles[fontFamily], { color }];
  return (
    <RNText style={StyleSheet.compose(style, textStyles)}>{children}</RNText>
  );
};

Text.propTypes = {
  fontFamily: propTypes.string,
};

const TextStyles = StyleSheet.create({
  Regular: {
    fontFamily: Platform.OS === "android" ? "REGULAR" : "SF_TEXT_REGULAR",
  },
  Bold: {
    fontFamily: Platform.OS === "android" ? "BOLD" : "SF_TEXT_BOLD",
  },
  RegularHeading: {
    fontFamily: Platform.OS === "android" ? "REGULAR" : "SF_DISPLAY_REGULAR",
  },
  BoldHeading: {
    fontFamily: Platform.OS === "android" ? "BOLD" : "SF_DISPLAY_BOLD",
  },
});

export default memo(Text);
