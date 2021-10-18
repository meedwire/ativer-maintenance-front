import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import { View, TouchableOpacity, Dimensions, Animated } from "react-native";
import { HandleModal } from "./helpers";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";

const Modal = forwardRef<HandleModal>((props, ref) => {
  const [visible, setVisible] = useState(false);
  const children = useRef<React.ReactElement | null>(null);
  const [minWidth, setMinWidth] = useState(
    Dimensions.get("window").width > 800
      ? 600
      : Dimensions.get("window").width - 80
  );
  const [maxWidth, setMaxWidth] = useState(
    Dimensions.get("window").width > 800 ? 600 : undefined
  );
  const opacity = useRef(new Animated.Value(0)).current;

  const show = useCallback(
    (component: React.ComponentType, defaultData?: any) => {
      children.current = React.createElement<any>(component, { defaultData });
      setVisible(true);
    },
    []
  );

  const hidden = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => setVisible(false));
  }, []);

  useImperativeHandle(ref, () => {
    return {
      show,
      hidden,
    };
  });

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  useEffect(() => {
    const event = Dimensions.addEventListener("change", ({ window }) => {
      setMinWidth(
        window.width > 800 ? 600 : Dimensions.get("window").width - 80
      );
    });

    return () => {
      event;
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Animated.View
        style={[
          styles.containerContent,
          {
            minWidth,
            maxWidth,
            transform: [
              {
                scale: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={hidden} style={styles.buttonClose}>
          <AntDesign name="close" color="red" size={25} />
        </TouchableOpacity>
        {children.current}
      </Animated.View>
    </Animated.View>
  );
});

export { Modal };
