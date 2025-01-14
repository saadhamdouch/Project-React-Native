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

const Friends = ({ navigation }) => {
  const [Friends, setFriends] = useState([]);

  // Fonction pour récupérer les données des utilisateurs
  const getUsers = async () => {
    try {
      const fetchedFriends = await api.getAllUsers();
      setFriends(fetchedFriends);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Récupération des données lors du montage
  useEffect(() => {
    getUsers();
  }, []); // Tableau de dépendances vide : s'exécute une seule fois au montage

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ajoute un zéro au début si le jour est < 10
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = date.getFullYear();
    return `${day} - ${month} - ${year}`;
  };

  const Friend = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Chat", {
            friendId: item.id,
            friendName: item.username,
          })
        }
        style={styles.card}
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
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
    );
  };

  return (
    <View style={styles.container}>
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

