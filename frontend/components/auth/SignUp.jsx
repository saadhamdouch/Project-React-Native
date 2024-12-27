import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import * as api from "../../services/userService";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { useNavigation } from "expo-router";
export default function SignUp() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    adresse: "",
    contact: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = (name, value) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigation = useNavigation();

  const handleSubmit = async () => {
    console.log("Données du formulaire:", userInfo);
    try {
      const response = await api.createUser(userInfo);
      if (response) {
        console.log(response.data);
        Alert.alert("Succès", "Utilisateur créé avec succès.");
      } else {
        Alert.alert(
          "Erreur",
          "Une erreur est survenue lors de la création de l'utilisateur."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
    }
    // navigation.navigate("Profile", { user: userInfo });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission refusée",
        "L'accès à la galerie est nécessaire pour choisir une image."
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setUserInfo((prevState) => ({
          ...prevState,
          avatar: result.assets[0].uri,
        }));
      }
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la sélection.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        <Image
          source={
            userInfo.avatar
              ? { uri: userInfo.avatar }
              : require("../../assets/images/profileImage.jpg")
          }
          style={styles.avatar}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userInfo.username}
        onChangeText={(text) => handleChange("username", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={userInfo.adresse}
        onChangeText={(text) => handleChange("adresse", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Contact"
        value={userInfo.contact}
        onChangeText={(text) => handleChange("contact", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userInfo.email}
        onChangeText={(text) => handleChange("email", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={userInfo.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f9", // Couleur d'arrière-plan claire
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#4169E1",
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  avatarPlaceholder: {
    color: "gray",
    textAlign: "center",
    fontSize: 14,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginVertical: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Pour l'ombre sur Android
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4169E1", // Vert agréable
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
