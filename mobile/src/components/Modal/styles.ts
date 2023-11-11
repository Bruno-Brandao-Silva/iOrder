import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 135,
  },
  form: {
    marginTop: 64,
    paddingHorizontal: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    color: '#0A100D',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    height: 45, // Default height
    padding: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  multilineInput: {
    height: 110, // Adjusted height for multiline
    padding: 16, // Adjusted padding for multiline
  },
});

export { styles };
