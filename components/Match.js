import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { globalStyles } from '../styles/globalStyles'

const Match = () => {
  const [imageURL, setImageURL] = useState(null);

    //funktion til at like, skal tilføjes til databse med bruger id så man kan få en oversigt over hvem der har liket hvem¨
    //det samme med dislike
  const handleLike = () => {
    console.log('Synes godt om');
  };

  const handleDislike = () => {
    console.log('Synes ikke om');
  };

  //lige nu bruges bare det samme billde, men i fremtiden skal der referes til en specifik brugers billede og bio
  //billede hentes fra firebase
  useEffect(() => {
    const storage = getStorage();
    const imageRef = ref(storage, 'gs://roomie-6085a.appspot.com/profileImages/Q9SiIHw6ybfSCG5b06zQWhZgBU22.jpg'); 

    getDownloadURL(imageRef)
      .then((url) => {
        setImageURL(url);
      });
  }, []);

  return (
    
    <View style={globalStyles.container}>
        <Text>Brugernavn her</Text>
      {imageURL ? (
        <Image source={{ uri: imageURL }} style={globalStyles.profileImage2} />
      ) : (
        <Text>Loading image...</Text>
      )}
      <Text>BIO HER</Text>
      <View style={globalStyles.buttonContainer}>
        <Button title="Like" onPress={handleLike} color="green" />
        <Button title="Dislike" onPress={handleDislike} color="red" />
      </View>
    </View>
  );
};



export default Match;
