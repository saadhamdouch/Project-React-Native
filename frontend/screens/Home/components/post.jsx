import React, { useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react-native"
import * as api from '../../../services/postService'
import { useSocket } from "@/app/SocketContext"
import Video from "react-native-video";
import { useNavigation } from "@react-navigation/native";

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false); 
  const [isSaved, setIsSaved] = useState(false);
  const [LikesNum, setLikesNum] = useState(0);
  const navigation = useNavigation();

  const { user } = useSocket()

  const handleNavigation = (post, page) => {
      navigation.navigate(page, {
        post
      });
  }

  useEffect(()=>{
    if(post && user !== null ){
        setIsLiked(post?.likes.includes(user._id))
        setIsSaved(post?.saved.includes(user._id))
        setLikesNum(post?.likes?.length)
    }
  },[post , user])

  const handleSavePost = async () => {
    await api.handlesaveApi({ postId: post.postId , userId: user._id })
    setIsSaved((prev) => !prev)
  }

  const handleLike = async () => {
    await api.handleLikeApi({ postId: post.postId , userId: user._id })
    setIsLiked(!isLiked);
    setLikesNum(isLiked ? LikesNum - 1 : LikesNum + 1)
  };

  return (
  <View style={styles.post}>
    <View style={styles.postHeader}>
      <Image source={{ uri: post?.user?.avatar }} style={styles.avatar} />
      <Text style={styles.username}>{post?.user?.name}</Text>
    </View>
    <View style={styles.postImage} >
    {post.image ? (
      <Image source={{ uri: post?.image }} style={styles.postImage} />
      ) : post.video ? (
        <Video
          source={{ uri: post.video }}
          style={styles.video} 
          useNativeControls 
          resizeMode="cover" 
          controls={true} 
          paused={true}
          isLooping 
        />
      ) : (
        <View style={Vediostyles.noMedia}>
          <Text >No media available</Text>
        </View>
    )}
    </View>
    <View style={styles.postActions}>
      <View style={styles.leftActions}>
        <TouchableOpacity onPress={handleLike} >
          <Heart size={24}  color={isLiked ? "red" : "#000"} fill={isLiked ? "red" : "none"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation(post, "CommentsScreen")} >
          <MessageCircle size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Send size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSavePost} >
        <Bookmark size={24} color={isSaved ? "darkgoldenrod" : "#000"} fill={isSaved ? "darkgoldenrod" : "none"} />
      </TouchableOpacity>
    </View>
    <View style={styles.postInfo}>
      <Text style={styles.likes}>{LikesNum} likes</Text>
      <Text style={styles.caption}>
        <Text style={styles.username}>{post?.user?.name}</Text> {post?.caption}
      </Text>
      <Text onPress={() => handleNavigation(post, "CommentsScreen")} style={styles.comments}>View all {post?.comments?.length} comments</Text>
    </View>
  </View>
)}

const styles = StyleSheet.create({
  post: {
    marginBottom: 15,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
  },
  postMedia: { 
    width: "100%", 
    height: 400,  // 🔥 Ajuste selon ton design 
    borderRadius: 8 
  },
  video: {
    width: "100%",
    aspectRatio: 1,
  },
  postImage: {
    backgroundColor: "black",
    width: "100%",
    height: 400,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  leftActions: {
    flexDirection: "row",
    width: 100,
    justifyContent: "space-between",
  },
  postInfo: {
    padding: 10,
  },
  likes: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  caption: {
    marginBottom: 5,
  },
  comments: {
    color: "gray",
  },
})

const Vediostyles = StyleSheet.create({
  postHeader: { padding: 10 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  video: { width: "100%", height: 600, borderRadius: 8 },
  noMedia: {
    width: "100%",
    height: 300,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  username: { marginTop: 5, fontWeight: "bold" },
});

export default Post

