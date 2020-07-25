import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableTypes } from "./scripts/TouchableTypes";
import Spotify from "./scripts/touchables/Spotify";
import RectButton from "./scripts/touchables/RectButton";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    REGULAR: require("./assets/fonts/ProductSans-Regular.ttf"),
    BOLD: require("./assets/fonts/ProductSans-Bold.ttf"),
    SF_DISPLAY_REGULAR: require("./assets/fonts/SFProDisplay-Regular.otf"),
    SF_DISPLAY_BOLD: require("./assets/fonts/SFProDisplay-Bold.otf"),
    SF_TEXT_BOLD: require("./assets/fonts/SFProText-Bold.otf"),
    SF_TEXT_REGULAR: require("./assets/fonts/SFProDisplay-Regular.otf"),
  });

  if (!loaded) {
    return null;
  }

  const type = TouchableTypes.RECT;
  let toRender = null;
  switch (type) {
    case TouchableTypes.SPOTIFY:
      toRender = <Spotify />;
      break;
    case TouchableTypes.RECT:
      toRender = <RectButton />;
      break;
  }
  return <View style={AppStyles.container}>{toRender}</View>;
}

const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
