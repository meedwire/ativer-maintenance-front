import { StyleSheet} from 'react-native';
import {Theme} from '../../theme';

export default StyleSheet.create({
 container:{
  padding: Theme.padding.M,
  marginTop: 20
 },
 containerScroll:{
  maxHeight: "70vh"
 },
  textStep: {
    color: Theme.colors.dark.text,
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '600'
  },
  loading:{
    padding: 80,
  }
});
