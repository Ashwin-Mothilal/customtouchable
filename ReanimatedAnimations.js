import {
  block,
  clockRunning,
  cond,
  Easing,
  set,
  startClock,
  stopClock,
  timing,
  Value,
} from "react-native-reanimated";

function runTiming(clock, duration, startValue, dest, easing = Easing.linear) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: duration,
    toValue: new Value(0),
    easing,
  };

  return block([
    cond(clockRunning(clock), set(config.toValue, dest), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, startValue),
      set(state.frameTime, 0),
      set(config.toValue, startValue),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);
}

export { runTiming };
