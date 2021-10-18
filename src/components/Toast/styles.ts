import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden'
  },
  error: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 40,
  },
  alert: {
    backgroundColor: '#ffdb57d6',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 40,
  },
  success: {
    backgroundColor: '#72c700d1',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 40,
  },
});
