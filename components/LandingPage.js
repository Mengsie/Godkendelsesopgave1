import { View, Text, Button, StyleSheet } from 'react-native';
import * as React from "react";
import { globalStyles } from '../styles/globalStyles'

// Navigator til de to views i starten
const LandingPage = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Welcome!</Text>
      
      <View style={globalStyles.buttonStyle}>
        <Button
          title="Login"
          onPress={() => navigation.navigate('Login')}
          color="white"
        />
      </View>

      <View style={globalStyles.buttonStyle}>
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('Signup')}
          color="white"
        />
      </View>
    </View>
     );
  };



export default LandingPage;
