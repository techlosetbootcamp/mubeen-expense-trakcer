import React from "react";
import { Text, View } from "react-native";
import styles from "./SplashScreen.style";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Text style={styles.text}>montra</Text>
    </View>
  );
};

export default SplashScreen;

