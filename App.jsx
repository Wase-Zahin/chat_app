import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

export default function App() {
  const styles = StyleSheet.create({
    app: {
      backgroundColor: '#ECF2FF', 
    }
  })
  return (
    <ScrollView style={styles.app}>
      <Text>App</Text>
    </ScrollView>
  )
}
