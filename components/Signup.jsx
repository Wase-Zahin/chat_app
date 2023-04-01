import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Signup = ({ setUpdatedProfile }) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSignupPress = () => {
        if (!email || !username || !password) {
            setEmailError(!email);
            setUsernameError(!username);
            setPasswordError(!password);
            return;
        }

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User account created & signed in!');

                user
                    .updateProfile({
                        displayName: username,
                    })
                    .then(() => {
                        console.log('User profile updated!');
                        setUpdatedProfile(username);
                    })
                    .catch((error) => {
                        console.error(error);
                    });

                setEmail('');
                setPassword('');
                setUsername('');
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    setEmailError(true);
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    setEmailError(true);
                }

                console.error(error);
            });
    };

    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={[styles.input, emailError && styles.errorInput]}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
            />
            {emailError && <Text style={styles.errorMessage}>Please enter a valid email address</Text>}
            <TextInput
                style={[styles.input, usernameError && styles.errorInput]}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
            />
            {usernameError && <Text style={styles.errorMessage}>Please enter a username</Text>}
            <TextInput
                style={[styles.input, passwordError && styles.errorInput]}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            {passwordError && <Text style={styles.errorMessage}>Please enter a password</Text>}
            <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginTextColor} onPress={handleLoginPress}>Login here!</Text>
            </Text>
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
    errorInput: {
        borderColor: 'red',
    },
    errorMessage: {
        alignSelf: 'flex-start',
        color: 'red',
        paddingLeft: 40,
        width: '80%',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginText: {
        marginTop: 16,
    },
    loginTextColor: {
        color: '#007aff',
    }
});

export default Signup;
