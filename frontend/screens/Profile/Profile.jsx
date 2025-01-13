import React from "react";
import { useState, useEffect } from "react";
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
<<<<<<< HEAD
import Friends from "../Friends/Friends";
=======
import Icon from "react-native-vector-icons/FontAwesome";
import AddPostIcon from "react-native-vector-icons/MaterialIcons";
import DeleteAccountIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AddPost from "./AddPost";
import navigation from "@react-navigation/stack";

const friends = [
  {
    _id: "1",
    username: "Ami1",
    avatar:
      "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "2",
    username: "Ami2",
    avatar:
      "https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=1916&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "3",
    username: "Ami3",
    avatar:
      "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "4",
    username: "Ami4",
    avatar:
      "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "5",
    username: "Ami5",
    avatar:
      "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "6",
    username: "Ami6",
    avatar:
      "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const posts = [
  {
    id: "1",
    imageUrl: "https://picsum.photos/200/300",
    description: "Beautiful sunset",
    height: 300,
  },
  { id: "2", imageUrl: "https://picsum.photos/200/200", height: 200 },
  {
    id: "3",
    imageUrl: "https://picsum.photos/200/400",
    description: "My new artwork",
    height: 400,
  },
  { id: "4", imageUrl: "https://picsum.photos/200/250", height: 250 },
  {
    id: "5",
    imageUrl: "https://picsum.photos/200/350",
    description: "City lights",
    height: 350,
  },
  { id: "6", imageUrl: "https://picsum.photos/200/280", height: 280 },
];

const FriendItem = ({ friend }) => (
  <View style={styles.friendItem}>
    <Image source={{ uri: friend.avatar }} style={styles.friendAvatar} />
    <Text style={styles.friendName}>{friend.username}</Text>
  </View>
);
>>>>>>> 268e4410fa7b2fb0269e341f49fc9de79e764077

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

<<<<<<< HEAD
export default function Profile() {


  const posts = [
    { id: "1", imageUrl: "https://picsum.photos/200/300", description: "Beautiful sunset", height: 300 },
    { id: "2", imageUrl: "https://picsum.photos/200/200", height: 200 },
    { id: "3", imageUrl: "https://picsum.photos/200/400", description: "My new artwork", height: 400 },
    { id: "4", imageUrl: "https://picsum.photos/200/250", height: 250 },
    { id: "5", imageUrl: "https://picsum.photos/200/350", description: "City lights", height: 350 },
    { id: "6", imageUrl: "https://picsum.photos/200/280", height: 280 },
  ];


=======
export default function Profile({ navigation }) {
  const [showAddPostModal, setShowAddPostModal] = useState(true);
>>>>>>> 268e4410fa7b2fb0269e341f49fc9de79e764077
  const [client, setClient] = useState({});
  const findOne = async () => {
    const user = await api.getUserByToken();
    if (!user) {
      console.error("User undifined");
      return;
    }
    try {
      setClient(user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    findOne();
  }, []);

  if (!client) {
    return <Text>Loading...</Text>; // Afficher un message de chargement si `client` est null
  }

  const handleLogout = async () => {
    const isLoggedout = await api.logout();
    if (isLoggedout) {
      navigation.navigate("Login");
    }
  };
  const handleAddPost = () => {
    setShowAddPostModal(true);
  };

  const screenWidth = Dimensions.get("window").width;
  const numColumns = 2;
  const formattedDate = client.createdAt
    ? new Date(client.createdAt).toDateString()
    : "Date inconnue";
  return (
    <>
      <View>
        <AddPost visible={true}/>
      </View>
      <SafeAreaView style={styles.container} visible={false}>
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
            <TouchableOpacity>
              <AddPostIcon
                name="post-add"
                size={35}
                color="#4169E1"
                onPress={handleAddPost}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <DeleteAccountIcon name="delete" size={35} color="#4169E1" />
            </TouchableOpacity>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Account Info</Text>
            <Text style={styles.infoText}>Member since: {formattedDate}</Text>
          </View>
          <View style={styles.friendsSection}>
            <Text style={styles.sectionTitle}>Friends</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {friends.map((friend) => (
                <FriendItem key={friend._id} friend={friend} />
              ))}
            </ScrollView>
          </View>

<<<<<<< HEAD
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Account Info</Text>
          <Text style={styles.infoText}>Member since: {formattedDate}</Text>
        </View>

        <View style={styles.friendsSection}>
          <Text style={styles.sectionTitle}>Friends</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Friends navigation={navigation} userId={client.userId} />
          </ScrollView>
        </View>

        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>Posts</Text>
          <MasonryList 
            posts={posts} 
            numColumns={numColumns} 
            containerWidth={screenWidth - 40} // Accounting for padding
          />
        </View>
      </ScrollView>
    </SafeAreaView>
=======
          <View style={styles.postsSection}>
            <Text style={styles.sectionTitle}>Posts</Text>
            <MasonryList
              posts={posts}
              numColumns={numColumns}
              containerWidth={screenWidth - 40} // Accounting for padding
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
>>>>>>> 268e4410fa7b2fb0269e341f49fc9de79e764077
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
