import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import * as api from "../../services/userService";
import io from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";

const urlDeployed = "https://confastservice.onrender.com";
const url = "http://localhost:8080";
const socket = io(urlDeployed, {
  path: "/chat",
  transports: ["websocket"],
});

const Friends = ({ navigation }) => {
  const [Friends, setFriends] = useState([]);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    // Se connecter au serveur
    socket.on("connection", () => {
      console.log("Connecté au socket serveur");
      setUserId(socket.id);
    });

    // Récupérer les contacts depuis l'API (à ajuster selon votre backend)
    getUser();

    return () => {
      socket.disconnect();
    };
  }, []);

  // Fonction pour récupérer les données des utilisateurs
  const getUser = async () => {
    try {
      const getUserByToken = await api.getUserByToken();
      setUser(getUserByToken);
      setUserId(getUserByToken._id);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleNavigation = (item, page) => {
    if (page === "chat") {
      navigation.navigate("Chat", {
        friendId: item._id,
        friendName: item.username,
        userId: userId,
      });
    } else if (page === "VisitedProfile") {
      navigation.navigate("VisitedProfile", {
        friend: item,
        clientId: userId,
      });
    }

    const roomId = [userId, item.id].sort().join("");
    socket.emit("joinRoom", roomId);
    console.log(`Vous avez rejoint la room: ${roomId}`);
  };

  const getFriend = async () => {
    if (userId) {
      const fetchedFriends = await api.getUserFriends(userId);
      setFriends(fetchedFriends);
    }
  };
  useEffect(() => {
    getFriend();
  }, [userId != ""]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ajoute un zéro au début si le jour est < 10
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0
    const year = date.getFullYear();
    return `${day} - ${month} - ${year}`;
  };

  const Friend = ({ item }) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => handleNavigation(item, "VisitedProfile")}
          style={{ width: "20%" }}
        >
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleNavigation(item, "chat")}
          style={{ width: "80%" }}
        >
          <View>
            <View style={styles.name}>
              <Text style={{ fontWeight: "600" }}>{item.username}</Text>
            </View>
            <View style={styles.name}>
              <Text style={{ fontWeight: "600" }}>{item.email}</Text>
            </View>
            {/* <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "600" }}>
              Last Message : {item.lastMessage.slice(0, 25)}
            </Text>
            {item.lastMessage.length > 25 ? <Text> ... </Text> : null}
          </View> */}
            <View style={styles.date}>
              <Text style={{ color: "green", fontWeight: "500" }}>
                {formatDate(item.createdAt)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          padding: 20,

        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")} // Redirection vers SearchUser
          style={{
            marginRight: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text style={{
             color: "purple", fontSize: 20, fontWeight: "600"
          }}>Search New Friends</Text>
          <Ionicons name="search-outline" size={25} fontWeight={20} color="purple" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={Friends}
        renderItem={Friend}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Friends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "space-arround",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    width: "95%",
    borderWith: 3,
    borderColor: "black",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    fontWeight: "600",
  },
  date: {
    alignItems: "flex-start",
  },
});
