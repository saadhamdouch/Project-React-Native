import React from "react";
import AppNavigator from "./AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { SocketProvider } from "./SocketContext";
import "react-native-url-polyfill/auto";

export default function Layout() {
  return (
    <SocketProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SocketProvider>
  );
}
