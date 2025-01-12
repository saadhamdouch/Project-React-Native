import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as api from "../../services/userService";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";

export default function SignUp() {
  const [avatar, setAvatar] = useState("");
  const navigation = useNavigation();

  const pickImage = async (setFieldValue) => {
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
        setAvatar(result.assets[0].uri);
        setFieldValue("avatar", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la sélection.");
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Le nom d'utilisateur est requis"),
    adresse: Yup.string().required("L'adresse est requise"),
    email: Yup.string()
      .email("Entrez une adresse email valide")
      .required("L'email est requis"),
    password: Yup.string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .required("Le mot de passe est requis"),
    avatar: Yup.string(),
  });

  const handleSubmit = async (values) => {
    try {
      if (values.avatar) {
        const avatarPath = await api.uploadImage(values.avatar);
        if (avatarPath) {
          values.avatar = avatarPath;
        }
      }

      const response = await api.createUser(values);
      if (response.success) {
        Alert.alert("Succès", "Utilisateur créé avec succès.");
        if (response.client) {
          await api.storeToken(response.token);
          navigation.navigate("Tabs");
        }
      } else {
        Alert.alert(
          "Erreur",
          "Une erreur est survenue lors de la création de l'utilisateur."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        adresse: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text style={styles.header}>Sign Up</Text>

          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => pickImage(setFieldValue)}
          >
            <Image
              source={
                avatar
                  ? { uri: avatar }
                  : require("../../assets/images/profileImage.jpg")
              }
              style={styles.avatar}
            />
          </TouchableOpacity>
          {errors.avatar && touched.avatar && (
            <Text style={styles.error}>{errors.avatar}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
          />
          {errors.username && touched.username && (
            <Text style={styles.error}>{errors.username}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Adresse"
            value={values.adresse}
            onChangeText={handleChange("adresse")}
            onBlur={handleBlur("adresse")}
          />
          {errors.adresse && touched.adresse && (
            <Text style={styles.error}>{errors.adresse}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
          />
          {errors.email && touched.email && (
            <Text style={styles.error}>{errors.email}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            secureTextEntry
          />
          {errors.password && touched.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f9",
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
    elevation: 3,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4169E1",
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
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
});
