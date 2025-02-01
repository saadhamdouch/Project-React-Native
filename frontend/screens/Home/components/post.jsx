import React from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react-native"

const Post = ({ post }) => (
  <View style={styles.post}>
    <View style={styles.postHeader}>
      <Image source={{ uri: post?.user?.avatar }} style={styles.avatar} />
      <Text style={styles.username}>{post?.user?.name}</Text>
    </View>
    <Image source={{ uri: post?.image }} style={styles.postImage} />
    <View style={styles.postActions}>
      <View style={styles.leftActions}>
        <TouchableOpacity>
          <Heart size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MessageCircle size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Send size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Bookmark size={24} color="#000" />
      </TouchableOpacity>
    </View>
    <View style={styles.postInfo}>
      <Text style={styles.likes}>{post?.likes} likes</Text>
      <Text style={styles.caption}>
        <Text style={styles.username}>{post?.user?.name}</Text> {post?.caption}
      </Text>
      <Text style={styles.comments}>View all {post?.comments} comments</Text>
    </View>
  </View>
)

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
  postImage: {
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

export default Post

