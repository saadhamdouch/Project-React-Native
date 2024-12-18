import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../../screens/Home/Home";
import Profile from "../../screens/Profile/Profile";
import Friends from "../../screens/Friends/Friends";
import { Ionicons } from "@expo/vector-icons";
import 'react-native-gesture-handler';

// Définir le type pour les noms des routes
type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Friends: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({
            focused,
            color,
            size,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => {
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
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Friends" component={Friends} />
      </Tab.Navigator>
  );
}
