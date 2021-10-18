import {useRef, useState} from 'react';
import {Animated} from 'react-native';
import {Easing} from 'react-native-reanimated';

interface ITimingConfig {
  toValue: number;
  duration: number;
}

const useTiming = (
  value: number,
  transitionValue: boolean,
  config: ITimingConfig,
) => {
  const animatedValue = useRef(new Animated.Value(value)).current;
  const [initialValue] = useState(value);

  if (transitionValue) {
    Animated.timing(animatedValue, {
      toValue: config.toValue,
      duration: config.duration,
      useNativeDriver: false,
      easing: Easing.bounce,
    }).start(() => {
      return animatedValue;
    });
  } else {
    Animated.timing(animatedValue, {
      toValue: initialValue,
      duration: config.duration - 100,
      useNativeDriver: false,
    }).start(() => {
      return animatedValue;
    });
  }

  return animatedValue;
};

export {useTiming};
