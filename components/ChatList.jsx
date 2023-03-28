import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import ChatListItem from './ChatListItem';
import auth from '@react-native-firebase/auth';

const ChatList = ({ users, myId }) => {
  const navigation = useNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null);

  

  const navigateToChatScreen = (id, avatar) => {
    navigation.navigate('ChatScreen', { chatId: id, myId: myId, avatar: avatar });
  };

  const navigateToUsersList = () => {
    navigation.navigate('Users List');
  }

  const handleMenuPress = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleMenuHide = () => {
    setIsMenuVisible(false);
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  return (
    <TouchableWithoutFeedback onPress={handleMenuHide}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chats</Text>
          <TouchableOpacity onPress={handleMenuPress}>
            <Icon name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {users.length > 0 ? (
            users.map((user) => (
              <TouchableOpacity
                key={user.id}
                onPress={() => navigateToChatScreen(user.id, user.photoURL)}
              >
                <ChatListItem
                  nameFirstLetter={user.displayName.charAt(0).toUpperCase()}
                  name={user.displayName}
                  avatar={user.photoURL}
                  id={user.id}
                />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.centeredContainer}>
              <Text style={styles.messageText}>You have no chats currently</Text>
            </View>
          )}
        </View>

        {isMenuVisible && (
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.menu} ref={menuRef}>
                <Text style={styles.menuBar}>Menu</Text>
                <View style={styles.menuItemContainer}>
                  <Text style={styles.menuItem}>Profile</Text>
                  <View style={styles.separator} />
                  <Text
                    style={styles.menuItem}
                    onPress={() => navigateToUsersList()}>
                    Users List
                  </Text>
                  <View style={styles.separator} />
                  <Text style={styles.menuItem} onPress={logout}>Logout</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2e64e5',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  menu: {
    backgroundColor: '#fff',
    width: '80%',
    height: '100%',
    padding: 10,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuBar: {
    textAlign: 'center',
    fontSize: 24,
    padding: 10,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    width: '100%',
    borderBottomColor: 'black',
  },
  menuItemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },

});


export default ChatList;
