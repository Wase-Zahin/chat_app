import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

const Profile = ({ setUpdatedProfile }) => {
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photoURL, setPhotoURL] = useState(null);


  const handleChoosePhoto = () => {
    // Launch the image picker
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.uri) {
        return;
      }

      // Create a reference to the location where the photo will be stored
      const storageRef = storage().ref(`photos/${auth().currentUser.uid}.jpg`);

      // Upload the photo to Firebase Storage
      storageRef.putFile(response.uri, { contentType: 'image/jpeg' })
        .then(() => {
          console.log('Photo uploaded!');
          // Get the download URL for the photo
          storageRef.getDownloadURL()
            .then(url => {
              console.log('Photo URL:', url);
              setPhotoURL(url);
            })
            .catch(error => {
              console.error(error);
              Alert.alert('Error', 'Failed to get photo URL. Please try again later.');
            });
        })
        .catch(error => {
          console.error(error);
          Alert.alert('Error', 'Failed to upload photo. Please try again later.');
        });
    });
  };

  useEffect(() => {
    console.log(photoURL);
  }, [photoURL]);
  
  const handleSaveUsername = () => {
    // Update the user's display name
    const user = auth().currentUser;
    user.updateProfile({
      displayName: username
    }).then(() => {
      console.log('Display name updated!');
      setUpdatedProfile(username);
      Alert.alert('Success', 'Display name updated successfully.');
    }).catch(error => {
      console.error(error);
      Alert.alert('Error', 'Failed to update display name. Please try again later.');
    });
  };

  const handleSavePassword = () => {
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match.');
      return;
    }

    // Reauthenticate user with current password
    const user = auth().currentUser;
    const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);
    user.reauthenticateWithCredential(credential)
      .then(() => {
        // Update password
        user.updatePassword(newPassword)
          .then(() => {
            console.log('Password updated!');
            Alert.alert('Success', 'Password updated successfully.');
          })
          .catch(error => {
            console.error(error);
            Alert.alert('Error', 'Failed to update password. Please try again later.');
          });
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Current password is incorrect. Please try again.');
      });
  };

  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={handleChoosePhoto}>
        {photoURL ? (
          <Image source={{ uri: photoURL }} style={{ width: 200, height: 200 }} />
        ) : null}
        <Button title="Choose Photo" onPress={handleChoosePhoto} />
      </TouchableOpacity>

      <View style={styles.fieldContainer}>
        <TextInput
          placeholder="Change Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.buttonContainer}>
          <Button title="Update Username" onPress={handleSaveUsername} />
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <TextInput
          placeholder="Current Password"
          secureTextEntry={true}
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          placeholder="New Password"
          secureTextEntry={true}
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <View style={styles.buttonContainer}>
          <Button title="Update Password" onPress={handleSavePassword} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  edit: {
    fontSize: 16,
    color: '#007AFF',
  },
  fieldContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});


export default Profile;
