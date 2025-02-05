import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Image, Alert } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import * as ImagePicker from "expo-image-picker"

const AddPostDialog = ({ visible, onClose, onAddPost }) => {
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [image, setImage] = useState(null)

  const handleAddImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Permission refusée", "L'accès à la galerie est nécessaire pour choisir une image.")
      return
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      })

      if (!result.canceled) {
        setImage(result.assets[0].uri)
      }
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image:", error)
      Alert.alert("Erreur", "Une erreur est survenue lors de la sélection.")
    }
  }

  const handleAddVideo = () => {
    // Implement video selection logic here
    console.log("Add video")
  }

  const handleSubmit = () => {
    const imageName = image ? image.split("/").pop() : null
    onAddPost({ description, tags, image: imageName })
    setDescription("")
    setTags("")
    setImage(null)
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

          {image && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <Text style={styles.imageName}>{image.split("/").pop()}</Text>
            </View>
          )}

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
    maxHeight: "80%",
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
  imagePreviewContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  imagePreview: {
    width: 200,
    height: 150,
    resizeMode: "cover",
    borderRadius: 5,
  },
  imageName: {
    marginTop: 5,
    fontSize: 12,
    color: "#666",
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

