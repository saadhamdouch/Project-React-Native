import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationsScreen from "../../screens/Notifications"; // Importe ton écran de notifications
import HomeScreen from "../../screens/Home/Home"; // Importe ton écran d'accueil
import VisitedProfileScreen from "../../screens/VisitedProfile";
import ChatRoom from "@/screens/Chat/ChatRoom";
import CallPage from "../../screens/Call/CallPage";
import PostDetails from "../../screens/PostDetailes/CommentsScreen"
import Liked from "../../screens/Liked/LikedPage"

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
      <Stack.Screen
        name="Chat"
        component={ChatRoom}
        options={({ route }) => ({
          title: `Chat with ${route.params.friendName}`,
        })}
      />
      <Stack.Screen
        name="CallPage"
        component={CallPage}
        options={({ route }) => ({
          title: `Call with ${route.params.friendName}`,
        })}
      />
      <Stack.Screen
        name="CommentsScreen"
        component={PostDetails}
        options={({ route }) => ({
          title: `  return `,
        })}
      />
      <Stack.Screen
        name="Liked"
        component={Liked}
        options={({ route }) => ({
          title: `  return `,
        })}
      />
    </Stack.Navigator>
  );
};

export default InteractionsNavigator;
