import { View, Text, Button, StyleSheet } from 'react-native';
import * as React from "react";

// Navigator to the three views
const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>

      <View style={styles.buttonStyle}>
        <Button
          title="Profile"
          onPress={() => navigation.navigate('Profile')}
          color="white"
        />
      </View>

      <View style={styles.buttonStyle}>
        <Button
          title="Login"
          onPress={() => navigation.navigate('Login')}
          color="white"
        />
      </View>

      <View style={styles.buttonStyle}>
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('Signup')}
          color="white"
        />
      </View>
    </View>
     );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(50, 180, 250)',
    width: '100%'
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
  });

export default LandingPage;
