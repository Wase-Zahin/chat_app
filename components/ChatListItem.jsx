import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';


export default function ChatListItem({ name, avatar, nameFirstLetter, lastSentMessage, lastSentTime, id }) {
    console.log(id)

    useEffect(() => {
        firestore()
            .collection('chats')
            .get()
            .then(querySnapshot => {
                console.log('Total chats: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                });
            });
    })
    // useEffect(() => {
    //     const chatsRef = firestore().collection('chats');

    //     chatsRef.get().then((chatsSnapshot) => {
    //         console.log(chatsSnapshot);
    //         console.log(chatsSnapshot.docs);
    //         const chatDocs = chatsSnapshot.docs;
    //         chatDocs.forEach((chatDoc) => {
    //             const messagesRef = chatDoc.ref.collection('messages').orderBy('timestamp', 'desc').limit(1);

    //             messagesRef.get().then((messagesSnapshot) => {
    //                 const lastMessageDoc = messagesSnapshot.docs[0];
    //                 console.log('Last message for chat', chatDoc.id, ':', lastMessageDoc.data());
    //             }).catch((error) => {
    //                 console.error('Error fetching last message:', error);
    //             });
    //         });
    //     }).catch((error) => {
    //         console.error('Error fetching chats:', error);
    //     });

    // }, []);

    return (
        <View style={styles.container}>
            {/* if photoURL is not null */}
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