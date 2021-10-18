import {Platform, StyleSheet} from 'react-native';
import {Theme} from '../../theme';

export default StyleSheet.create({
  container: {
    marginBottom: 8,
    marginHorizontal: 8,
  },
  containerSelect: {
    width: '100%',
    alignSelf: 'stretch',
    borderColor: 'rgb(50, 205, 0)',
    backgroundColor: 'white',
    borderWidth: 1,
    color: '#a1a1a1',
  },
  label: {
    color: Theme.colors.dark.text,
  },
  textError: {
    color: 'rgba(255, 20, 0, 0.3)',
  },
});

export const StyleSelect = {
  backgroundColor: 'white',
  color: '#1e1e1e',
  ...Platform.select({
    web: {
      outlineStyle: "none",
      border: 'none',
      padding: '8px',
    },
  }),
}