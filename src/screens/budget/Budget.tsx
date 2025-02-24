import {
  StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput
} from "react-native";
import React from "react";
import { BarChart } from "react-native-chart-kit";
import useBudget from "./useBudget";


const Budget = () => {

    const {
        budgets,
        setBudgets,
        modalVisible,
        setModalVisible,
        selectedCategory,
        setSelectedCategory,
        budgetAmount,
        setBudgetAmount,
        selectedDuration,
        setSelectedDuration,
        expenses,
        useEffect,
        handleAddBudget,
        calculateExpenses,
        chartConfig,
        screenWidth,
        categoriesList,
        durationList
    } = useBudget()

  return (
      <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
              <Text style={styles.title}>Budget</Text>
              <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setModalVisible(true)}
              >
                  <Text style={styles.addButtonText}>+ Add Budget</Text>
              </TouchableOpacity>
          </View>

          {/* List of Added Budgets */}
          <FlatList
              data={budgets}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                  const spent = calculateExpenses(item.category);
                  const remaining = item.amount - spent;
                  const chartData = {
                      labels: ["Budget", "Spent", "Remaining"],
                      datasets: [
                          {
                              data: [item.amount, spent, remaining < 0 ? 0 : remaining],
                              colors: [
                                  (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                                  (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                                  (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                              ]
                          }
                      ]
                  };

                  return (
                      <View style={styles.budgetCard}>
                          <View>
                              <Text style={styles.categoryName}>{item.category}</Text>
                              <Text style={styles.durationText}>{item.duration} Budget</Text>
                          </View>
                          <Text style={styles.budgetAmount}>${item.amount}</Text>
                          <BarChart
                              data={chartData}
                              width={screenWidth - 60}
                              height={220}
                              chartConfig={chartConfig}
                              verticalLabelRotation={30}
                          />
                          <Text>Spent: ${spent}</Text>
                          {remaining < 0 ? <Text style={{ color: 'red' }}>Overspent: ${Math.abs(remaining)}</Text> : <Text>Remaining: ₹{remaining}</Text>}
                      </View>
                  );
              }}
              ListEmptyComponent={<Text style={styles.emptyText}>No budgets added yet.</Text>}
          />

          {/* Modal for Adding Budget */}
          <Modal
              visible={modalVisible}
              transparent
              animationType="slide"
          >
              <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Add Budget</Text>

                      {/* Category Selection */}
                      <Text style={styles.label}>Select Category</Text>
                      <FlatList
                          data={categoriesList}
                          keyExtractor={(item) => item}
                          horizontal
                          renderItem={({ item }) => (
                              <TouchableOpacity
                                  style={[
                                      styles.optionButton,
                                      selectedCategory === item && styles.selectedOption
                                  ]}
                                  onPress={() => setSelectedCategory(item)}
                              >
                                  <Text style={styles.optionText}>{item}</Text>
                              </TouchableOpacity>
                          )}
                      />

                      {/* Budget Amount Input */}
                      <Text style={styles.label}>Enter Budget Amount</Text>
                      <TextInput
                          style={styles.input}
                          placeholder="Enter Amount"
                          keyboardType="numeric"
                          value={budgetAmount}
                          onChangeText={setBudgetAmount}
                      />

                      {/* Duration Selection */}
                      <Text style={styles.label}>Select Duration</Text>
                      <FlatList
                          data={durationList}
                          keyExtractor={(item) => item}
                          horizontal
                          renderItem={({ item }) => (
                              <TouchableOpacity
                                  style={[
                                      styles.optionButton,
                                      selectedDuration === item && styles.selectedOption
                                  ]}
                                  onPress={() => setSelectedDuration(item)}
                              >
                                  <Text style={styles.optionText}>{item}</Text>
                              </TouchableOpacity>
                          )}
                      />

                      {/* Add Budget Button */}
                      <TouchableOpacity style={styles.addBudgetButton} onPress={handleAddBudget}>
                          <Text style={styles.addBudgetButtonText}>Add Budget</Text>
                      </TouchableOpacity>

                      {/* Close Modal Button */}
                      <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                          <Text style={styles.closeButtonText}>Close</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </Modal>
      </View>
  );
};

export default Budget;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      paddingTop: 40,
      paddingHorizontal: 20,
      marginBottom: 80
  },
  header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
  },
  title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
  },
  addButton: {
      backgroundColor: "#4CAF50",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 5,
  },
  addButtonText: {
      color: "#fff",
      fontWeight: "bold",
  },
  budgetCard: {
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      flexDirection: "column", // Changed to column
      justifyContent: "space-between",
  },
  categoryName: {
      fontSize: 16,
      fontWeight: "bold",
  },
  durationText: {
      fontSize: 14,
      color: "#666",
  },
  budgetAmount: {
      fontSize: 16,
      color: "#2ecc71",
      fontWeight: "bold",
  },
  emptyText: {
      textAlign: "center",
      color: "#999",
      marginTop: 20,
  },

  // Modal Styles
  modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
      backgroundColor: "#fff",
      width: "80%",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
  },
  modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
  },
  label: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 5,
  },
  optionButton: {
      backgroundColor: "#ddd",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
      marginHorizontal: 5,
  },
  selectedOption: {
      backgroundColor: "#4CAF50",
  },
  optionText: {
      color: "#333",
      fontWeight: "bold",
  },
  input: {
      width: "100%",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      marginTop: 5,
      marginBottom: 15,
      textAlign: "center",
  },
  addBudgetButton: {
      backgroundColor: "#4CAF50",
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      width: "100%",
      alignItems: "center",
  },
  addBudgetButtonText: {
      color: "#fff",
      fontWeight: "bold",
  },
  closeButton: {
      marginTop: 10,
  },
  closeButtonText: {
      color: "#e74c3c",
      fontWeight: "bold",
  },
});
