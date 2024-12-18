import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

export default function Home() {
  // Simuler des données pour les lives
  const lives = [
    {
      id: 1,
      name: "Live 1",
      user: "Saad Hamdouch",
      avatar:
        "https://img.freepik.com/photos-gratuite/style-sombre-du-ninja-naruto_23-2151278528.jpg?t=st=1734486140~exp=1734489740~hmac=f8c4c760366fc62cbf08efd36579e107ebb0501eea5d187bfdedcdc99f9b45ec&w=740",
    },
    {
      id: 2,
      name: "Live 2",
      user: "John Doe",
      avatar:
        "https://img.freepik.com/photos-premium/conception-t-shirt-art-bande-dessinee_862994-15364.jpg?w=740",
    },
    {
      id: 3,
      name: "Live 3",
      user: "Jane Smith",
      avatar:
        "https://img.freepik.com/photos-gratuite/scene-style-anime-gens-montrant-affection-exterieur-dans-rue_23-2151500144.jpg?t=st=1734486242~exp=1734489842~hmac=51b200deeca78e9e7d9398a106da6ecd9fe33481161cf8926657b2905b3f00d9&w=1060",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>Engage in a discussion on the most compelling topics of your choice</Text>
      </View>
      {lives.map((live) => (
        <ImageBackground source={require("../../assets/images/HERO_MOMEET.png")} key={live.id} style={styles.liveContainer}>
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: live.avatar }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.title}>{live.name}</Text>
              <Text style={styles.user}>{live.user}</Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  descriptionContainer:{
    width: "100%",
    borderWidth: 2,
    height: 400,
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212121"
  },
  description:{
    width: "80%",
    fontFamily: "",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
    color: "white"
  },
  container: {
    flex: 1,
    backgroundColor: "#F3E5F5", // Couleur de fond de la page Home
    padding: 10,
    marginBottom: 10,
    margin: "auto",
    width: "100%",

  },
  liveContainer: {
    width: "100%",
    height: 700,
    borderWidth: 2,
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 10
  },
  card: {
    top: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Ombre sur Android
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  info: {
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A0DAD", // Couleur violette pour le titre
  },
  user: {
    fontSize: 14,
    color: "#555",
  },
});
