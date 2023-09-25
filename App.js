
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingPage from './components/LandingPage';
import Login from './components/Login';

import SignUp from './components/SignUp';
import Profile from './components/Profile';

//databse ting

import { getApps, initializeApp } from "firebase/app"; 
import { initializeAuth, getAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


//navigator
const Stack = createNativeStackNavigator();

export default function App() {
  
  //database ting
  const firebaseConfig = {
    apiKey: "AIzaSyAvhZWJzCoIIch-nbC95rVP9Y0EoMQARic",
    authDomain: "roomie-6085a.firebaseapp.com",
    projectId: "roomie-6085a",
    storageBucket: "roomie-6085a.appspot.com",
    messagingSenderId: "409073992358",
    appId: "1:409073992358:web:6a6d0367c47e79e2f12a67"
  };
  
  const app = initializeApp(firebaseConfig);
  
  //alert at databsen virker
  if (getApps().length < 1) {
    
    console.log("Firebase On!");
    // Initialize other firebase products here
     }

     const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  
    //navigator mellem views
   return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        
      </Stack.Navigator>
    </NavigationContainer>



  );



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
