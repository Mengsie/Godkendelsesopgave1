import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth'; 
import { getDatabase, ref, get, set, update } from 'firebase/database';

const Profile = () => {
  //sætter varibaler til form
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');

    const auth = getAuth();
    const user = auth.currentUser;

  // Bruger log ud
  const handleLogOut = async () => {
      try {
         await signOut(auth);
           console.log('Log ud virker');
      } catch (error) {
      console.error(error);
  }
  };

  useEffect(() => {
        if (user) {
         const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);

      // få bruger data fra Firebase database
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
               const userData = snapshot.val();
              // Sætter felter til variable i formen, hvis ikke der er, så er felterene tomme
            setUsername(userData.username || '');
            setAge(userData.age || '');
            setBio(userData.bio || '');
          }
        })
        .catch((error) => {
      console.error(error);
           });
  }
  }, [user]);

  //alt skal opdatere databsen
  const handleSaveChanges = () => {
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);
  
      // Obejkt med nyt bruger info
           const updatedUserData = {
              username: username,
              age: age,
              bio: bio,
              };
  
      // Opdater brugeren i databasen // tilføjer de nye data til objekt
      update(userRef, updatedUserData)
        .then(() => {
                  console.log('Opdatering');
              setIsEditing(false);
        })
      .catch((error) => {
          console.error(error);
        });
         }
  };
  
  //hvis bruger ikke er logget ind, vises dette
  if (!auth.currentUser) {
    return <View><Text>Log in please!!!!!</Text></View>;
  }

  return (
    <View style={styles.container}>
             {isEditing ? (
        <>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Age"
            value={age}
            onChangeText={(text) => setAge(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Bio"
            value={bio}
            onChangeText={(text) => setBio(text)}
            style={styles.input}
          />
          <Button title="Save Changes" onPress={handleSaveChanges} color="blue" />
        </>
           ) :
            (
        <>
          <Text style={styles.tekst}>Username: {username}</Text>
          <Text style={styles.tekst}>Age: {age}</Text>
          <Text style={styles.tekst}>Bio: {bio}</Text>
          <Button title="Edit Profile" onPress={() => setIsEditing(true)} color="blue" />
        </>
      )}
       
  <Button onPress={handleLogOut} title="Log out" />
    </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  tekst: {
    fontSize: 22,
    marginBottom: 9,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '82%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 13,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Profile;
