import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Friends from "../../screens/Friends/Friends";
import ChatRoom from "../../screens/Chat/ChatRoom";
import Home from "../../screens/Home/Home";
const FriendsStack = createStackNavigator();

const FriendsNavigation = () => {
  return (
    <FriendsStack.Navigator initialRouteName="Friends">
      <FriendsStack.Screen
        name="Home"
        component={Home}
      />
      <FriendsStack.Screen
        name="Friends"
        component={Friends}
        options={{ title: "My Friends" }}
      />
      <FriendsStack.Screen
        name="Chat"
        component={ChatRoom}
        options={({ route }) => ({
          title: `Chat with ${route.params.friendName}`,
        })}
      />
    </FriendsStack.Navigator>
  );
};

export default FriendsNavigation;
