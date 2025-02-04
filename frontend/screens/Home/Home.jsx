import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
// import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import * as api from "../../services/userService";
import Post from './components/post'
import * as postApi from '../../services/postService';

const { width, height } = Dimensions.get("window");

export default function Home({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(null);
  const [users , setUsers] = useState([])
  const [error, setError] = useState(null);

  const handleNavigation = (item, page) => {
    const userId = user?._id;
    if (page === "VisitedProfile") {
      navigation.navigate("VisitedProfile", {
        friend: item,
        clientId: userId,
      });
    }
  };

  const fetchUsers = useCallback(async () => {
    try {
      const localUsers = await api.getAllUsers();
      setUsers(localUsers);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError('Unable to fetch users.');
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      const postsData = await postApi.getPosts();
      setPosts(postsData);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setError('Unable to fetch posts.');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchUsers();
      await fetchPosts();
      setLoading(false);
    };
    fetchData();
  }, [fetchUsers, fetchPosts]);

  const isConnexionExpired = async () => {
    const isExpired = await api.checkTokenExpiration();
    if (isExpired) {
      console.log("Token expired");
      navigation.navigate("Login");
    }
  };

  const getUser = async () => {
    try {
      const getUserByToken = await api.getUserByToken();
      setUser(getUserByToken);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    isConnexionExpired();
    fetchPosts();
    getUser();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };
  
  const transformPosts = useCallback(() => {
    if (!users.length || !posts.length) return [];
    return posts.map((post, index) => {
      const user = users.find((user) => user._id === post.userId);
      return {
        id: index + 1,
        postId: post._id,
        user: {
          name: user?.username || 'Unknown',
          avatar: user?.avatar || '/NoProfile.png',
          verified: user?.verified || false,
        },
        video: post.mediaType === 'videos' 
          ? `https://momeetbackend.cleverapps.io/api/${post.imageUrl.replace(/\\/g, '/')}` 
          : null,
        image: post.mediaType === 'images' 
          ? `https://momeetbackend.cleverapps.io/api/${post.imageUrl.replace(/\\/g, '/')}` 
          : null,
        likes: post?.likes,
        saved: post?.saved,
        caption: post.caption || '',
        comments: post.comments,
        timeAgo: post.timeAgo || 'Just now',
      };
    });
  }, [posts, users]);
  
  const transformedPosts = transformPosts();


  const TopBar = () => {
    return (
      <View style={styles.topBar}>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <Icon name="heart" size={24} color="#8e44ad" /> {/* Cœur vide */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Notifications",
                {userId: user._id,}
              );
            }}
          >
            <Icon name="bell" size={24} color="#8e44ad" />{" "}
            {/* Cloche de notification */}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const UsersContain = () => {
    return (
      <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={usersStyles.scrollContainer}
    >
      <View style={usersStyles.userContainer}>
        {users?.map((user, index) => (
          <TouchableOpacity
            onPress={() => handleNavigation(user, "VisitedProfile")}
          >
          <View key={user.id || index} style={usersStyles.userItem}>
            <View style={usersStyles.avatarContainer}>
              <View style={usersStyles.avatarInnerContainer}>
              <Image
                  source={
                    user.avatar 
                      ? { uri: user.avatar } 
                      : require('../../assets/images/profileImage.jpg')
                  }
                  style={usersStyles.avatar}
                  resizeMode="cover"
                />
              </View>
            </View>
            <Text style={usersStyles.username}>
              {user.username.length > 11 ? `${user.username.substring(0, 11)}..` : user.username}
            </Text>
          </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
    );
  };


  return (
    <View style={styles.container}>
      <TopBar />
      <FlatList
        data={[{ type: "users" }, ...transformedPosts]} // Ajout d'un élément spécial pour UsersContain
        renderItem={({ item }) =>
          item.type === "users" ? <UsersContain /> : <Post post={item} />
        }
        keyExtractor={(item, index) => item.id || `users-${index}`} // Clé unique
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 10,
  },
  liveList: {
    marginBottom: 20,
  },
  liveItem: {
    alignItems: "center",
    marginRight: 15,
  },
  liveAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  liveName: {
    fontSize: 12,
    fontWeight: "bold",
  },
  liveUser: {
    fontSize: 10,
    color: "#666",
  },
  postContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 14,
    color: "#666",
  },

  /**
   * ----- design for the top bar -----
   */
  topBar: {
    width: "100%",
    backgroundColor: "rgba(169, 169, 169, 0.3)", // Gris clair avec transparence
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  iconsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 20,
  },
});


const usersStyles = StyleSheet.create({
  scrollContainer: {
    marginTop: 50,
    marginBottom: 8,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 110,
    spaceX: 5, // Pour React Native, on utilise `margin` entre les éléments au lieu de `space-x`.
  },
  userItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10, // Remplacement pour space-x
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    padding: 1,
    backgroundColor: 'linear-gradient(45deg, purple, pink, orange)', // Linear gradients nécessitent des bibliothèques comme react-native-linear-gradient.
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInnerContainer: {
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 0.5,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  username: {
    fontSize: 12,
    fontWeight: '500',
    color: 'gray',
    marginTop: 4,
  },
});
