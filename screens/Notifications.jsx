import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import {
  UserPlus,
  UserCheck,
  UserX,
  Heart,
  FileText,
} from "lucide-react-native";
import { useRoute } from "@react-navigation/native";
import * as notificationService from "../services/notificationService";
import * as userService from "../services/userService";

// const notifications = [
//   {
//     _id: "64b74ef51234567890abcdef",
//     type: "sendFriendRequest",
//     sender: "64b74ef51234567890abc001",
//     receiver: "64b74ef51234567890abc002",
//     message: "John Doe sent you a friend request.",
//     createdAt: "2025-01-25T10:00:00.000Z",
//   },
//   {
//     _id: "64b74ef51234567890abcdea",
//     type: "acceptedFriendRequest",
//     sender: "64b74ef51234567890abc003",
//     receiver: "64b74ef51234567890abc002",
//     message: "Jane Smith accepted your friend request.",
//     createdAt: "2025-01-24T15:30:00.000Z",
//   },
//   {
//     _id: "64b74ef51234567890abcfef",
//     type: "like",
//     sender: "64b74ef51234567890abc004",
//     receiver: "64b74ef51234567890abc002",
//     message: "Mike liked your post.",
//     createdAt: "2025-01-23T12:45:00.000Z",
//   },
//   {
//     _id: "64b74ef51234567890abcfee",
//     type: "post",
//     sender: "64b74ef51234567890abc005",
//     receiver: "64b74ef51234567890abc002",
//     message: "Sarah shared a new post.",
//     createdAt: "2025-01-22T09:00:00.000Z",
//   },
//   {
//     _id: "64b74ef51234567890abcfed",
//     type: "refusedFriendRequest",
//     sender: "64b74ef51234567890abc006",
//     receiver: "64b74ef51234567890abc002",
//     message: "Chris refused your friend request.",
//     createdAt: "2025-01-21T18:20:00.000Z",
//   },
// ];

const Notification = ({navigation}) => {
  /**
   * component NotificationItem
   */

  const NotificationItem = ({ item }) => {
    const scaleAnim = React.useRef(new Animated.Value(0.95)).current;

    React.useEffect(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }, [scaleAnim]);

    const getIcon = (type) => {
      switch (type) {
        case "sendFriendRequest":
          return <UserPlus size={24} color="#4A90E2" />;
        case "acceptedFriendRequest":
          return <UserCheck size={24} color="#50C878" />;
        case "refusedFriendRequest":
          return <UserX size={24} color="#FF6B6B" />;
        case "like":
          return <Heart size={24} color="#FF4F9A" />;
        case "post":
          return <FileText size={24} color="#FFA500" />;
        default:
          return null;
      }
    };

    return (
      <TouchableOpacity
        onPress={() => handleNavigation(item)}
      >
        <Animated.View
          style={[
            styles.notificationItem,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View style={styles.iconContainer}>{getIcon(item.type)}</View>
          <View style={styles.contentContainer}>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.timestamp}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const handleNavigation = async (item) => {
     console.log("hana dkholt lhnaya");
     navigation.navigate("VisitedProfile", {
          friend: item.sender,
          clientId: userId,
        });
     };

  /**
   * principal component Notification
   */
  const route = useRoute();
  const { userId } = route.params;
  const [notifications, setNotifications] = useState([]);
  const [noNotifMessage, setNoNotifMessage] = useState("");

  const getNotifications = async () => {
    const response = await notificationService.getAllNotificationsByUserId(
      userId
    );
    if (response?.success) {
      if (response.notifications) {
        setNotifications(response.notifications);
      } else {
        setNoNotifMessage(response.message);
      }
    } else {
      console.log("error fetching notifications", response);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [userId]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {noNotifMessage && (
        <View style={styles.noNotificationContainer}>
          <Text style={styles.noNotificationText}>{noNotifMessage}</Text>
        </View>
      )}
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  noNotificationContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    width: "90%",
  },
  noNotificationText: {
    fontSize: 16,
    color: "#7F8C8D",
    fontWeight: "bold",
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F4F8",
  },
  contentContainer: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    color: "#34495E",
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#7F8C8D",
  },
});

export default Notification;
