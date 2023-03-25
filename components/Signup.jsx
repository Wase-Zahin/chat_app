import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const Signup = ({ navigation, setSignupEmail, signupEmail, signupUsername, setSignupUsername, signupPassword, setSignupPassword }) => {
    const handleSignupPress = () => {
        auth()
            .createUserWithEmailAndPassword(signupEmail, signupPassword)
            .then(() => {
                console.log('User account created & signed in!');
                setSignupEmail('');
                setSignupPassword('');
                setSignupUsername('');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
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
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setSignupEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setSignupUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => setSignupPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.loginText}>Already have an account? <Text style={styles.loginTextColor} onPress={handleLoginPress}>Login here!</Text></Text>
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
    loginText: {
        marginTop: 16,
    },
    loginTextColor: {
        color: '#007aff',
    }
});

export default Signup;
