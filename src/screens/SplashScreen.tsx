import React from "react";
import { StyleSheet, Text, View } from "react-native";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7f3dff",
  },
  circle: {
    position: "absolute",
    width: 80,
    height: 80,
    backgroundColor: "#e54eff", // Semi-transparent white for glow effect
    borderRadius: 100, // Makes it a perfect circle
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
  },
});
