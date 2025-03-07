import React from "react";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import styles from "./LineGraph.style";
import useLineGraph from "./useLineGraph";

const { width } = Dimensions.get("window");


const LineGraph: React.FC = () => {
  const { selectedFilter, setSelectedFilter, getFilteredData } = useLineGraph();

  return (
    <>
      <Text style={styles.title}>Spend Frequency</Text>
      <View style={styles.container}>
        <LineChart
          data={getFilteredData(selectedFilter)}
          width={width}
          height={220}
          withDots={false}
          withInnerLines={false}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          chartConfig={{
            backgroundColor: "Transparent",
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 0,
            color: (opacity = 1) => `#7f3dff`,
            style: { borderRadius: 0 },
          }}
          bezier
          style={{
            marginVertical: 8,
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: 0,
            marginRight: 0
          }}
        />

        <View style={styles.filterContainer}>
          {["Today", "Week", "Month", "Year"].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.selectedFilterButton,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.selectedFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

export default LineGraph;