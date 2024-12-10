import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Home, Hero} from "../../screens";
import Friends from '../../screens/Friends/Friends';
import Profile from '../../screens/Profile/Profile'
import { Header } from "react-native/Libraries/NewAppScreen";
// import Hero from "../../assets"
const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Friends" component={Friends} />
      <Tab.Screen name="Profile" component={Profile}/>
      <Tab.Screen name="Hero" component={Hero}/>
    </Tab.Navigator>
  );
}
