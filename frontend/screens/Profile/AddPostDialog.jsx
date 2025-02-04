import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

const AddPostDialog = ({ visible, onClose, onAddPost }) => {
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")

  const handleAddImage = () => {
    // Implement image selection logic here
    console.log("Add image")
  }

  const handleAddVideo = () => {
    // Implement video selection logic here
    console.log("Add video")
  }

  const handleSubmit = () => {
    onAddPost({ description, tags })
    setDescription("")
    setTags("")
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.dialogContainer}>
          <Text style={styles.title}>Add New Post</Text>

          <TouchableOpacity style={styles.mediaButton} onPress={handleAddImage}>
            <Icon name="image" size={24} color="#4169E1" />
            <Text style={styles.mediaButtonText}>Add Image</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mediaButton} onPress={handleAddVideo}>
            <Icon name="videocam" size={24} color="#4169E1" />
            <Text style={styles.mediaButtonText}>Add Video</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <TextInput style={styles.input} placeholder="Tags (comma-separated)" value={tags} onChangeText={setTags} />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
              <Text style={[styles.buttonText, styles.submitButtonText]}>Add Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dialogContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  mediaButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  mediaButtonText: {
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
  },
  submitButton: {
    backgroundColor: "#4169E1",
  },
  buttonText: {
    textAlign: "center",
  },
  submitButtonText: {
    color: "white",
  },
})

export default AddPostDialog

