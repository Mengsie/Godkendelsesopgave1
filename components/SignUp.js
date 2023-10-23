import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native'; 
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Picker } from '@react-native-picker/picker'; // til bar at vælge user typen
import { getDatabase, ref, set } from 'firebase/database';
import { useNavigation } from '@react-navigation/native'; 
import { globalStyles } from '../styles/globalStyles'

const SignUp = () => {

  //sætter variable og states som ændres når brugeren tilføjer information 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('lookingForRoom');
  const navigation = useNavigation();

  //til at signe up vha. firebase og dens sikkerheds modul
        const handleSignup = () => {
        const auth = getAuth();

          //laver en bruger med firebase moduler med email og pasword
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;

        //object der indeholder indtastet bruger information
        const userData = {
            password: password,
            email: email,
            userType: userType,
        };

        //tilføjer brugeren til database i users, hvor de identificere med et userid (uid)
        const db = getDatabase();
        set(ref(db, 'users/' + user.uid), userData)
              //hvis de lykkedes navigeres til profil view
              .then(() => {
                  console.log('Bruger tilføjet til databse');
                  navigation.navigate('Profile');
          })
          //hvis burger oprettelse fejler
          .catch((error) => {
            console.error('virker ikke:', error);
          });

      })
      .catch((error) => {
        console.error(error);
        });
  };

  return (
    //views til at indtaste bruger information
    <View style={globalStyles.container}>
          <View style={globalStyles.form}>
        <Text style={globalStyles.text}>Email</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={globalStyles.text}>Password</Text>
           <TextInput
          style={globalStyles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
             onChangeText={(text) => setPassword(text)}
        />

        <Text style={globalStyles.text}>User Type</Text>
          <Picker
          selectedValue={userType}
          onValueChange={(itemValue) => setUserType(itemValue)}
        >

          <Picker.Item label="Looking" value="LookingForARoom" />
          <Picker.Item label="Renting" value="RentingOutARoom" />
             </Picker>
      </View>
      <View style={globalStyles.button}>
        <Button
        //refere til funktion i straten som sikre brugeren kan lave en bruger
          onPress={handleSignup}
          title="Sign Up"
        />
      </View>
    </View>
    );
};

export default SignUp;
