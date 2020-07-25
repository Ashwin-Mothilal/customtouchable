import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableTypes } from "./scripts/TouchableTypes";
import Spotify from "./scripts/touchables/Spotify";
import RectButton from "./scripts/touchables/RectButton";

export default function App() {
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
