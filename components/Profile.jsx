import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Button } from 'react-native';

const Profile = () => {
  const [username, setUsername] = useState('JohnDoe');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveChanges = () => {
    // Save changes here
    console.log('Changes saved!');
  };

  const handleResetChanges = () => {
    // Reset changes here
    setUsername('JohnDoe');
    setCurrentPassword('');
    setNewPassword('');
    console.log('Changes reset!');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
        <Text style={styles.edit}>Edit</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
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
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSaveChanges} />
        <Button title="Reset" onPress={handleResetChanges} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  edit: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
  },
  input: {
    width: '80%',
    height: 50,
    marginVertical: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginVertical: 20,
  },
});

export default Profile;
