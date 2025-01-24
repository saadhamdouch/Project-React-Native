import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const VisitedProfile = ({ navigation }) => {
  const route = useRoute();
  const friend = route.params?.friend;
  const userId = route.params?.clientId;
  if (!friend) {
    return (
      <View style={styles.emptyContainer}>
        <Text>Aucune information disponible</Text>
      </View>
    );
  }
  const handleNavigation = ()=>{
     navigation.navigate("Chat", { friendId : friend._id, friendName : friend.username, userId });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: friend.avatar || "/frontend/assets/images/profileImage.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{friend.username}</Text>
        <Text style={styles.email}>{friend.email}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Informations du compte</Text>
        <Text style={styles.infoText}>Membre depuis : {new Date(friend.createdAt).toLocaleDateString()}</Text>
      </View>

      <View style={styles.friendsSection}>
        <Text style={styles.sectionTitle}>Amis</Text>
        <Text style={styles.infoText}>{friend.friends.length} ami(s)</Text>
      </View>

      <TouchableOpacity
        style={styles.chatButton}
        onPress={handleNavigation}
      >
        <Text style={styles.chatButtonText}>Démarrer le chat</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#4169E1",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    paddingBottom: 10,
    color: "#666",
  },
  infoSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  friendsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4169E1",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  chatButton: {
    backgroundColor: "#4169E1",
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
    marginTop: 30,
  },
  chatButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default VisitedProfile;
