import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

export default function ChatListItem({ name, avatar, nameFirstLetter, id }) {
    const [lastSentMessage, setLastSentMessage] = useState('');
    const [lastSentTime, setLastSentTime] = useState('');

    useEffect(() => {
        const options = {
            timeZone: 'Asia/Hong_Kong',
            hour12: true,
            hour: 'numeric',
            minute: 'numeric'
        };

        const unsubscribe = firestore()
            .collection('chats')
            .doc(id)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .limit(1)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const { text, createdAt } = doc.data();
                    setLastSentMessage(text);
                    setLastSentTime(createdAt.toDate().toLocaleString('en-US', options));
                });
            });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            {avatar ? (
                <Image style={styles.avatar} source={{ uri: avatar }} />
            ) : (
                <View style={styles.avatar}>
                    <Text style={styles.nameFirstLetter}>{nameFirstLetter}</Text>
                </View>
            )}
            <View style={styles.content}>
                <View style={styles.upper}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.time}>{lastSentTime}</Text>
                </View>
                <View style={styles.lower}>
                    <Text style={styles.message}>{lastSentMessage}</Text>
                    <View style={styles.unreadContainer}>
                        <Text style={styles.unreadCount}>3</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
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
        backgroundColor: 'lightgray',
    },
    nameFirstLetter: {
        fontSize: 32,
        margin: 'auto',
        textAlign: 'center',
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
})