import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
// Mock API data
const mockApi = {
  sender: {
    id: 1,
    firstName: "Lamiae",
    lastName: "Nouri",
    contact: "0688997766",
  },
  receiver: {
    id: 2,
    firstName: "Youssef",
    lastName: "Amrani",
    contact: "0611223344",
  },
  messages: [
    {
      content: "Salut, comment ça va ?",
      date: "2024-12-21T10:00:00",
    },
    {
      content: "Ça va bien, et toi ?",
      date: "2024-12-21T10:05:00",
    },
    {
      content: "Je vais bien aussi, merci pour ton message.",
      date: "2024-12-21T10:10:00",
    },
    {
      content: "On se voit ce soir ?",
      date: "2024-12-21T10:15:00",
    },
  ],
};

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  // Format the messages for rendering
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  const isSender = true;
  const MessageItem = ({ item, isSender }) => (
    <View
      style={[
        styles.messageContainer,
        isSender ? styles.senderMessage : styles.receiverMessage,
      ]}
    >
      <Text style={styles.messageContent}>{item.content}</Text>
      <Text style={styles.messageDate}>{formatDate(item.date)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockApi.messages}
        renderItem={({ item }) => {
          return <MessageItem item={item} isSender={isSender} />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
        />
        {/* Send Button */}
        <TouchableOpacity style={styles.sendButton}>
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
  chatTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
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
  messageDate: {
    fontSize: 12,
    color: "#757575",
    textAlign: "right",
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

export default ChatRoom;
