import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { PieChart } from "react-native-chart-kit";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./FinancialReport.style";
import useFinancialReport from "./useFinancialReport";

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
    screenWidth,
  } = useFinancialReport();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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

      <PieChart
        data={getChartData()}
        width={screenWidth - 40}
        height={200}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="0"
        absolute
      />

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
            <Text style={styles.categoryText}>{item.barGraphname}</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${item.population}%`, backgroundColor: item.color },
                ]}
              />
            </View>
            <Text style={styles.amountText}></Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FinancialReport;
