import React from "react";
import AppNavigator from "./AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-url-polyfill/auto";

export default function Layout() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
