import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as api from '../../services/userService';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const isConnexionExpired = async () => {
    const isExpired = await api.checkTokenExpiration();
    if (isExpired) {
      console.log('Token expired');
      navigation.navigate('Login');
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await api.getPosts();
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    isConnexionExpired();
    fetchPosts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

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

  // const renderLiveItem = ({ item }) => (
  //   <TouchableOpacity style={styles.liveItem}>
  //     <Image source={{ uri: item.avatar }} style={styles.liveAvatar} />
  //     <Text style={styles.liveName}>{item.name}</Text>
  //     <Text style={styles.liveUser}>{item.user}</Text>
  //   </TouchableOpacity>
  // );

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
          ListHeaderComponent={() => (
            <View>
              <Text style={styles.sectionTitle}>Posts</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
  },
  liveList: {
    marginBottom: 20,
  },
  liveItem: {
    alignItems: 'center',
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
    fontWeight: 'bold',
  },
  liveUser: {
    fontSize: 10,
    color: '#666',
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 14,
    color: '#666',
  },
})