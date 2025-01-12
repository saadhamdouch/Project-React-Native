import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as api from "../../services/userService";

// Obtenir les dimensions de l'écran pour ajuster la hauteur
const { width, height } = Dimensions.get("window");

export default function Home() {
  const navigation = useNavigation();
  const isConnexionExpired = async () => {
      const isExpired = await api.checkTokenExpiration();
      if (isExpired) {
        console.log("Token expired");
        navigation.navigate("Login");
      }
    };
  useEffect(() => {
    isConnexionExpired();
  }, []);

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

  const renderItem = ({ item }) => (
    <ImageBackground
      source={require("../../assets/images/HERO_MOMEET.png")}
      style={styles.liveContainer}
    >
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri:item.avatar }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.user}>{item.user}</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Engage in a discussion on the most compelling topics of your choice
        </Text>
      </View> */}
      <FlatList
        data={lives}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        snapToInterval={height - 100} // S'arrête automatiquement à chaque élément
        decelerationRate="fast" // Réduit la vitesse pour un défilement fluide
        showsVerticalScrollIndicator={false}
        pagingEnabled // Ajout pour verrouiller le défilement
      />
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionContainer: {
    width: "100%",
    borderWidth: 2,
    height: 100,
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212121",
  },
  description: {
    width: "80%",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#F3E5F5",
  },
  liveContainer: {
    width: width,
    height: height - 100, // Ajuste la hauteur pour chaque élément
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    position: "absolute",
    top: 0,
    width: "95%",
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
    color: "#6A0DAD",
  },
  user: {
    fontSize: 14,
    color: "#555",
  },
});
