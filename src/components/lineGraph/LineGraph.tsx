import React from "react";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import styles from "./LineGraph.style";
import useLineGraph from "./useLineGraph";
import { RootState, useAppSelector } from "../../store/store";

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
  const selectedCurrency = useAppSelector((state: RootState) => state.user.selectedCurrency);
  const currencySymbol = currencySymbols[selectedCurrency as keyof typeof currencySymbols] || selectedCurrency;

  return (
    <>
      <Text style={styles.title}>Spend Frequency</Text>
      <View style={styles.container}>
        {/* Line Graph */}
        <LineChart
          data={getFilteredData(selectedFilter)}
          width={width} // Full screen width
          height={220}
          withDots={false} // Remove dots
          withInnerLines={false}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          chartConfig={{
            backgroundColor: "Transparent", // Remove background color
            backgroundGradientFrom: "white", // No gradient
            backgroundGradientTo: "white", // No gradient
            decimalPlaces: 0,
            color: (opacity = 1) => `#7f3dff`,
            style: { borderRadius: 0 }, // Remove rounding for edge alignment
          }}
          bezier
          style={{
            marginVertical: 8,
            paddingLeft: 0,
            paddingRight: 0, // Ensure no padding on right
            marginLeft: 0,
            marginRight: 0, // Ensure no margin on right
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