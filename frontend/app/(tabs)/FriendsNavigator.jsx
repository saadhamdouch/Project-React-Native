import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Friends from "../../screens/Friends/Friends";
import ChatRoom from "../../screens/Chat/ChatRoom";
import Home from "../../screens/Home/Home";
import CallPage from "../../screens/Call/CallPage";
import VisitedProfile from "../../screens/VisitedProfile";
import SearchUser from "../../screens/SearchUser";
const FriendsStack = createStackNavigator();

const FriendsNavigation = ({ navigation }) => {
  return (
    <FriendsStack.Navigator initialRouteName="Home">
      <FriendsStack.Screen name="Home" component={Home} />
      <FriendsStack.Screen
        name="Friends"
        component={Friends}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
      <FriendsStack.Screen
        name="Search"
        component={SearchUser}
        options={({ route }) => ({
          // headerShown: false,
          title: `Return to Friends List`,
        })}
      />
      <FriendsStack.Screen
        name="VisitedProfile"
        component={VisitedProfile}
        options={({ route }) => ({
          // headerShown: false,
          title: `Return to Friends List`,
        })}
      />
      <FriendsStack.Screen
        name="Chat"
        component={ChatRoom}
        options={({ route }) => ({
          title: `Chat with ${route.params.friendName}`,
        })}
      />
      <FriendsStack.Screen
        name="CallPage"
        component={CallPage}
        options={({ route }) => ({
          title: `Call with ${route.params.friendName}`,
        })}
      />
    </FriendsStack.Navigator>
  );
};

export default FriendsNavigation;
