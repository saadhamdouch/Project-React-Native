import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../../screens/Home/Home";
import Profile from "../../screens/Profile/Profile";
import Friends from "../../screens/Friends/Friends";
import FriendsStack from "./FriendsNavigator";
import ProfileStack from "./ProfileNavigator";
import { Ionicons } from "@expo/vector-icons";
import "react-native-gesture-handler";
import InteractionsStack from "./InteractionsNavigator";
import io from "socket.io-client";

const urlDeployed = "https://confastservice.onrender.com";
const url = "http://localhost:8080";
const socket = io(urlDeployed, {
  path: "/chat",
  transports: ["websocket"],
});

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Se connecter au serveur
    socket.on("connection", () => {
      console.log("Connecté au socket serveur");
      setUserId(socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "#6A0DAD", // Couleur du header (violet dans ton cas)
        },
        headerTintColor: "#fff", // Couleur du texte du header
        tabBarStyle: {
          backgroundColor: "#E2E2E2", // Couleur de la tabulation
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Friends") {
            iconName = focused ? "people" : "people-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={InteractionsStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen
        name="Friends"
        component={FriendsStack}
        initialParams={{ screen: "Friends" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
