import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Modal } from "react-native";
import styles from "./Transactions.style";
import useTransaction from "./useTransaction";

const Transactions = () => {

  const {
    isFilterModalVisible,
    setIsFilterModalVisible,
    selectedFilter,
    setSelectedFilter,
    selectedSort,
    setSelectedSort,
    filteredTransactionsData,
    setFilteredTransactionsData,
    isDropdownVisible,
    setIsDropdownVisible,
    selectedMonth,
    setSelectedMonth,
    transactions,
    setTransactions,
    user,
    navigation,
    useEffect,
    toggleDropdown,
    handleSelect,
    resetMonthFilter,
    filterTransactionsByMonth,
    toggleFilterModal,
    getCategoryStyles,
    applyFilters,
    handleResetFilters,
    resetAllFilters,
    hasDisplayableTransactions,
    transactionsToDisplay,
  } = useTransaction()

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity style={styles.monthSelection} onPress={toggleDropdown}>
              <MaterialIcons name="keyboard-arrow-down" size={36} color="#7f3dff" />
              <Text>{selectedMonth}</Text>
            </TouchableOpacity>

            {isDropdownVisible && (
              <View style={styles.dropdownMenu}>
                <FlatList
                  data={[
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

          <TouchableOpacity style={styles.menuIcon} onPress={toggleFilterModal}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Reset Filter Button */}
        {selectedMonth !== "Month" && (
          <TouchableOpacity style={styles.resetButton} onPress={resetAllFilters}>
            <Text style={styles.resetButtonText}>Reset Filter</Text>
          </TouchableOpacity>
        )}

        {/* Financial Report */}
        <TouchableOpacity style={styles.financialReport} onPress={() => navigation.navigate("FinancialReport")}>
          <Text style={styles.financialText}>See Your Financial Report</Text>
          <MaterialIcons name="keyboard-arrow-right" size={36} color="#7f3dff" />
        </TouchableOpacity>

        {/* Transactions List */}
        {hasDisplayableTransactions ? (
          Object.entries(transactionsToDisplay).map(([sectionTitle, transactionsList]) => (
            <View key={sectionTitle}>
              <Text style={styles.sectionTitle}>{sectionTitle}</Text>
              {transactionsList.map((transaction) => {
                const { iconBackgroundColor, iconColor, iconName } = getCategoryStyles(transaction.category);
                const isIncome = transaction.type === "income";

                return (
                  <View key={transaction.id} style={styles.CardContainer}>
                    <TouchableOpacity
                      style={styles.CategoryContainer}
                      onPress={() =>
                        navigation.navigate('DetailTransaction', {
                          transactionId: transaction.id,
                          type: transaction.type,
                        })
                      }
                    >
                      <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
                        <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={60} color={iconColor} style={styles.icon} />
                      </View>
                      <View style={{ flexDirection: "column", gap: 8 }}>
                        <Text style={styles.IncomeText}>
                          {transaction.category.length > 15 ? `${transaction.category.slice(0, 15)}...` : transaction.category}
                        </Text>
                        <Text style={styles.BuyText}>
                          {transaction.description.length > 17 ? `${transaction.description.slice(0, 17)}...` : transaction.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.TransactionInfo}>
                      <Text style={[styles.PriceText, { color: isIncome ? "green" : "red" }]}>
                        {isIncome ? "+ " : "- "} ${transaction.amount}
                      </Text>
                      <Text style={styles.TiemText}>{transaction.timestamp.split("T")[1].slice(0, 5)}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={80} color="gray" />
            <Text style={styles.emptyText}>No transactions available</Text>
          </View>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={toggleFilterModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* heading and reset button */}
            <View style={styles.resetContainer}>
              <Text style={styles.modalTitle}>Filter Transaction</Text>
              <TouchableOpacity onPress={handleResetFilters}>
                <Text style={styles.modalResetButton}>Reset</Text>
              </TouchableOpacity>
            </View>

            {/* Filtered by heading */}
            <Text style={styles.headingText}>Filtered By</Text>

            {/* Expense and Income buttons */}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[
                  styles.fileterButtons,
                  selectedFilter === "income" && { backgroundColor: "#7f3dff" },
                ]}
                onPress={() => setSelectedFilter("income")}
              >
                <Text style={selectedFilter === "income" ? { color: "white" } : { color: "black" }}>
                  Income
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.fileterButtons,
                  selectedFilter === "expense" && { backgroundColor: "#7f3dff" },
                ]}
                onPress={() => setSelectedFilter("expense")}
              >
                <Text style={selectedFilter === "expense" ? { color: "white" } : { color: "black" }}>
                  Expense
                </Text>
              </TouchableOpacity>
            </View>


            {/* Sort by heading */}
            <Text style={styles.headingText}>Sort By</Text>
            {/* Sort by buttons */}
            <View style={styles.SortButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.SortButtons,
                  selectedSort === "highest" && { backgroundColor: "#7f3dff" },
                ]}
                onPress={() => setSelectedSort("highest")}
              >
                <Text style={selectedSort === "highest" && { color: "white" }}>Highest</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.SortButtons,
                  selectedSort === "lowest" && { backgroundColor: "#7f3dff" },
                ]}
                onPress={() => setSelectedSort("lowest")}
              >
                <Text style={selectedSort === "lowest" && { color: "white" }}>Lowest</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.SortButtons,
                  selectedSort === "newest" && { backgroundColor: "#7f3dff" },
                ]}
                onPress={() => setSelectedSort("newest")}
              >
                <Text style={selectedSort === "newest" && { color: "white" }}>Newest</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.SortButtons,
                  selectedSort === "oldest" && { backgroundColor: "#7f3dff" },
                ]}
                onPress={() => setSelectedSort("oldest")}
              >
                <Text style={selectedSort === "oldest" && { color: "white" }}>Oldest</Text>
              </TouchableOpacity>
            </View>

            {/* Category text */}
            <Text style={styles.headingText}>Category</Text>
            {/* Category Input */}
            <TouchableOpacity style={styles.categoryContainer}>
              <View>
                <Text style={styles.categoryText}>Choose Category</Text>
              </View>
              <View style={styles.selectedCategoriesContainer}>
                <Text>0 Selected</Text>
                <MaterialIcons name="keyboard-arrow-right" size={36} color="#7f3dff" />
              </View>
            </TouchableOpacity>

            {/* close button */}
            <TouchableOpacity style={styles.modalButton} onPress={applyFilters}>
              <Text style={styles.modalButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Transactions;
