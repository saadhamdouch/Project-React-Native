import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Hero() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../assets/images/blackBackground.png")}
      style={styles.heroContainer}
    >
      {/* Slogan */}
      <View style={styles.slogan}>
        <Text style={styles.Logo}>MoMeet</Text>
        <Text style={styles.description}>Connect, Chat and Enjoy video call</Text>
      </View>

      {/* Image principale */}
      <ImageBackground
        source={require("../../assets/images/HERO_MOMEET.png")}
        style={styles.imageHero}
      />

      {/* Liste des fonctionnalités */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#db4cdb" /> Simple Meetings, Lasting Moments
        </Text>
        <Text style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#db4cdb" /> Where Connections Happen
        </Text>
        <Text style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#db4cdb" /> Create Moments, Connect People
        </Text>
        <Text style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#db4cdb" /> Bringing People Together
        </Text>
        <Text style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#db4cdb" /> video call
        </Text>
      </View>

      {/* Bouton Start Now */}
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.buttonText}
        onPress={() => navigation.navigate("Tabs")}
        >✨ Start Now</Text>
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
    fontWeight: "700",
    fontSize: 30,
    color: "#db4cdb",
  },
  description: {
    fontSize: 15,
    fontWeight: "500",
    color: "white",
    marginTop: 5,
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
    bottom: 0,
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
