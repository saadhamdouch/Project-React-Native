<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useEffect } from "react";
>>>>>>> 268e4410fa7b2fb0269e341f49fc9de79e764077
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
<<<<<<< HEAD
import * as api from "../../services/postService"; // API service for fetching posts
const { width, height } = Dimensions.get("window");

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
=======
import { useNavigation } from "@react-navigation/native";
import * as api from "../../services/userService";

// Obtenir les dimensions de l'écran pour ajuster la hauteur
const { width, height } = Dimensions.get("window");

export default function Home() {
  const navigation = useNavigation();
  const isConnexionExpired = async () => {
      const isExpired = await api.checkTokenExpiration();
      if (isExpired) {
        console.log("Token expired");
        navigation.navigate("Login");
      }
    };
  useEffect(() => {
    isConnexionExpired();
  }, []);

  const lives = [
    {
      id: 1,
      name: "Live 1",
      user: "Saad Hamdouch",
      avatar:
        "https://img.freepik.com/photos-gratuite/style-sombre-du-ninja-naruto_23-2151278528.jpg?t=st=1734486140~exp=1734489740~hmac=f8c4c760366fc62cbf08efd36579e107ebb0501eea5d187bfdedcdc99f9b45ec&w=740",
    },
    {
      id: 2,
      name: "Live 2",
      user: "John Doe",
      avatar:
        "https://img.freepik.com/photos-premium/conception-t-shirt-art-bande-dessinee_862994-15364.jpg?w=740",
    },
    {
      id: 3,
      name: "Live 3",
      user: "Jane Smith",
      avatar:
        "https://img.freepik.com/photos-gratuite/scene-style-anime-gens-montrant-affection-exterieur-dans-rue_23-2151500144.jpg?t=st=1734486242~exp=1734489842~hmac=51b200deeca78e9e7d9398a106da6ecd9fe33481161cf8926657b2905b3f00d9&w=1060",
    },
  ];
>>>>>>> 268e4410fa7b2fb0269e341f49fc9de79e764077

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