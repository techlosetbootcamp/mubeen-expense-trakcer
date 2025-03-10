import {
    StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput
  } from "react-native";
  import React from "react";
  import { BarChart } from "react-native-chart-kit";
  import useBudget from "./useBudget";
  import { RootState, useAppSelector } from "../../store/store";
  import styles from "./budget.style";
  import { currencySymbols } from "../../constants/currencySymbols";
  
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
      categories,
      durationList,
      formatAmount,
    } = useBudget();
  
    const selectedCurrency = useAppSelector((state: RootState) => state.user.selectedCurrency);
    const currencySymbol = currencySymbols[selectedCurrency] || selectedCurrency;
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Budget</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add Budget</Text>
          </TouchableOpacity>
        </View>
  
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
                <Text style={styles.budgetAmount}>{currencySymbol}{formatAmount(item.amount)}</Text>
                <BarChart
                  data={chartData}
                  width={screenWidth - 60}
                  height={220}
                  chartConfig={chartConfig}
                  verticalLabelRotation={30}
                />
                <Text>Spent: {currencySymbol}{formatAmount(spent)}</Text>
                {remaining < 0 ? (
                  <Text style={{ color: 'red' }}>Overspent: {currencySymbol}{formatAmount(Math.abs(remaining))}</Text>
                ) : (
                  <Text>Remaining: {currencySymbol}{formatAmount(remaining)}</Text>
                )}
              </View>
            );
          }}
          ListEmptyComponent={<Text style={styles.emptyText}>No budgets added yet.</Text>}
        />
  
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Budget</Text>
  
              <Text style={styles.label}>Select Category</Text>
              <FlatList
                data={categories}
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
  
              <Text style={styles.label}>Enter Budget Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Amount"
                keyboardType="numeric"
                value={budgetAmount}
                onChangeText={setBudgetAmount}
              />
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
                <TouchableOpacity style={styles.addBudgetButton} onPress={handleAddBudget}>
                <Text style={styles.addBudgetButtonText}>Add Budget</Text>
              </TouchableOpacity>
  
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
  
