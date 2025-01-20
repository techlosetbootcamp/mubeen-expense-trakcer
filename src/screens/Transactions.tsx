import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import RecentTransactions from "../components/RecentTransactions";
import { useNavigation } from "@react-navigation/native";

const Transactions = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const navigation: any = useNavigation();

  const dropdownItems = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSelect = (item: string) => {
    setSelectedMonth(item);
    setIsDropdownVisible(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.monthSelection}
              onPress={toggleDropdown}
            >
              <MaterialIcons
                name="keyboard-arrow-down"
                size={36}
                color="#7f3dff"
              />
              <Text>{selectedMonth}</Text>
            </TouchableOpacity>

            {/* Dropdown Menu */}
            {isDropdownVisible && (
              <View style={styles.dropdownMenu}>
                <FlatList
                  data={dropdownItems}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => handleSelect(item)}
                    >
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

        {/* Financial Report */}
        <TouchableOpacity style={styles.financialReport}>
          <Text
            style={styles.financialText}
            onPress={() => navigation.navigate("FinancialReport")}
          >
            See Your Financial Report
          </Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={36}
            color="#7f3dff"
          />
        </TouchableOpacity>
        {/* Transactions */}
        <RecentTransactions recentText="Today" enableShowMore={false} />
      </View>
    </ScrollView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 2, // Ensure the header has a high stacking order
  },
  dropdownContainer: {
    position: "relative", // Needed for dropdown menu positioning
  },
  monthSelection: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f1f1fa",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  dropdownMenu: {
    position: "absolute",
    top: 50, // Adjust based on the height of `monthSelection`
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 3, // Ensure dropdown is above everything
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  menuIcon: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f1f1fa",
    alignItems: "center",
    justifyContent: "center",
  },
  financialReport: {
    height: 48,
    width: "100%",
    backgroundColor: "#eee5ff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 30,
  },
  financialText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7f3dff",
    alignItems: "center",
  },
});
