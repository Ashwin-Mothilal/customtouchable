import React  from "react";
import { StyleSheet, View } from "react-native";
import { RectButton as RNGHRectButton } from "react-native-gesture-handler";
import Text from "../Text";
import { BoldFont } from "../Fonts";

const RectButton = () => {
  const onPress = () => {
    console.log("I'm pressed");
  };

  return (
    <RNGHRectButton onPress={onPress} style={RectButtonStyles.container}>
      <View accessible>
        <Text color="#333" fontFamily={BoldFont}>
          Tap me
        </Text>
      </View>
    </RNGHRectButton>
  );
};

const RectButtonStyles = StyleSheet.create({
  container: {
    width: 125,
    height: 43,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 43 / 2,
    elevation: 4,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: "lightgrey",
    shadowOpacity: 1,
    overflow: "visible",
  },
});

export default RectButton;
