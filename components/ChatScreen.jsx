import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // get the chatId from the route params
  const { chatId } = route.params;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setMessages(messages);
      });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (inputMessage === '') {
      return;
    }

    const message = {
      text: inputMessage,
      createdAt: new Date(),
    };

    try {
      await firestore().collection('chats').doc(chatId).collection('messages').add(message);
      setInputMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        {messages.map((message) => (
          <View key={message.id} style={[styles.messageBubble, message.sender === 'user' ? styles.userBubble : styles.otherBubble]}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  messagesContainer: {
    flex: 1,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#5FB9F6',
  },
  otherBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA',
  },
  messageText: {
    fontSize: 18,
    color: '#333333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 10,
    marginRight: 10,
    fontSize: 18,
  },
  sendButton: {
    backgroundColor: '#5FB9F6',
    borderRadius: 25,
    padding: 10,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
