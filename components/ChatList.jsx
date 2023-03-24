import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const ChatListItem = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

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
    console.log(people)

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const chatsCollection = await firestore().collection('chats').doc('lBkE9X55qHxp6nQVoHoi').get();
  //     console.log(chatsCollection);
  //   }
  //   fetchData();
  // }, [])

  return (
    <View style={styles.container}>
      {people.length ? (
        <>
          <Image style={styles.avatar} source={{ uri: 'https://via.placeholder.com/50x50.png' }} />
          <View style={styles.content}>
            <View style={styles.upper}>
              <Text style={styles.name}>{people[0].data.name}</Text>
              <Text style={styles.time}>2:30 PM</Text>
            </View>
            <View style={styles.lower}>
              <Text style={styles.message}>Hello! How are you?</Text>
              <View style={styles.unreadContainer}>
                <Text style={styles.unreadCount}>3</Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.centeredContainer}>
          <Text style={styles.messageText}>You have no chats currently</Text>
        </View>
      )}
    </View>
  );
};

const ChatList = () => {
  return (
    <View style={styles.listContainer}>
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
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  messageText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
});

export default ChatList;
