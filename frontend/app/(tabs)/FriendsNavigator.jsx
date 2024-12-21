import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Friends from "../../screens/Friends/Friends";
import ChatRoom from "../../screens/Chat/ChatRoom";

const FriendsStack = createStackNavigator();

const FriendsNavigation = () => {
  return (
    <FriendsStack.Navigator>
      <FriendsStack.Screen
        name="Friends"
        component={Friends}
        options={{ title: "My Friends" }}
      />
      <FriendsStack.Screen
        name="Chat"
        component={ChatRoom}
        options={({ route }) => ({
          title: `Chat avec ${route.params.friendName}`,
        })}
      />
    </FriendsStack.Navigator>
  );
};

export default FriendsNavigation;
