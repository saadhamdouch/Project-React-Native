import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Friends from "../../screens/Friends/Friends";
import Profile from "../../screens/Profile/Profile";
import Home from "../../screens/Home/Home";
import CallPage from "../../screens/Call/CallPage";
import VisitedProfile from "../../screens/VisitedProfile";
import ChatRoom from "@/screens/Chat/ChatRoom";

const ProfileStack = createStackNavigator();

const ProfileNavigation = () => {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen name="Home" component={Home} />
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="VisitedProfile"
        component={VisitedProfile}
        options={({ route }) => ({
          // headerShown: false,
          title: `Return to My Profile`,
        })}
      />
      <ProfileStack.Screen
        name="Chat"
        component={ChatRoom}
        options={({ route }) => ({
          title: `Chat with ${route.params.friendName}`,
        })}
      />
      <ProfileStack.Screen
        name="CallPage"
        component={CallPage}
        options={({ route }) => ({
          title: `Call with ${route.params.friendName}`,
        })}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigation;
