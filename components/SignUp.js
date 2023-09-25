import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native'; // Replaced TouchableOpacity with Button
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Picker } from '@react-native-picker/picker'; // til bar at vælge user typen
import { getDatabase, ref, set } from 'firebase/database';

const SignUp = () => {

  //sætter variable 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('lookingForRoom');

  //til at signe up vha. firebase
        const handleSignup = () => {
        const auth = getAuth();


    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;


        const userData = {
            password: password,
            email: email,
            userType: userType,
        };

        //tilfææjer brugeren til datavse
        const db = getDatabase();
        set(ref(db, 'users/' + user.uid), userData)

              .then(() => {
                  console.log('Bruger tilføjet til databse');
          })

          .catch((error) => {
            console.error('virker ikke:', error);
          });

      })
      .catch((error) => {
        console.error(error);
        });
  };

  return (
    <View style={styles.container}>
          <View style={styles.form}>
        <Text style={styles.tekst}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.tekst}>Password</Text>
           <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
             onChangeText={(text) => setPassword(text)}
        />

        <Text style={styles.tekst}>User Type</Text>
          <Picker
          selectedValue={userType}
          onValueChange={(itemValue) => setUserType(itemValue)}
          style={styles.vælg}
        >
          <Picker.Item label="Looking" value="LookingForARoom" />
          <Picker.Item label="Renting" value="RentingOutARoom" />
             </Picker>
      </View>

      <View style={styles.button}>
        <Button
          onPress={handleSignup}
          title="Sign Up"
        />
      </View>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(50, 180, 250)',
  },
  form: {
    width: '85%',
  },
  tekst: {
    fontSize: 23,
    marginBottom: 3,
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
  vælg: {
    width: '100%',
    height: 55,
    marginBottom: 22,
  },
  button: {
    width: '80%',
    marginTop: 102
  },
});

export default SignUp;
