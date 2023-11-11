import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  content: {
    paddingVertical: 32,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    marginBottom: 32,
  },
  newOrderContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 13,
    padding: 16,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#C52233',
    borderRadius: 5,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
export { styles };
