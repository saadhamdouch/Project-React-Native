import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useSocket } from "../../app/SocketContext";
import * as api from '../../services/messageService'

const ChatRoom = () => {
  const { socket, NewMessage, user } = useSocket(); // Assurez-vous que `socket` est extrait correctement
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = user._id;
  const flatListRef = useRef(null);

  const route = useRoute();
  const { friendId, friendName } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMessages = async () => {
      if (userId && friendId) {
        try {
          const data = await api.getMessages({ sender: userId, receiver: friendId });
          console.log('Messages de la base de données :', data?.messages);
          const formattedMessages = data?.messages.map(message => ({
            id: message.receiver,
            content: message.content,
            sender: message.sender,
            timestamp: message.createdAt,
            isRead: false,
          }));
  
          setMessages(formattedMessages);
        } catch (error) {
          console.error("Erreur lors de la récupération des messages :", error);
        }
      }
    };
  
    fetchMessages();
  }, [userId, friendId]);
  

  useEffect(() => {
    if (socket && NewMessage) {
      console.log("roomMessages", NewMessage);
  
      // Vérifier si le message existe déjà dans la liste
      if ( Object.keys(NewMessage).length > 0 ) {
        const localmessage = {
          id: NewMessage.id,
          content: NewMessage.text,
          sender: NewMessage.sender,
          timestamp: NewMessage.timestamp,
          isRead: false,
        };
  
        setMessages((prevMessages) => [...prevMessages, localmessage]);
      }
    }
  }, [socket, NewMessage]);
  

  const sendMessage = () => {
    if (message.trim() === "" || !socket) return;

    const newUserMessage = {
      id: friendId, // ID du destinataire
      text: message,
      sender: userId, // ID de l'expéditeur
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    const localmessage = {
      id: friendId, // ID du destinataire
      content: message,
      sender: userId, // ID de l'expéditeur
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    // Émettre l'événement "new message" via le socket
    socket.emit("new message", { newUserMessage });
    setMessages((prevMessages) => [...prevMessages, localmessage]);
    setMessage(""); // Effacer le champ de message après envoi
  };

  // useEffect(() => {
  //   if (NewMessage) {
  //       console.log("new message received : ", NewMessage);
  //       setMessages((prevMessages) => [...prevMessages, NewMessage]);
  //   }
  // }, [NewMessage]);

  const HandlCall = () => {
    navigation.navigate("CallPage", {
      friendId: friendId,
      friendName: friendName,
      userId: userId,
    });
    console.log("calling...");
  };

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year}  ${hours}:${minutes}`;
  };

  const MessageItem = ({ item }) => {
    if (!item) return null;

    const isSender = item.sender === userId;

    return (
      <View
        style={[
          styles.messageContainer,
          isSender ? styles.senderMessage : styles.receiverMessage,
        ]}
      >
        <Text
          style={
            isSender ? styles.messageContentSender : styles.messageContentReceiver
          }
        >
          {item.content}
        </Text>
        <Text
          style={
            isSender ? styles.messageContentSender : styles.messageContentReceiver
          }
        >
          {formatDate(item.timestamp)}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        ref={flatListRef}
        renderItem={({ item }) => <MessageItem item={item} />}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity onPress={HandlCall} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Call</Text>
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
    backgroundColor: "#FAFAFA",
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
    elevation: 2,
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
  },
  messageContentReceiver: {
    fontSize: 16,
    color: "#000",
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
    elevation: 1,
  },
  sendButton: {
    backgroundColor: "#3897F0",
    padding: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    elevation: 3,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChatRoom;