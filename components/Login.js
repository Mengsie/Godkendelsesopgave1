import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { globalStyles } from '../styles/globalStyles';


const LoginForm = () => {

  //state varibaler til login formen
     const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const navigation = useNavigation();

  //til login med authentication
      const handleLogin = () => {
            const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            const user = userCredential.user;
              console.log('log ind virker')
              navigation.navigate('Profile');
              

      })
      .catch((error) => {
        console.error(error);
       });
};

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.form}>
      <Text style={globalStyles.text}>Email</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

           <Text style={globalStyles.text}>Password</Text>
           <TextInput
               style={globalStyles.input}
               placeholder="Enter password"
               secureTextEntry
               value={password}
               onChangeText={(text) => setPassword(text)}
      />
      </View>

<Button title="Login" onPress={handleLogin} color="rgb(0, 122, 255)" />

    </View>
  );
};


export default LoginForm;
