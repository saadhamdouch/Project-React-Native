import { useState, useRef } from "react"
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import { useRoute } from "@react-navigation/native"

const SCREEN_WIDTH = Dimensions.get("window").width

const SAMPLE_COMMENTS = [
  { id: "1", user: "johndoe", text: "Great photo! 😍", likes: 5, time: "2h", replies: [] },
  {
    id: "2",
    user: "janedoe",
    text: "Amazing view!",
    likes: 3,
    time: "1h",
    replies: [{ id: "2.1", user: "mike123", text: "Totally agree!", likes: 1, time: "30m" }],
  },
  { id: "3", user: "mike123", text: "Where is this?", likes: 1, time: "30m", replies: [] },
]

export default function InstagramCommentPage() {
  const [comments, setComments] = useState(SAMPLE_COMMENTS)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState(null)
  const flatListRef = useRef(null)

  const route = useRoute()
  const { post } = route.params

  const addComment = () => {
    if (newComment.trim() !== "") {
      if (replyingTo) {
        const updatedComments = comments.map((comment) => {
          if (comment.id === replyingTo) {
            return {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: `${comment.id}.${comment.replies.length + 1}`,
                  user: "currentuser",
                  text: newComment.trim(),
                  likes: 0,
                  time: "Just now",
                },
              ],
            }
          }
          return comment
        })
        setComments(updatedComments)
        setReplyingTo(null)
      } else {
        const newCommentObj = {
          id: String(comments.length + 1),
          user: "currentuser",
          text: newComment.trim(),
          likes: 0,
          time: "Just now",
          replies: [],
        }
        setComments([newCommentObj, ...comments])
      }
      setNewComment("")
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
    }
  }

  const renderReply = ({ item }) => (
    <View style={styles.replyContainer}>
      <Image source={{ uri: `https://i.pravatar.cc/150?u=${item.user}` }} style={styles.replyAvatar} />
      <View style={styles.replyContent}>
        <Text>
          <Text style={styles.commentUser}>{item.user}</Text> <Text style={styles.commentText}>{item.text}</Text>
        </Text>
        <View style={styles.commentActions}>
          <Text style={styles.commentTime}>{item.time}</Text>
          <Text style={styles.commentLikes}>{item.likes} likes</Text>
          <TouchableOpacity>
            <Text style={styles.replyButton}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.likeButton}>
        <Feather name="heart" size={12} color="#8E8E8E" />
      </TouchableOpacity>
    </View>
  )

  const renderComment = ({ item }) => (
    <View>
      <View style={styles.commentContainer}>
        <Image source={{ uri: `https://i.pravatar.cc/150?u=${item.user}` }} style={styles.avatar} />
        <View style={styles.commentContent}>
          <Text>
            <Text style={styles.commentUser}>{item.user}</Text> <Text style={styles.commentText}>{item.text}</Text>
          </Text>
          <View style={styles.commentActions}>
            <Text style={styles.commentTime}>{item.time}</Text>
            <Text style={styles.commentLikes}>{item.likes} likes</Text>
            <TouchableOpacity onPress={() => setReplyingTo(item.id)}>
              <Text style={styles.replyButton}>Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.likeButton}>
          <Feather name="heart" size={12} color="#8E8E8E" />
        </TouchableOpacity>
      </View>
      {item.replies.map((reply) => renderReply({ item: reply }))}
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Comments</Text>
        <TouchableOpacity>
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <FlatList
          ref={flatListRef}
          ListHeaderComponent={() => (
            <Image source={{ uri: post?.image }} style={styles.postImage} resizeMode="contain" />
          )}
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id}
          style={styles.commentList}
        />

        <View style={styles.commentInputContainer}>
          <Image source={{ uri: "https://i.pravatar.cc/150?u=currentuser" }} style={styles.currentUserAvatar} />
          <TextInput
            style={styles.commentInput}
            placeholder={replyingTo ? "Reply to comment..." : "Add a comment..."}
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity onPress={addComment}>
            <Text style={[styles.postButton, newComment.trim() ? styles.postButtonActive : {}]}>Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#DBDBDB",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  postImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    backgroundColor: "black",
  },
  commentList: {
    flex: 1,
  },
  commentContainer: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#EFEFEF",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    fontWeight: "600",
    marginRight: 5,
  },
  commentText: {
    color: "#262626",
  },
  commentActions: {
    flexDirection: "row",
    marginTop: 4,
    alignItems: "center",
  },
  commentTime: {
    color: "#8E8E8E",
    fontSize: 12,
    marginRight: 8,
  },
  commentLikes: {
    color: "#8E8E8E",
    fontSize: 12,
    marginRight: 8,
  },
  replyButton: {
    color: "#8E8E8E",
    fontSize: 12,
    fontWeight: "600",
  },
  likeButton: {
    padding: 4,
  },
  replyContainer: {
    flexDirection: "row",
    padding: 12,
    paddingLeft: 44,
    borderBottomWidth: 0.5,
    borderBottomColor: "#EFEFEF",
  },
  replyAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
  },
  replyContent: {
    flex: 1,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 0.5,
    borderTopColor: "#DBDBDB",
    backgroundColor: "white",
  },
  currentUserAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentInput: {
    flex: 1,
    fontSize: 14,
    color: "#262626",
  },
  postButton: {
    color: "#0095F6",
    fontWeight: "600",
    opacity: 0.5,
  },
  postButtonActive: {
    opacity: 1,
  },
})

