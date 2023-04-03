import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

export default function ChatListItem({ name, avatar, nameFirstLetter, chatId, myId }) {
    const [lastSentMessage, setLastSentMessage] = useState('');
    const [lastSentTime, setLastSentTime] = useState('');
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('users')
            .doc(myId)
            .collection('chats_list')
            .doc(chatId)
            .onSnapshot((doc) => {
                setUnreadCount(doc.data()?.unreadCount || 0);
            });

        return () => unsubscribe();
    }, []);

    const incrementUnreadCount = () => {
        firestore()
            .collection('users')
            .doc(myId)
            .collection('chats_list')
            .doc(chatId)
            .update({ unreadCount: firebase.firestore.FieldValue.increment(1) });
    };

    useEffect(() => {
        const options = {
            timeZone: 'Asia/Hong_Kong',
            hour12: true,
            hour: 'numeric',
            minute: 'numeric'
        };

        const unsubscribe = firestore()
            .collection('users')
            .doc(myId)
            .collection('chats_list')
            .doc(chatId)
            .collection('chats')
            .orderBy('createdAt', 'desc')
            .limit(1)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const { text, createdAt } = doc.data();
                    setLastSentMessage(text);
                    setLastSentTime(createdAt.toDate().toLocaleString('en-US', options));
                    if (doc.data()?.senderId !== myId && !doc.data()?.read) {
                        incrementUnreadCount();
                    }
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
                    {unreadCount > 0 && (
                        <View style={styles.unreadContainer}>
                            <Text style={styles.unreadCount}>{unreadCount}</Text>
                        </View>
                    )}
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