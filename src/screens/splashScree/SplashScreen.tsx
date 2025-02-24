import React from "react";
import { Text, View } from "react-native";
import styles from "./SplashScreen.style";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Circle behind the text */}
      <View style={styles.circle} />
      {/* Text */}
      <Text style={styles.text}>montra</Text>
    </View>
  );
};

export default SplashScreen;

