import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { PieChart } from "react-native-gifted-charts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./FinancialReport.style";
import useFinancialReport from "./useFinancialReport";
import { useAppSelector } from "../../store/store";

const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  PKR: "PKR ",
  JPY: "¥",
};

const FinancialReport = () => {
  const {
    navigation,
    selectedMonth,
    setSelectedMonth,
    isDropdownVisible,
    setIsDropdownVisible,
    selectedType,
    setSelectedType,
    handleSelect,
    toggleDropdown,
    getChartData,
    getTotalAmount, // Add this from useFinancialReport
    screenWidth,
    formatAmount,
  } = useFinancialReport();
  const selectedCurrency = useAppSelector((state) => state.user.selectedCurrency as keyof typeof currencySymbols);
  const currencySymbol = currencySymbols[selectedCurrency] || selectedCurrency;

  // Adapt chart data for react-native-gifted-charts
  const chartData = getChartData().map((item) => ({
    value: item.population,
    color: item.color,
    text: item.name,
    textColor: "#7F7F7F",
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Financial Report</Text>
      </View>

      <View style={styles.NavHeader}>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity style={styles.monthSelection} onPress={toggleDropdown}>
            <MaterialIcons name="keyboard-arrow-down" size={36} color="#7f3dff" />
            <Text>{selectedMonth}</Text>
          </TouchableOpacity>

          {isDropdownVisible && (
            <View style={styles.dropdownMenu}>
              <FlatList
                data={[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December",
                ]}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect(item)}>
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>

        <View style={styles.menuIcon}>
          <Ionicons name="menu" size={24} color="black" />
        </View>
      </View>

      {/* Donut Chart with total amount in the center */}
      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          donut
          radius={90}
          innerRadius={60}
          textSize={12}
          textColor="#7F7F7F"
          showText={false}
          centerLabelComponent={() => (
            <View style={styles.centerLabel}>
              <Text style={styles.centerLabelText}>
                {currencySymbol}{getTotalAmount()}
              </Text>
            </View>
          )}
        />
      </View>

      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.button, selectedType === "expense" && styles.activeButton]}
          onPress={() => setSelectedType("expense")}
        >
          <Text style={[styles.buttonText, selectedType === "expense" && styles.activeButtonText]}>
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedType === "income" && styles.activeButton]}
          onPress={() => setSelectedType("income")}
        >
          <Text style={[styles.buttonText, selectedType === "income" && styles.activeButtonText]}>
            Income
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.progressContainer} showsVerticalScrollIndicator={false}>
        {getChartData().map((item, index) => (
          <View key={index} style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <View style={styles.categoryContainer}>
                <View style={[styles.progressDot, { backgroundColor: item.color }]} />
                <Text style={styles.categoryText}>{item.barGraphname}</Text>
              </View>
              <Text
                style={[
                  styles.amountText,
                  {
                    color: selectedType === 'expense' ? '#ff0000' : '#00cc00',
                  }
                ]}
              >
                {selectedType === 'expense' ? '-' : '+'}
                {currencySymbol}{formatAmount(item.population)}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${item.population}%`, backgroundColor: item.color },
                ]}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FinancialReport;