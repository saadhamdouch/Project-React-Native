import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from "react-native";

export default function Profile() {
  const [profileInfo, setProfileInfo] = useState({
    firstName: "",
    lastName: "",
    adresse: "",
    contact: "",
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setProfileInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Données du formulaire:", profileInfo);
    // Envoi des données ou autres actions
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mise à jour du profil</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={profileInfo.firstName}
        onChangeText={(text) => handleChange("firstName", text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={profileInfo.lastName}
        onChangeText={(text) => handleChange("lastName", text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={profileInfo.adresse}
        onChangeText={(text) => handleChange("adresse", text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contact"
        value={profileInfo.contact}
        onChangeText={(text) => handleChange("contact", text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={profileInfo.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={profileInfo.password}
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
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
    backgroundColor: "#4CAF50", // Vert agréable
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
    color: "#fff",
    fontWeight: "bold",
  },
});
