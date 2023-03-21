import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Authenticate from './components/Authenticate';

export default function App() {
  
  return (
    <NavigationContainer>
      <Authenticate></Authenticate>
    </NavigationContainer>
  )
}
