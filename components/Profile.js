import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, get, set, update } from 'firebase/database';
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL,} from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'; 
import { globalStyles } from '../styles/globalStyles'

const Profile = () => {

  const navigation = useNavigation();

  //sætter states som ændres til true når brugeren trykker på edit knappen
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  //bruger autentificering
  const auth = getAuth();
  const user = auth.currentUser;

  //funktion til at loggge ud bliver kaldt på knap senere
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      console.log('Log ud lykkedes');
    } catch (error) {
      console.error(error);
    }
  };

  //hvis bruger er logget ind henter den bruger information til at vise i de forskellige felter, hvis der ikke er noget information vises blot
  // en tom streng. Brugeren indentificeres vha. unik id (uid) i firebase databasen
  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setProfileImage(userData.profileImage || null);
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

  //gemmer ændringer i databsen på den specfikke bruger vha. id
  const handleSaveChanges = () => {
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);

      const updatedUserData = {
        username: username,
        age: age,
        bio: bio,
      };

      update(userRef, updatedUserData)
        .then(() => {
          //afslutter redigering status
          setIsEditing(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //til at håndtere billede vælger fra fotos på mobil og henter tilladelse (SKAL UNDERSØGES HVORDAN MAN FÅR POP UP TIL AT SPØRGE BRUGER OM TILLADSE)
  const handleImageSelect = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

   
    //henter en anden databse i firebase som kan håndtere billeder (storage)
    const storage = getStorage();
    //hvordan vi gemmer billedet, profilers billeder kan findes i databsen ved at bruge deres id som navn på billede i databasen
    //hvor billedet vil gemmes, dens reference
    const imageRef = storageRef(storage, `profileImages/${user.uid}.jpg`);
    const imageBytes = await fetch(result.assets[0].uri);
    const imageBlob = await imageBytes.blob();

        //følgende er til opdatering og upload generelt af profil billeder til storage
    uploadBytes(imageRef, imageBlob)
      .then((snapshot) => {
        console.log('billlede er uploaded');
        getDownloadURL(imageRef)
          .then((url) => {
            const db = getDatabase();
            const userRef = ref(db, 'users/' + user.uid);
            //sætter url'en til profil billede ind på bruger objectet så det også gemmes der og der reference mellem obejct og dens billede
            set(userRef, { profileImage: url }, { merge: true });
            setProfileImage(url);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //hvis bruger ikke er logget ind
  if (!auth.currentUser) {
    return <View><Text>Please log in.</Text></View>;
  }

  return (
    <View style={globalStyles.container}>
      {isEditing ? (
        <>
        <Button title="Select profile picture" onPress={handleImageSelect} color="blue" />
          {profileImage && (
            <Image source={{ uri: profileImage }} style={globalStyles.profileImage} />
          )}
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={globalStyles.input}
          />
          <TextInput
            placeholder="Age"
            value={age}
            onChangeText={(text) => setAge(text)}
            style={globalStyles.input}
          />
          <TextInput
            placeholder="Bio"
            value={bio}
            onChangeText={(text) => setBio(text)}
            style={globalStyles.input}
          />
    
          <Button title="Save Changes" onPress={handleSaveChanges} color="blue" />
          <Button onPress={handleLogOut} title="Log out" />
        </>
      ) : (
        <>
        <Text style={globalStyles.text}>Profilepicture:</Text>
        {profileImage && (
            <Image source={{ uri: profileImage }} style={globalStyles.profileImage} />
          )}
          <Text style={globalStyles.text}>Username: {username}</Text>
          <Text style={globalStyles.text}>Age: {age}</Text>
          <Text style={globalStyles.text}>Bio: {bio}</Text>
          <Button onPress={handleLogOut} title="Log out" />
          <Button onPress={() => navigation.navigate('Match')} title="Matching" />
          <Button title="Edit Profile" onPress={() => setIsEditing(true)} color="blue" />
        </>
      )}
    </View>
  );
};


export default Profile;
