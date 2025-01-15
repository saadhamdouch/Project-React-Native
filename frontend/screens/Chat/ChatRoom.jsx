import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';


const socket = io('http://192.168.100.52:3333', {
  transports: ['websocket'],
});

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipientId, setRecipientId] = useState('');

  const route = useRoute();
  const { friendId, friendName, userId } = route.params;

  const navigation = useNavigation()

  console.log('ana f chat :',friendId, userId)


  useEffect(() => {
    // Créez la room quand l'écran se charge
    const roomId = [userId, friendId].sort().join('_'); 
    socket.emit("joinRoom", roomId);

    // Ecoutez les messages entrants dans cette room
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [friendId, userId]);


  const sendMessage = () => {
    if (message.trim() === "") return; // Ne pas envoyer de message vide

    const roomId = [userId, friendId].sort().join('_'); // Room basée sur les ID des utilisateurs
    const newMessage = {
      senderId: userId,
      receiverId: friendId,
      message: message,
      timestamp: new Date().toISOString(),
    };

    // Émettre le message à la room via socket
    socket.emit("sendMessage", { roomId, newMessage });

    // Ajout du message localement
    // setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage(""); // Effacer le champ de message après envoi
  };

  const HandlCall = ()=>{
    
    navigation.navigate("CallPage", {
      friendId: friendId,
      friendName: friendName,
      userId: userId,
    })

    console.log('calling...')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const MessageItem = ({ item }) => {
   const isSender = item.senderId == userId;
    // const isSender = true;
    return (
      <View style={[styles.messageContainer, isSender ? styles.senderMessage : styles.receiverMessage]}>
        <Text style={styles.messageContent}>{item.message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={(text) => { setMessage(text) }}
        />
        <TouchableOpacity onPress={HandlCall} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>call</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f3f3f3",
  },
  messageContainer: {
    maxWidth: "80%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  senderMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#D1C4E9",
  },
  receiverMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E3F2FD",
  },
  messageContent: {
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#6A0DAD", // Violet
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    gap: 20,
    flexDirection: "row",
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    height: 40,
  },
});

export default ChatRoom