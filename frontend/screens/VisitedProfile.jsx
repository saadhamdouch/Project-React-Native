import { useEffect, useState, useRef } from "react"
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRoute } from "@react-navigation/native"
import * as api from "../services/userService"
import * as notificationService from "../services/notificationService"

const VisitedProfile = ({ navigation }) => {
  const [user, setUser] = useState(null)
  const [isSendingRequest, setIsSendingRequest] = useState(false)
  const [isFriend, setIsFriend] = useState(false)
  const [isRequestSender, setIsRequestSender] = useState(false)
  const [loading, setLoading] = useState(true) // Ajout de loading pour éviter plusieurs appels
  const route = useRoute()
  const friend = route.params?.friend
  const userId = route.params?.clientId
  const fadeAnim = useRef(new Animated.Value(0)).current // Utilisation de useRef pour éviter le re-render

  useEffect(() => {
    if (!userId || !friend?._id) return

    setLoading(true) // Empêche les appels multiples
    getCurrentUser()
    checkFriendshipStatus()
    setLoading(false) // Termine le chargement après la récupération des données
  }, [userId, friend?._id]) // Suppression de fadeAnim pour éviter la boucle infinie

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, []) // Exécuter une seule fois au montage

  const handleNavigation = () => {
    navigation.navigate("Chat", {
      friendId: friend._id,
      friendName: friend.username,
      userId,
    });
  }

  const handleDeleteRequest = async () => {
    const isDeleted = await notificationService.deleteFriendRequest(userId, friend._id)
    if (isDeleted) {
      console.log("Demande d'ami annulée avec succès")
      setIsSendingRequest(false)
    }
  }

  const handleSendRequest = async () => {
    const notif = { sender: userId, receiver: friend._id, type: "sendFriendRequest" }
    const isRequestSent = await notificationService.createNotification(notif)
    if (isRequestSent) {
      setIsSendingRequest(true)
      setIsRequestSender(true)
    }
  }

  const handleRefollow = async () => {
    const notif = { sender: userId, receiver: friend._id, type: "acceptedFriendRequest" }
    const isRequestAccepted = await notificationService.createNotification(notif)
    if (isRequestAccepted) {
      setIsFriend(true)
    }
  }

  const checkFriendshipStatus = async () => {
    try {
      const response = await notificationService.checkFriendChipStatus(userId, friend._id)
      if (response.status === "pending") {
        setIsSendingRequest(true)
        if (response.sender === userId) setIsRequestSender(true)
      } else if (response.status === "friends") {
        setIsFriend(true)
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'amitié :", error)
    }
  }

  const getCurrentUser = async () => {
    try {
      const fetchedUser = await api.getUserById(userId)
      if (fetchedUser) setUser(fetchedUser)
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error)
    }
  }

  if (!friend || loading) {
    return (
      <View style={styles.emptyContainer}>
        <Text>{loading ? "Chargement..." : "Aucune information disponible"}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Image source={{ uri: friend.avatar || "https://via.placeholder.com/150" }} style={styles.avatar} />
          <Text style={styles.username}>{friend.username}</Text>
          <Text style={styles.email}>{friend.email}</Text>
          <Text style={styles.address}>{friend.adresse}</Text>

          {!isFriend && (
            <View style={styles.actionContainer}>
              {isSendingRequest ? (
                isRequestSender ? (
                  <>
                    <Text style={styles.requestSent}>Demande envoyée</Text>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleDeleteRequest}>
                      <Text style={styles.cancelButtonText}>Annuler la demande</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity style={styles.followButton} onPress={handleRefollow}>
                    <Ionicons name="person-add" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Follow back</Text>
                  </TouchableOpacity>
                )
              ) : (
                <TouchableOpacity style={styles.followButton} onPress={handleSendRequest}>
                  <Ionicons name="person-add-outline" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Follow</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </Animated.View>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={24} color="#333" style={styles.cardIcon} />
          <Text style={styles.sectionTitle}>Informations du compte</Text>
          <Text style={styles.infoText}>Membre depuis : {new Date(friend.createdAt).toLocaleDateString()}</Text>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="people-outline" size={24} color="#333" style={styles.cardIcon} />
          <Text style={styles.sectionTitle}>Followers</Text>
          <Text style={styles.infoText}>{friend.friends.length} Follower(s)</Text>
        </View>

        {isFriend && (
          <TouchableOpacity style={styles.chatButton} onPress={handleNavigation}>
            <Ionicons name="chatbubble-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Démarrer le chat</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}


export default VisitedProfile

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  container: { flex: 1 },
  contentContainer: { paddingBottom: 20 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { alignItems: "center", padding: 30, backgroundColor: "#fff", borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 5 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20, borderWidth: 3, borderColor: "#3498db" },
  username: { fontSize: 28, fontWeight: "bold", color: "#333", marginBottom: 5 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 10 },


  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#3498db",
  },
  username: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  actionContainer: {
    alignItems: "center",
  },
  requestSent: {
    color: "#666",
    fontSize: 16,
    marginBottom: 10,
  },
  cancelButton: {
    padding: 10,
  },
  cancelButtonText: {
    color: "#e74c3c",
    fontSize: 16,
    fontWeight: "bold",
  },
  followButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  infoCard: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardIcon: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  infoText: {
    fontSize: 16,
    color: "#666",
  },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 25,
    margin: 20,
  },
})