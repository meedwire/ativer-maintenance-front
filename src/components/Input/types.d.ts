import {TextInputProps} from 'react-native';

export interface IInput extends Omit<TextInputProps, 'onChange'> {
  name: string;
  label?: string;
  flex?: number;
  mask?: string;
}
