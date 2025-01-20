import React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

const LineGraph: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Spend Frequency</Text>
        <LineChart
          data={{
            labels: ["Today", "Week", "Month", "Year"],
            datasets: [
              {
                data: [50, 80, 40, 100],
              },
            ],
          }}
          width={Dimensions.get("window").width - 40}
          height={200}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "white",
            backgroundGradientFrom: "#faf7ff",
            backgroundGradientTo: "#faf7ff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(127, 61, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              stroke: "#EAEAEA",
            },
            propsForDots: {
              r: "0",
              strokeWidth: "2",
              stroke: "#7F3DFF",
              fill: "#ffffff",
            },
            fillShadowGradient: "#e5d9ff",
            fillShadowGradientOpacity: 0.2,
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 0,
          }}
        />
      </View>
    </>
  );
};

export default LineGraph;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#fff",
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 25,
    justifyContent: "flex-start",
  },
});
