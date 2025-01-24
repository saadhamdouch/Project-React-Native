import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';

const urlDeployed ="https://confastservice.onrender.com";
const url = "http://localhost:8080";
const socket = io(urlDeployed, {
  path: "/chat",
  transports: ['websocket'],
});

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipientId, setRecipientId] = useState('');
  const flatListRef = useRef(null);

  const route = useRoute();
  const { friendId, friendName, userId } = route.params;

  const navigation = useNavigation()

  console.log('ana f chat :',friendId, userId)

  useEffect(() => {
    // Créez la room quand l'écran se charge
    const roomId = [userId, friendId].sort().join('_'); 
    socket.emit("joinRoom", roomId);
    //remplir le room avec les messages precedents
    socket.on("roomMessages", (listeMsgs) =>{
      setMessages(listeMsgs);
    });
    // Ecoutez les messages entrants dans cette room
    socket.on("receiveMessage", (newMessage) => {
      console.log("new message : ", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("roomMessages");
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

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0
    const year = String(date.getFullYear()).slice(2); // Récupère les deux derniers chiffres de l'année
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year}  ${hours}:${minutes}`;
  };

  const MessageItem = ({ item }) => {
   const isSender = item.sender == userId;
    // const isSender = true;
    return (
      <View style={[styles.messageContainer, isSender ? styles.senderMessage : styles.receiverMessage]}>
        <Text style={isSender ? styles.messageContentSender : styles.messageContentReceiver}>{item.content}</Text>
        <Text style={isSender ? styles.messageContentSender : styles.messageContentReceiver}>{formatDate(item.createdAt)}</Text>
      </View>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: false });
      }
    }, 1000);
  }, [messages]);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        ref={flatListRef}
        renderItem={({ item }) => <MessageItem item={item} />}
        keyExtractor={(item, index) => item._id || item.id || index.toString()}
        showsVerticalScrollIndicator={false}
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
    backgroundColor: "#FAFAFA", // Couleur claire et propre
  },
  messageContainer: {
    maxWidth: "75%",
    marginBottom: 12,
    padding: 12,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Ombre sur Android
  },
  senderMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#B70097",
    borderTopRightRadius: 0,
  },
  receiverMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 0,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },
  messageContentSender: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "System",
  },
  messageContentReceiver: {
    fontSize: 16,
    fontFamily: "System",
  },
  messageDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
    textAlign: "right", // Alignement à droite pour la date
  },
  sendButton: {
    backgroundColor: "#3897F0", // Bleu Instagram
    padding: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    elevation: 3, // Légère ombre pour Android
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#ECECEC",
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    borderColor: "#ECECEC",
    borderWidth: 1,
    backgroundColor: "#F9F9F9",
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 50,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1, // Légère ombre
  },
});


export default ChatRoom