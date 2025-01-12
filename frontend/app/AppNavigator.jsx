import React from "react";
import Hero from "../screens/Hero/Hero";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import TabNavigator from "./(tabs)/TabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Hero">
    <Stack.Screen
      name="Hero"
      component={Hero}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Tabs"
      component={TabNavigator}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
