import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import Login from './components/Login';
import ChatList from './components/ChatList';
import Signup from './components/Signup';
import ChatScreen from './components/ChatScreen';
import Profile from './components/Profile';
import auth from '@react-native-firebase/auth';
import UsersList from './components/UsersList';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [myId, setMyId] = useState();
  const [updatedProfile, setUpdatedProfile] = useState();
  const [chatListItems, setChatListItems] = useState([]);

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
      setMyId(user.uid);
    }
  }

  console.log(myId);
  // get the users list
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const usersData = [];

        querySnapshot.forEach(documentSnapshot => {
          const userData = {
            id: documentSnapshot.id,
            ...documentSnapshot.data()
          };
          usersData.push(userData);
        });

        setUsers(usersData);
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [updatedProfile]);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup"
            // component={Signup} />
            children={() =>
              <Signup
                setUpdatedProfile={setUpdatedProfile} />}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  console.log(users)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Chats">
        <Stack.Screen
          name="Chats"
          children={() =>
            <ChatList
              myId={myId}
              chatListItems={chatListItems}
            />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ChatScreen'
          component={ChatScreen}
        />
        <Stack.Screen
          name='Users List'
          children={() =>
            <UsersList
              users={users}
              myId={myId}
              chatListItems={chatListItems}
              setChatListItems={setChatListItems}
            />}
        />
        <Stack.Screen
          name='User Profile'
          children={() =>
            <Profile
              setUpdatedProfile={setUpdatedProfile}
            />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
