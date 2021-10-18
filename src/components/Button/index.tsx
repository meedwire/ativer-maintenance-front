import React, {useState} from 'react';
import {
  TouchableOpacity,
  Animated,
  GestureResponderEvent,
  TextProps,
} from 'react-native';
import {useTiming} from '../../hooks';

import styles from './styles';
import {AnimatedButton} from './types';

const TouchableAnimated = Animated.createAnimatedComponent(TouchableOpacity);

const Button: React.FC<AnimatedButton> = ({
  children,
  onPress,
  onPressIn,
  onPressOut,
  mode = 'ghost',
  ...props
}) => {
  const [active, setActive] = useState(false);

  const shadow = useTiming(3, active, {
    toValue: 0.5,
    duration: 150,
  });

  const scale = useTiming(1, active, {
    toValue: 0.99,
    duration: 150,
  });

  function handlePress() {
    if (typeof onPress === 'function') {
      onPress();
    }
  }

  function handlePressIn(event: GestureResponderEvent) {
    setActive(true);
    if (typeof onPressIn === 'function') {
      onPressIn(event);
    }
  }

  function handlePressOut(event: GestureResponderEvent) {
    setActive(false);
    if (typeof onPressOut === 'function') {
      onPressOut(event);
    }
  }

  return (
    <TouchableAnimated
      disabled={props.disabled}
      activeOpacity={1}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles[mode],
        props.style,
        {elevation: shadow, transform: [{scale}]},
      ]}>
      {React.cloneElement<TextProps>(children, {
        style: {
          textAlign: 'center',
          color:
            mode === 'contained'
              ? 'white'
              : mode === 'ghost'
              ? active
                ? 'blue'
                : 'black'
              : undefined,
          textDecorationLine:
            mode === 'ghost' ? (active ? 'underline' : undefined) : undefined,
        },
      })}
    </TouchableAnimated>
  );
};

export {Button};
