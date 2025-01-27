import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as api from "../../services/userService";
import Icon from "react-native-vector-icons/FontAwesome";
import AddPostIcon from "react-native-vector-icons/MaterialIcons";
import DeleteAccountIcon from "react-native-vector-icons/MaterialCommunityIcons";

const posts = [
  { id: "1", imageUrl: "https://picsum.photos/200/300", description: "Beautiful sunset", height: 300 },
  { id: "2", imageUrl: "https://picsum.photos/200/200", height: 200 },
  { id: "3", imageUrl: "https://picsum.photos/200/400", description: "My new artwork", height: 400 },
  { id: "4", imageUrl: "https://picsum.photos/200/250", height: 250 },
  { id: "5", imageUrl: "https://picsum.photos/200/350", description: "City lights", height: 350 },
  { id: "6", imageUrl: "https://picsum.photos/200/280", height: 280 },
];

const FriendItem = ({ friend, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.friendItem}>
      <Image
        source={{
          uri: friend.avatar
            ? friend.avatar
            : "../../assets/images/profileImage.jpg",
        }}
        style={styles.friendAvatar}
      />
      <Text style={styles.friendName}>{friend.username}</Text>
    </View>
  </TouchableOpacity>
);

const PostItem = ({ item, width }) => (
  <View style={[styles.postItem, { width }]}> 
    <Image
      source={{ uri: item.imageUrl }}
      style={[styles.postImage, { width, height: item.height }]}
    />
    {item.description && (
      <View style={styles.descriptionContainer}>
        <Text style={styles.postDescription}>{item.description}</Text>
      </View>
    )}
  </View>
);

const MasonryList = ({ posts, numColumns, containerWidth }) => {
  const columnWidth = containerWidth / numColumns;

  const columns = Array.from({ length: numColumns }, () => []);
  posts.forEach((post, index) => {
    columns[index % numColumns].push(post);
  });

  return (
    <View style={styles.masonryContainer}>
      {columns.map((column, columnIndex) => (
        <View
          key={columnIndex}
          style={[styles.masonryColumn, { width: columnWidth }]}
        >
          {column.map((post) => (
            <PostItem key={post.id} item={post} width={columnWidth} />
          ))}
        </View>
      ))}
    </View>
  );
};

export default function Profile({ navigation }) {
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [client, setClient] = useState(null);
  const [friends, setFriends] = useState([]);

  const findOne = async () => {
    try {
      const user = await api.getUserByToken();
      if (!user) {
        console.error("User undefined");
        return;
      }
      setClient(user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleNavigate = (friend) => {
    navigation.navigate("VisitedProfile", {
      friend,
      clientId : client._id
    });
  };

  useEffect(() => {
    findOne();
  }, []);

  const getFriend = async () => {
    if (client?._id) {
      try {
        const fetchedFriends = await api.getUserFriends(client._id);
        setFriends(fetchedFriends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    }
  };

  useEffect(() => {
    getFriend();
  }, [client?._id]);

  const handleLogout = async () => {
    const isLoggedout = await api.logout();
    if (isLoggedout) {
      navigation.navigate("Login");
    }
  };

  const screenWidth = Dimensions.get("window").width;
  const numColumns = 2;
  const formattedDate = client?.createdAt
    ? new Date(client.createdAt).toDateString()
    : "Date inconnue";

  if (!client) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Icon name="sign-out" size={24} color="#4169E1" />
          </TouchableOpacity>
          <Image
            source={
              client.avatar && client.avatar.trim() !== ""
                ? { uri: client.avatar }
                : require("../../assets/images/profileImage.jpg")
            }
            style={styles.avatar}
          />
          <Text style={styles.username}>{client.username}</Text>
          <Text style={styles.email}>{client.email}</Text>
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Icon name="edit" size={35} color="#4169E1" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowAddPostModal(true)}>
            <AddPostIcon name="post-add" size={35} color="#4169E1" />
          </TouchableOpacity>
          <TouchableOpacity>
            <DeleteAccountIcon name="delete" size={35} color="#4169E1" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Account Informations</Text>
          <Text style={styles.infoText}>Member since : {formattedDate}</Text>
        </View>

        <View style={styles.friendsSection}>
          <Text style={styles.sectionTitle}>Followers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {friends.map((friend) => (
              <FriendItem
                key={friend._id}
                friend={friend}
                onPress={() => handleNavigate(friend)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>Posts</Text>
          <MasonryList
            posts={posts}
            numColumns={numColumns}
            containerWidth={screenWidth - 40}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  logoutButton: {
    position: "absolute",
    top: 0,
    right: 20,
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
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  friendsSection: {
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  postsSection: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    marginLeft: 10,
    color: "#4169E1",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    marginLeft: 10,
  },
  friendItem: {
    alignItems: "center",
    marginRight: 15,
    width: 80,
  },
  friendAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  friendName: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  masonryContainer: {
    flexDirection: "row",
  },
  masonryColumn: {
    flexDirection: "column",
    marginHorizontal: 5,
  },
  postItem: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  postImage: {
    resizeMode: "cover",
  },
  descriptionContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  postDescription: {
    fontSize: 14,
    color: "#fff",
  },
  actionsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 17,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
});
