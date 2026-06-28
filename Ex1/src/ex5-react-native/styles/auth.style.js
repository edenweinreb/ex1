import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  imageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  linkText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 20,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  roleButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  roleActive: {
    backgroundColor: '#007BFF',
  },
  roleText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  roleTextActive: {
    color: 'white',
  }
});