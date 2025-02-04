import React from "react"
import { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { Heart } from "lucide-react-native"
import { getUserById } from "../../services/userService" // Assume this service exists

const Comment = ({ comment, onReply, level = 0 }) => {
  const [showReplies, setShowReplies] = useState(false)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      if (comment.userId) {
        try {
          setLoading(true)
          const currentUser = await getUserById(comment.userId)
          setUser(currentUser || {})
        } catch (error) {
          console.error("Error fetching user data:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchUserData()
  }, [comment.userId])

  return (
    <View style={[styles.container, { marginLeft: level > 0 ? 32 : 0 }]}>
      <View style={styles.avatarContainer}>
        {loading ? (
          <View style={styles.loaderContainer}>{/* Add a loading indicator here */}</View>
        ) : (
          <Image source={{ uri: user?.avatar || "https://via.placeholder.com/40" }} style={styles.avatar} />
        )}
      </View>

      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.username}>{loading ? "Loading..." : user?.username || "Anonymous"}</Text>
          <Text style={styles.commentText}>{comment.text}</Text>
        </View>
        <View style={styles.actionContainer}>
          <Text style={styles.timestamp}>{comment.timestamp || "Unknown time"}</Text>
          {comment.likes > 0 && <Text style={styles.likes}>{comment.likes} likes</Text>}
          <TouchableOpacity onPress={() => onReply(comment._id, user?.username)}>
            <Text style={styles.replyButton}>Reply</Text>
          </TouchableOpacity>
          {comment.replies && comment.replies.length > 0 && (
            <TouchableOpacity onPress={() => setShowReplies(!showReplies)}>
              <Text style={styles.replyButton}>
                {showReplies ? "Hide replies" : `View replies (${comment.replies.length})`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {showReplies &&
          comment.replies &&
          comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onReply={onReply} level={level + 1} />
          ))}
      </View>
      <TouchableOpacity style={styles.likeButton}>
        <Heart size={16} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 16,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  loaderContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  contentContainer: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    marginRight: 8,
  },
  commentText: {
    color: "#1F2937",
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#6B7280",
    marginRight: 12,
  },
  likes: {
    fontSize: 12,
    color: "#6B7280",
    marginRight: 12,
  },
  replyButton: {
    fontSize: 12,
    color: "#6B7280",
    marginRight: 12,
  },
  likeButton: {
    padding: 4,
  },
})

export default Comment

