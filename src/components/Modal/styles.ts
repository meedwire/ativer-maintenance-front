import {Dimensions, StyleSheet} from 'react-native';
import {Theme} from '../../theme';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerContent: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10
  },
  buttonClose:{
    position: 'absolute',
    right: 0,
    top: 0,
    padding: Theme.padding.M,
    zIndex: 99999
  }
});
