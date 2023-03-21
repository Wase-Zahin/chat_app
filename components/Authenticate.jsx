import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Authenticate = () => {
  const handleLoginPress = () => {
    // handle login logic
  };

  const handleSignupPress = () => {
    // handle signup logic
  };

  return (
    // input
    <View style={styles.container}>
      <Text style={styles.title}>Chat App</Text>
      <TextInput style={styles.input} placeholder="Username" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>

      {/* line between login signup button and icons */}
      <View style={styles.lineContainer}>
        <View style={styles.line1} />
        <View>
          <Text style={styles.textMiddle}>or</Text>
        </View>
        <View style={styles.line1} />
      </View>

      {/* icons */}
      <View style={styles.signupContainer}>
        <View style={styles.signupButtonContainer}>
        <TouchableOpacity style={styles.signupButtonGoogle}>
            <Icon.Button name="google" size={28} backgroundColor="#fff" color="#000">Login with Google</Icon.Button>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButtonFacebook}>
            <Icon.Button name="facebook" size={28} color="#fff" backgroundColor="#007aff">Login with Facebook</Icon.Button>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '80%',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    width: '80%',
  },
  line1: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  textMiddle: {
    width: 50,
    textAlign: 'center',
    color: 'black',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  signupText: {
    fontSize: 16,
  },
  signupButtonContainer: {
    flexDirection: 'column',
    gap: 16,
    marginLeft: 8,
    width: '80%',
  },
  signupButtonFacebook: {
    backgroundColor: '#007aff',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  signupButtonGoogle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#B2B2B2',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default Authenticate;
