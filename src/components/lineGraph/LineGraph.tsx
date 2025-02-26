import React from "react";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import styles from "./LineGraph.style";
import useLineGraph from "./useLineGraph";
import { useAppSelector } from "../../store/store";

const { width } = Dimensions.get("window");

const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  PKR: "₨",
  JPY: "¥",
};

const LineGraph: React.FC = () => {
  const { selectedFilter, setSelectedFilter, getFilteredData } = useLineGraph();
  const selectedCurrency = useAppSelector((state: any) => state.user.selectedCurrency);
  const currencySymbol = currencySymbols[selectedCurrency] || selectedCurrency;

  return (
    <>
      <Text style={styles.title}>Spend Frequency</Text>
      <View style={styles.container}>
        {/* Line Graph */}
        <LineChart
          data={getFilteredData(selectedFilter)}
          width={width - 40}
          height={220}
          withInnerLines={true}
          withHorizontalLabels={true}
          withVerticalLabels={true}
          chartConfig={{
            backgroundColor: "white",
            backgroundGradientFrom: "#faf7ff",
            backgroundGradientTo: "#faf7ff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(127, 61, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForBackgroundLines: { stroke: "#e3e3e3" },
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "#7F3DFF",
              fill: "#ffffff",
            },
            formatYLabel: (y) => `${currencySymbol}${y}`,
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />

        {/* Filter Buttons */}
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
