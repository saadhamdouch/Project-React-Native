import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import * as api from "../services/userService";
import * as notificationService from "../services/notificationService";

const VisitedProfile = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isRequestSender, setIsRequestSender] = useState(false);
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
  const handleNavigation = () => {
    navigation.navigate("Chat", {
      friendId: friend._id,
      friendName: friend.username,
      userId,
    });
  };

  const handleDeleteRequest = async () => {
    const isDeleted = await notificationService.deleteFriendRequest(
      userId,
      friend._id
    );
    if (isDeleted) {
      console.log("Demande d'ami annulée avec succès");
      setIsSendingRequest(false);
    }
  };

  const handleSendRequest = async () => {
    const notif = {
      sender: userId,
      receiver: friend._id,
      type: "sendFriendRequest",
    };
    const isRequestSent = await notificationService.createNotification(notif);
    if (isRequestSent) {
      setIsSendingRequest(true);
    }
  };

  const handleRefollow = async () => {
    const notif = {
      sender: userId,
      receiver: friend._id,
      type: "acceptedFriendRequest",
    };
    const isRequestAccepted = await notificationService.createNotification(
      notif
    );
    if (isRequestAccepted) {
      setIsFriend(true);
    }
  };

  const checkFriendshipStatus = async () => {
    const response = await notificationService.checkFriendChipStatus(
      userId,
      friend._id
    );
    if (response.status === "pending") {
      setIsSendingRequest(true);
      if (response.sender === userId) {
        setIsRequestSender(true);
      }
    } else if (response.status === "friends") {
      setIsFriend(true);
    }
  };

  useEffect(() => {
    checkFriendshipStatus();
  }, [userId, friend._id]);

  const getCurrentUser = async () => {
    const user = await api.getUserById(userId);
    if (user) {
      setUser(user);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [userId]);

  console.log("current user : ", user);
  console.log("current friend : ", friend);

  if (!user || !friend) {
    return (
      <View style={styles.emptyContainer}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: friend.avatar || "../assets/images/profileImage.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{friend.username}</Text>
        <Text style={styles.email}>{friend.email}</Text>
        <Text style={styles.email}>{friend.adresse}</Text>
          
        {isFriend ? // Ne rien afficher si c'est déjà un ami
        null : isSendingRequest ? (
          isRequestSender ? (
            <>
              <Text style={styles.chatButtonText}>Demande envoyée</Text>
              <TouchableOpacity onPress={handleDeleteRequest}>
                <Text style={styles.annulerInvitation}>Annuler la demande</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.FollowButton}
              onPress={handleRefollow}
            >
              <Text style={styles.chatButtonText}>Follow back</Text>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity
            style={styles.FollowButton}
            onPress={handleSendRequest}
          >
            <Text style={styles.chatButtonText}>Follow</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Informations du compte</Text>
        <Text style={styles.infoText}>
          Membre depuis : {new Date(friend.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.friendsSection}>
        <Text style={styles.sectionTitle}>Followers</Text>
        <Text style={styles.infoText}>{friend.friends.length} Follower(s)</Text>
      </View>

      {isFriend && (
        <TouchableOpacity style={styles.chatButton} onPress={handleNavigation}>
          <Text style={styles.chatButtonText}>Démarrer le chat</Text>
        </TouchableOpacity>
      )}
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
  annulerInvitation: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  FollowButton: {
    backgroundColor: "black",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
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
