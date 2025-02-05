import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as api from "../../services/userService";

export default function Hero() {
  const navigation = useNavigation();
  const chooseNavigationScreen = async () => {
    const token = await api.getToken();
    if (token && token.length > 0) {
      const connectWithToken = async () => {
        const client = await api.getUserByToken(token);
        if (client) {
          navigation.navigate("Tabs");
        } else {
          console.log("no user found");
          navigation.navigate("Login");
        }
      };
      connectWithToken();
    } else {
      console.log("no token found");
      navigation.navigate("Login");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/blackBackground.png")}
      style={styles.heroContainer}
    >
      {/* Slogan */}
      <View style={styles.slogan}>
        <Image
          style={styles.Logo}
          source={require("../../assets/images/Logo_description.png")}
        />
      </View>

      {/* Image principale */}
      <ImageBackground
        source={require("../../assets/images/HERO_MOMEET.png")}
        style={styles.imageHero}
      />

      {/* Liste des fonctionnalités */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#db4cdb" /> Simple
          Meetings, Lasting Moments
        </Text>
        <Text style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#db4cdb" /> Where
          Connections Happen
        </Text>
        <Text style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#db4cdb" /> Create
          Moments, Connect People
        </Text>
        <Text style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#db4cdb" />{" "}
          Bringing People Together
        </Text>
        <Text style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#db4cdb" /> video
          call
        </Text>
      </View>

      {/* Bouton Start Now */}
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.buttonText} onPress={chooseNavigationScreen}>
          ✨ Start Now
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
  },
  slogan: {
    marginTop: 60,
    alignItems: "center",
  },
  Logo: {
    width: "60%",
    height: "100",
    position: "absolute",
    zIndex: 10,
  },
  imageHero: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    marginTop: 20,
  },
  featuresContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    bottom: -20,
    width: "100%",
    padding: 10,
    height: "40%",
    marginVertical: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  featureItem: {
    marginLeft: 20,
    color: "white",
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  startButton: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "purple",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 30,
    shadowColor: "#e57fe5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
