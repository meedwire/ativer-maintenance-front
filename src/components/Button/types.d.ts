import { ReactElement } from 'react';
import {
  GestureResponderEvent,
  TextProps,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';

type IMode = 'outline' | 'contained' | 'ghost';

export interface AnimatedButton extends TouchableOpacityProps {
  onPress?: () => void;
  onPressIn?: ((event: GestureResponderEvent) => void) | undefined;
  onPressOut?: ((event: GestureResponderEvent) => void) | undefined;
  children: ReactElement<ViewProps | TextProps>;
  /** outline or contained or ghost Default is ghost */
  mode?: IMode;
}
