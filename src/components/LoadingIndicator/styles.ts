import {StyleSheet} from 'react-native';
import {Theme} from '../../theme';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLoading: {
    padding: Theme.padding.X,
    borderRadius: 50,
    elevation: 10,
    backgroundColor: 'white',
  },
});
