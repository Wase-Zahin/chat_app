import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

export default function UsersList({ users, myId, chatListItems, setChatListItems }) {
    const navigation = useNavigation();

    const navigateToChatScreen = (item, id, avatar, nameFirstLetter) => {
        console.log(item);
        const itemExists = chatListItems.some(chat => chat.id === id);
        if (!itemExists) {
            setChatListItems(prevListItems => [...prevListItems, item]);
        }
        navigation.navigate('ChatScreen', { chatId: id, myId: myId, avatar: avatar, nameFirstLetter: nameFirstLetter });
    };

    useEffect(() => {
        console.log(chatListItems);
    }, [chatListItems]);

    const renderUser = ({ item }) => {
        return (
            <View style={styles.userContainer}>
                <View style={styles.userInfo}>
                    {item.photoURL ? (
                        <Image style={styles.profilePic} source={{ uri: item.photoURL }} />
                    ) : (
                        <View style={styles.profilePic}>
                            <Text style={styles.nameFirstLetter}>{item.displayName ? item.displayName.charAt(0).toUpperCase() : ""}</Text>
                        </View>
                    )}
                    {/* <Image style={styles.profilePic} source={{ uri: item.photoURL }} /> */}
                    <Text style={styles.name}>{item.displayName}</Text>
                </View>
                <TouchableOpacity style={styles.messageButton}
                    key={item.id}
                    onPress={() => navigateToChatScreen(item, item.id, item.photoURL, item.displayName
                        ?
                        item.displayName.charAt(0).toUpperCase() : '')}>
                    <Text style={styles.messageButtonText}>Message</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#F5F5F5',
    },
    userContainer: {
        backgroundColor: '#E8E8E8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'lightgray',
    },
    nameFirstLetter: {
        fontSize: 32,
        margin: 'auto',
        textAlign: 'center',
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
    },
    messageButton: {
        backgroundColor: '#247BA0',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    messageButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: '#B5B5B5',
        marginVertical: 10,
    },
});
