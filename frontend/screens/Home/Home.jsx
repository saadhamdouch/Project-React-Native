import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as api from "../../services/postService"; // API service for fetching posts
const { width, height } = Dimensions.get("window");

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await api.getPosts(); // API call to get posts
      setPosts(response.data.data); // Set posts data
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, []);

  // Render a single post
  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
        <Text style={styles.authorName}>{item.author.username}</Text>
      </View>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}


//styles 