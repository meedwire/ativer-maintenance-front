import {StyleSheet} from 'react-native';
import {Theme} from '../../theme';

export default StyleSheet.create({
  contained: {
    padding: Theme.padding.M,
    //@ts-ignore
    backgroundColor: Theme.colors.primary,
  },
  ghost: {
    padding: Theme.padding.M,
  },
  outline: {
    padding: Theme.padding.M,
    borderWidth: 1,
    borderColor: '#dadada',
    borderRadius: 50,
  },
});
