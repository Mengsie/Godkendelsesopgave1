/*
const db = getDatabase();
  const handleSaveChanges = () => {
    // Implement logic to save changes to Firebase Firestore or Realtime Database
    setIsEditing(false);
    console.log(user.email);

    const userRef = ref(getDatabase(), 'users/' + user.uid);
    
// Use the 'get' function to retrieve the value
get(userRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      // The value exists at the specified path
      const userData = snapshot.val();
      console.log('User data:', userData.email);
    } else {
      // The value does not exist at the specified path
      console.log('No data found at the path.');
    }
  })
  .catch((error) => {
    console.error('Error retrieving data:', error);
  });











import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase authentication functions
import { getDatabase, ref, get } from 'firebase/database';

const Profile = () => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  // Function to handle user logout
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    // Populate user profile information here from Firebase Firestore or Realtime Database
    // Example: Fetch user data and set it to the state variables (username, age, bio)
  }, []);

  const db = getDatabase();
  const handleSaveChanges = () => {
    // Implement logic to save changes to Firebase Firestore or Realtime Database
    setIsEditing(false);
    console.log(user.email);

    const userRef = ref(getDatabase(), 'users/' + user.uid);
    
// Use the 'get' function to retrieve the value
get(userRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      // The value exists at the specified path
      const userData = snapshot.val();
      console.log('User data:', userData.email);
    } else {
      // The value does not exist at the specified path
      console.log('No data found at the path.');
    }
  })
  .catch((error) => {
    console.error('Error retrieving data:', error);
  });

 

  };
  if (!auth.currentUser) {
    return <View><Text>Not found</Text></View>;
}

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/profile-image.jpg' }} // Replace with the user's actual profile image URL
        style={styles.profileImage}
      />
      
      {isEditing ? (
        <>
          <TextInput
            placeholder={user.email}
            value={user.email}
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
            multiline
            numberOfLines={4}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSaveChanges} style={styles.button}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Username: {username}</Text>
          <Text style={styles.label}>Age: {age}</Text>
          <Text style={styles.label}>Bio: {bio}</Text>
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
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
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '80%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Profile;
*/