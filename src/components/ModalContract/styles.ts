import {Dimensions, StyleSheet} from 'react-native';
import {Theme} from '../../theme';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  textHeader: {
    color: Theme.colors.dark.text,
    fontSize: 20,
    marginBottom: 8,
  },
  buttonSubmit: {
    marginTop: 8,
  },
});
