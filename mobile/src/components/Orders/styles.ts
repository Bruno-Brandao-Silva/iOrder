import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    paddingBottom: 120,
    paddingHorizontal: 16,
  },
  card: {
    background: '#fff',
    flexDirection: 'row',
    height: 55,
    marginBottom: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  tableNumber: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  status: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  preparingBackground: {
    backgroundColor: '#F6A609',
  },
  doneBackground: {
    backgroundColor: '#2AC769',
  },
  textPreparing: {
    color: '#FFF',
  },
  textDone: {
    color: '#FFF',
  },
});

export { styles };
