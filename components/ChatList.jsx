import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const ChatListItem = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: 'https://via.placeholder.com/50x50.png' }} />
      <View style={styles.content}>
        <View style={styles.upper}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.time}>2:30 PM</Text>
        </View>
        <View style={styles.lower}>
          <Text style={styles.message}>Hello! How are you?</Text>
          <View style={styles.unreadContainer}>
            <Text style={styles.unreadCount}>3</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const ChatList = () => {
  return (
    <View style={styles.listContainer}>
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  upper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  lower: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  message: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  unreadContainer: {
    backgroundColor: '#00BFFF',
    borderRadius: 10,
    marginLeft: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  unreadCount: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatList;
