import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import * as api from "../../services/userService";

export default function Login() {
  const navigation = useNavigation();

  // const isUserLoggedIn = async () => {
  //   const token = await api.getToken();
  //   if (token) {
  //     console.log("already logged in");
  //     navigation.navigate("Tabs");
  //   }
  // };

  //   useEffect(() => {
  //     isUserLoggedIn();
  //   }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Entrez une adresse email valide")
      .required("L'email est requis"),
    password: Yup.string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .required("Le mot de passe est requis"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("values:", values);
        const response = await api.loginUser(values);
        if (response.ok) {
          await api.storeToken(response.token);
          navigation.navigate("Tabs");
        } else {
          Alert.alert(
            "Erreur",
            "Une erreur est survenue lors de la connexion."
          );
        }
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        Alert.alert("Erreur", "Une erreur est survenue lors de la connexion.");
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenue</Text>
      <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: 350, backgroundColor: "#f5f3ff"}}>
        <Image
          style={styles.Logo}
          source={require("../../assets/images/loginImage.png")}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#ccc"
      />
      {formik.errors.email && formik.touched.email && (
        <Text style={styles.error}>{formik.errors.email}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        secureTextEntry
        placeholderTextColor="#ccc"
        autoCapitalize="none"
      />
      {formik.errors.password && formik.touched.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signupLink}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.signupLinkText}>Pas de compte ? S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f3ff", // Blanc avec une légère touche de violet
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4f46e5", // Bleu-violet
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffffff", // Blanc pur
    borderColor: "#a78bfa", // Violet clair
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 15,
    marginVertical: 10,
    fontSize: 16,
    color: "#333", // Gris foncé pour le texte
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4f46e5", // Bleu-violet
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 20,
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  error: {
    color: "#ef4444", // Rouge pour l'erreur
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  signupLink: {
    marginTop: 20,
  },
  signupLinkText: {
    color: "#6366f1", // Bleu clair avec une touche de violet
    fontSize: 16,
    fontWeight: "600",
  },
  Logo: {
     width: "100%",
     height: "100%",
  }
});
