import React, { useRef } from "react";
import { StyleSheet, Text, Vibration, View } from "react-native";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  call,
  cond,
  Easing,
  eq,
  not,
  onChange,
  set,
  stopClock,
  useCode,
} from "react-native-reanimated";
import { onGestureEvent, useClocks, useValue } from "react-native-redash";
import { runTiming } from "./ReanimatedAnimations";

const PRESS_OUT_SCALE = 1;
const PRESS_IN_SCALE = 0.9;
const PRESS_IN_DURATION = 225;
const PRESS_OUT_DURATION = 200;

export default function App() {
  const tapRef = useRef(null);

  const gestureState = useValue(State.UNDETERMINED);
  const scale = useValue(PRESS_OUT_SCALE);
  const onHandlerStateChange = onGestureEvent({
    state: gestureState,
  });

  const [pressInClock, pressOutClock] = useClocks(2);

  const onPressIn = () => {
    console.log("I'm Pressed in ", new Date().valueOf());
    Vibration.vibrate(10);
  };

  const onPressOut = () => {
    console.log("I'm Pressed out", new Date().valueOf());
  };

  useCode(
    () => [
      cond(
        eq(gestureState, State.BEGAN),
        [
          stopClock(pressOutClock),
          set(
            scale,
            runTiming(
              pressInClock,
              PRESS_IN_DURATION,
              scale,
              PRESS_IN_SCALE,
              Easing.out(Easing.bezier(0, 0, 0.58, 1))
            )
          ),
        ],
        [
          cond(not(eq(gestureState, State.ACTIVE)), [
            stopClock(pressInClock),
            set(
              scale,
              runTiming(
                pressOutClock,
                PRESS_OUT_DURATION,
                scale,
                PRESS_OUT_SCALE
              )
            ),
          ]),
        ]
      ),
    ],
    [gestureState, scale, pressOutClock, pressInClock]
  );

  useCode(
    () =>
      onChange(gestureState, [
        cond(eq(gestureState, State.BEGAN), [call([], onPressIn)]),
        cond(eq(gestureState, State.END), [call([], onPressOut)]),
      ]),
    [gestureState]
  );

  return (
    <View style={styles.container}>
      <TapGestureHandler
        {...onHandlerStateChange}
        enabled={true}
        shouldCancelWhenOutside={true}
        ref={tapRef}
        maxDurationMs={PRESS_IN_DURATION}
        numberOfTaps={1}
      >
        <Animated.View
          style={StyleSheet.compose(styles.buttonContainer, {
            transform: [{ scale }],
          })}
        >
          <Text style={{ color: "#FFFFFF" }}>Tap me</Text>
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: 125,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1DB954",
    borderRadius: 24,
    shadowColor: "lightgrey",
    shadowOpacity: 1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 3,
    elevation: 5,
  },
});
