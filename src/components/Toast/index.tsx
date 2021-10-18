import React, { forwardRef, useImperativeHandle, useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";
import { View, Animated, Text } from "react-native";

import styles from "./styles";

export type ITagToast = "error" | "alert" | "success";

export interface IHandleToast {
  show: (message: string, duration: number, tag: ITagToast) => void;
}

interface IStateToast {
  message: string | undefined;
  tag: ITagToast;
}

const Toast = forwardRef<IHandleToast>((props, ref) => {
  const [messageToast, setIsVisible] = useState<IStateToast>({
    message: undefined,
    tag: "success",
  });
  const transition = useRef(new Animated.Value(0)).current;

  const show = useCallback(
    (message: string, duration: number, tag) => {
      setIsVisible({ message, tag });
      Animated.timing(transition, {
        toValue: 20,
        useNativeDriver: false,
        duration: 500,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(transition, {
            toValue: 0,
            useNativeDriver: false,
            duration: 300,
          }).start(() => {});
        }, duration);
      });
    },
    [transition]
  );

  useImperativeHandle(ref, () => {
    return {
      show,
    };
  });

  if (!messageToast.message) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: transition.interpolate({
            extrapolate: "clamp",
            inputRange: [0, 20],
            outputRange: [0, 1],
          }),
          transform: [
            {
              translateY: transition.interpolate({
                inputRange: [0, 20],
                outputRange: [0, -20],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles[messageToast.tag]}>
        <Text style={{ color: "white" }}>{messageToast.message}</Text>
      </View>
    </Animated.View>
  );
});

export { Toast };
