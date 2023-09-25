import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const LoginForm = () => {

  //state varibaler til login formen
     const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

  //til login med authentication
      const handleLogin = () => {
            const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            const user = userCredential.user;
              console.log('log ind virker')
      })
      .catch((error) => {
        console.error(error);
       });
};

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Email</Text>
      <TextInput
        style={styles.inputFelt}
        placeholder="Enter email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

           <Text style={styles.textStyle}>Password</Text>
           <TextInput
               style={styles.inputFelt}
               placeholder="Enter password"
               secureTextEntry
               value={password}
               onChangeText={(text) => setPassword(text)}
      />

<Button title="Login" onPress={handleLogin} color="rgb(0, 122, 255)" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 21,
  },
  inputFelt: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 13,
    marginBottom: 23,
    fontSize: 10,
    height: 51,
  },
  button: {
    backgroundColor: 'rgb(0, 122, 255)',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
});

export default LoginForm;
