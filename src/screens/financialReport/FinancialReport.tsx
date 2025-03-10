import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { PieChart } from "react-native-gifted-charts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from "./FinancialReport.style";
import useFinancialReport from "./useFinancialReport";
import { useAppSelector } from "../../store/store";
import { Image } from "react-native";
import { MonthNames } from "../../constants/MonthsNames";
import { currencySymbols } from "../../constants/currencySymbols";

const FinancialReport = () => {
  const {
    navigation,
    selectedMonth,
    setSelectedMonth,
    isMonthDropdownVisible,
    setIsMonthDropdownVisible,
    selectedType,
    setSelectedType,
    selectedCategories,
    setSelectedCategories,
    isCategoryModalVisible,
    setIsCategoryModalVisible,
    handleMonthSelect,
    toggleMonthDropdown,
    toggleCategoryModal,
    applyFilters,
    resetFilters,
    getChartData,
    getTotalAmount,
    screenWidth,
    formatAmount,
    getCategoriesForType,
  } = useFinancialReport();

  const selectedCurrency = useAppSelector((state) => state.user.selectedCurrency as keyof typeof currencySymbols);
  const currencySymbol = currencySymbols[selectedCurrency] || selectedCurrency;

  const chartData = getChartData().map((item) => ({
    value: item.population,
    color: item.color,
    text: item.name,
    textColor: "#7F7F7F",
  }));

  const hasDataForSelectedType = chartData.length > 0;

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
          <TouchableOpacity style={styles.monthSelection} onPress={toggleMonthDropdown}>
            <MaterialIcons name="keyboard-arrow-down" size={36} color="#7f3dff" />
            <Text>{selectedMonth}</Text>
          </TouchableOpacity>
          {isMonthDropdownVisible && (
            <View style={styles.dropdownMenu}>
              <FlatList
                data={MonthNames}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.dropdownItem} onPress={() => handleMonthSelect(item)}>
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
        <View style={{ backgroundColor: '#7f3dff', paddingVertical: 7, paddingHorizontal: 12, borderRadius: 15, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('../../constants/icons/PieChart.png')}
            style={{ width: 30, height: 30, resizeMode: 'contain' }}
          />
        </View>
      </View>

      {/* Donut Chart */}
      {hasDataForSelectedType ? (
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
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No {selectedType === "expense" ? "expenses" : "income"} available</Text>
        </View>
      )}

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

      <View style={styles.categorySelectorContainer}>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity style={styles.categoryDropdown} onPress={toggleCategoryModal}>
            <MaterialIcons name="keyboard-arrow-down" size={36} color="#7f3dff" />
            <Text>{selectedCategories.length > 0 ? `${selectedCategories.length} Categories` : "Categories"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.menuIcon}>
          <View>
            <Image
              source={require('../../constants/icons/sorthighestlowest.png')}
              style={{ width: 25, height: 25, resizeMode: 'contain' }}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Progress Bars */}
      {hasDataForSelectedType ? (
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
                    { color: selectedType === 'expense' ? '#ff0000' : '#00cc00' },
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
                    { width: `${Math.min((item.population / getTotalAmount()) * 100, 100)}%`, backgroundColor: item.color },
                  ]}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No {selectedType === "expense" ? "expenses" : "income"} available</Text>
        </View>
      )}

      {/* Category Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCategoryModalVisible}
        onRequestClose={toggleCategoryModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Categories</Text>
              <TouchableOpacity style={styles.modalResetButton} onPress={resetFilters}>
                <Text style={styles.modalResetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {getCategoriesForType().map((category) => (
                <TouchableOpacity
                  key={category}
                  style={styles.categoryItem}
                  onPress={() => {
                    setSelectedCategories((prev) =>
                      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
                    );
                  }}
                >
                  <Text>{category}</Text>
                  {selectedCategories.includes(category) && (
                    <MaterialIcons name="check" size={24} color="#7f3dff" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.modalButton} onPress={() => applyFilters()}>
              <Text style={styles.modalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FinancialReport;