import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 2,
    paddingLeft: 10
  },
  textName: {
    color: 'black',
    maxWidth: 600
  },
  textValue:{
    maxWidth: 600,
    textAlign: 'justify',
    padding: 8
  },
  buttons: {
    padding: 10,
  },
  icon: {
    padding: 10,
  },
  containerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
});
