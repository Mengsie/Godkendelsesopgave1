import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(50, 180, 250)',
    width: '100%'
    },
  text: {
    fontSize: 23,
  },
  button2: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: 'rgb(0, 122, 255)',
    borderRadius: 52,
    padding: 12,
    alignItems: 'center',
    marginVertical: 11,
    width: 200,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 13,
    marginBottom: 11,
    fontSize: 20,
    height: 51,
  },
  form: {
    width: '85%',
  },
  button: {
    width: '80%',
    marginTop: 102
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  profileImage2: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  // Add more global styles as needed
});
