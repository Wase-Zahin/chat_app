import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
  GoogleSignin.configure({
    webClientId: "1098236165647-015uknfsfbv3itmt33kah8dpkomoa8rq.apps.googleusercontent.com",
  });

  const handleLoginPress = () => {
    // handle login logic
  };

  const handleSignupPress = () => {
    navigation.navigate('Signup');
  };

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential)
      .then(() => console.log("Signed in with google"))
      .catch((err) => console.log(err));
  }


  return (
    // input
    <View style={styles.container}>
      <Text style={styles.title}>Chat App</Text>
      <TextInput style={styles.input} placeholder="Username" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signupButtonText}>Doesn't have an account? 
        <Text style={styles.signupTextColor} onPress={handleSignupPress}> Sign up here!</Text>
      </Text>
      {/* <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity> */}

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
          <GoogleSigninButton
            onPress={onGoogleButtonPress}
            style={styles.signupButtonGoogle}>
          </GoogleSigninButton>
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
  signupButtonGoogle: {
    height: 65,
    width: '100%',
  },
  signupButtonText: {
    padding: 16,
  },
  signupTextColor: {
    color: '#007aff',
  }
});

export default Login;
