import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationsScreen from "../../screens/Notifications"; // Importe ton écran de notifications
import HomeScreen from "../../screens/Home/Home"; // Importe ton écran d'accueil
import VisitedProfileScreen from "../../screens/VisitedProfile";
import VisitedProfile from "@/screens/VisitedProfile";

const Stack = createStackNavigator();

const InteractionsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={({ navigation }) => ({
          title: `return to Home`,
        })}
      />
      <Stack.Screen
        name="VisitedProfile"
        component={VisitedProfileScreen}
        options={({ navigation }) => ({
          // headerShown: false,
          title: `Return to Notifications`,
        })}
      />
    </Stack.Navigator>
  );
};

export default InteractionsNavigator;
