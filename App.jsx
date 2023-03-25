import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import Login from './components/Login';
import ChatList from './components/ChatList';
import Signup from './components/Signup';
import ChatScreen from './components/ChatScreen';
import auth from '@react-native-firebase/auth';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [people, setPeople] = useState([]);
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const Stack = createNativeStackNavigator();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    if (user) {
      // create a document in the users collection with the user's UID as the document ID
      firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        })
        .then(() => {
          console.log('User added to firestore!');
        })
        .catch(error => {
          console.error('Error adding user to firestore: ', error);
        });
    }
  }


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // console.log(user)
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .onSnapshot(querySnapshot => {
        const people = [];

        querySnapshot.forEach(documentSnapshot => {
          people.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setPeople(people);
      });
    return () => unsubscribe();
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Chats">
        <Stack.Screen
          name="Chats"
          children={() => <ChatList people={people} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          children={() => <Signup
            user={user}
            setSignupEmail={setSignupEmail}
            signupEmail={signupEmail}
            setSignupUsername={setSignupUsername}
            signupUsername={signupUsername}
            setSignupPassword={setSignupPassword}
            signupPassword={signupPassword}
          />}
        />
        <Stack.Screen name='ChatScreen' component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
