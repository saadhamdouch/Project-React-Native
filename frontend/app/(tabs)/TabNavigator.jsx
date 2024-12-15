import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../screens/Home/Home';
import ProfileScreen from '../../screens/Profile/Profile';
import Friends from '../../screens/Friends/Friends';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator () {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // Retourne une icône personnalisée
            return <Icon name={iconName} size={20} color={color} />;
          },
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'blue' : 'gray' }}>
              {route.name}
            </Text>
          ),
          tabBarShowIcon: true, // Permet d'afficher les icônes
          tabBarStyle: {
            backgroundColor: 'white',
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Friends" component={Friends} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
