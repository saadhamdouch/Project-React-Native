import { View, Text } from 'react-native';
import React from 'react';
import styles from './tabs.module.css';

export default function Tabs() {
  return (
    <View className={styles.tabsContainer}>
      <Text className={styles.parag}>Bienvenue dans les onglets (Tabs) !</Text>
    </View>
  );
}