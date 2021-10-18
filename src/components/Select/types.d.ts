import {PickerProps} from '@react-native-picker/picker';

export interface ISelect extends Omit<PickerProps, 'onChange'> {
  name: string;
  label?: string;
  flex?: number;
  onValueChange?: (selected: string | number) => void
  itens: {
    value: string | number;
    label: string;
  }[];
}
