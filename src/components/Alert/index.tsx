import React, {
  useImperativeHandle,
  forwardRef,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useState } from "react";
import { Animated, Text, View, Easing, Dimensions } from "react-native";
import { Button } from "../Button";

import styles from "./styles";

export interface IButtonsAlert {
  text?: string;
  onPress?: (value?: string) => void;
  style?: "default" | "cancel" | "destructive";
}

export interface IHandleAlert {
  alert(title: string, message?: string, buttons?: IButtonsAlert[]): void;
}

interface IPropsMessage {
  title: string;
  message: string;
  buttons?: IButtonsAlert[];
}

const Alert = forwardRef<IHandleAlert>((props, ref) => {
  const [alertData, setAlertData] = useState<IPropsMessage | undefined>();
  const opacity = useRef(new Animated.Value(0)).current;

  const alert = useCallback(
    (title: string, message: string, buttons?: IButtonsAlert[]) => {
      setAlertData({
        title,
        message,
        buttons,
      });
    },
    []
  );

  useImperativeHandle(ref, () => {
    return {
      alert,
    };
  });

  useEffect(() => {
    if (alertData) {
      Animated.timing(opacity, {
        toValue: 1,
        useNativeDriver: false,
        duration: 150,
        easing: Easing.linear,
      }).start();
    }
  }, [alertData]);

  if (!alertData) return null;

  function handleCLose(finish: () => void) {
    Animated.timing(opacity, {
      toValue: 0,
      useNativeDriver: false,
      duration: 150,
      easing: Easing.linear,
    }).start(() => {
      finish()
      setAlertData(undefined);
    });
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.boxContent,
          {
            transform: [
              {
                translateY: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [Dimensions.get("window").height / 2 - 120, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.textTitle}>{alertData.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.textMessage}>{alertData.message}</Text>
        <View style={styles.divider} />
        <View style={styles.row}>
          {alertData.buttons &&
            alertData.buttons.map((button, index) => (
              <Button
                key={index.toString()}
                onPress={() => {
                  handleCLose(() => {
                    if (typeof button.onPress === "function") button.onPress();
                  });
                }}
                style={{ flex: 1, marginRight: 5, backgroundColor: "#747474" }}
                mode="contained"
              >
                <Text>{button.text}</Text>
              </Button>
            ))}
        </View>
        {!alertData.buttons && (
          <Button
            style={{ flex: 1, marginRight: 5, backgroundColor: "#99cc33" }}
            mode="contained"
          >
            <Text>OK</Text>
          </Button>
        )}
      </Animated.View>
    </Animated.View>
  );
});

export { Alert };
