import React from "react"
import { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, StyleSheet, Dimensions } from "react-native"
import { Heart, MessageCircle, Bookmark, X, Share2 } from "lucide-react-native"
import Comment from "./Comment"
import axios from "axios"
import Video from "react-native-video" // Import Video component
import { useSocket } from "@/app/SocketContext"
import { useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window")

const insertComment = async (commentData) => {
  const response = await axios.post("https://momeetbackend.cleverapps.io/api/posts/comment", commentData)
  return response.data
}

const insertReply = async (commentData) => {
  const response = await axios.post("https://momeetbackend.cleverapps.io/api/posts/comment/reply", commentData)
  return response.data
}

const PostDetails = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState({
    id: null,
    username: null,
  })
  const { user } = useSocket()
  const route = useRoute();

  const { data } = route.params;

  useEffect(() => {
    console.log(data)
    setComments(data?.comments)
  }, [data])

  const handleAddComment = async () => {
    if (newComment.trim() === "") return

    const newCommentObj = {
      id: Date.now(),
      userId: user._id,
      text: newComment,
      likes: 0,
      timestamp: "Just now",
      replies: [],
    }

    const commentData = {
      postId: data.postId,
      comment: {
        userId: user._id,
        text: newComment,
        likes: 0,
      },
    }

    if (replyingTo.id !== null) {
      const reply = {
        postId: commentData.postId,
        commentId: replyingTo.id,
        reply: commentData.comment,
      }
      await insertReply(reply)
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment._id === replyingTo.id) {
            return { ...comment, replies: [newCommentObj, ...comment.replies] }
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyingTo.id ? { ...reply, replies: [newCommentObj, ...reply.replies] } : reply,
              ),
            }
          }
          return comment
        }),
      )
      setReplyingTo({ id: null, username: null })
    } else {
      await insertComment(commentData)
      setComments((prevComments) => [newCommentObj, ...prevComments])
    }

    setNewComment("")
  }

  const handleReply = (parentId, replyToUsername) => {
    setReplyingTo({ id: parentId, username: replyToUsername })
    setNewComment(`@${replyToUsername} `)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: data.userAvatar }} style={styles.avatar} />
          <View>
            <Text style={styles.username}>{data.username}</Text>
            {data.location && <Text style={styles.location}>{data.location}</Text>}
          </View>
        </View>
      </View>

      <View style={styles.mediaContainer}>
        {data.image ? (
          <Image source={{ uri: data.image }} style={styles.media} resizeMode="contain" />
        ) : data.video ? (
          <Video source={{ uri: data.video }} style={styles.media} resizeMode="contain" useNativeControls isLooping />
        ) : (
          <View style={styles.noMedia}>
            <Text style={styles.noMediaText}>No media available</Text>
          </View>
        )}
      </View>

      <FlatList
        data={comments}
        renderItem={({ item }) => <Comment comment={item} onReply={handleReply} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View style={styles.captionContainer}>
            <Image source={{ uri: data.user.avatar }} style={styles.smallAvatar} />
            <View>
              <Text>
                <Text style={styles.username}>{data.user.name}</Text>
              </Text>
              <Text style={styles.timestamp}>{data.caption}</Text>
            </View>
          </View>
        )}
      />

      {/* <View style={styles.actionsContainer}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={handleLike}>
            <Heart size={24} color={isLiked ? "#EF4444" : "#1F2937"} fill={isLiked ? "#EF4444" : "none"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MessageCircle size={24} color="#1F2937" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Share2 size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
          <Bookmark size={24} color="#1F2937" fill={isSaved ? "#1F2937" : "none"} />
        </TouchableOpacity>
      </View> */}

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          value={newComment}
          onChangeText={setNewComment}
          placeholder={replyingTo.id ? `Reply to ${replyingTo.username}...` : "Add a comment..."}
        />
        <TouchableOpacity onPress={handleAddComment}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 0,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontWeight: "bold",
  },
  location: {
    fontSize: 12,
    color: "#6B7280",
  },
  mediaContainer: {
    width: width,
    height: '350px',
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    width: "100%",
    height: "100%",
  },
  noMedia: {
    justifyContent: "center",
    alignItems: "center",
  },
  noMediaText: {
    color: "#9CA3AF",
  },
  captionContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  timestamp: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  leftActions: {
    flexDirection: "row",
    gap: 16,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  postButton: {
    color: "#3B82F6",
    fontWeight: "bold",
  },
})

export default PostDetails

