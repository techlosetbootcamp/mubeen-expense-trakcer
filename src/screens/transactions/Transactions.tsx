import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SectionList,
  ScrollView,
  StyleSheet,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Modal } from "react-native";
import styles from "./Transactions.style";
import useTransaction from "./useTransaction";
import { useAppSelector } from "../../store/store";

const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  PKR: "₨",
  JPY: "¥",
};

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
    formatAmount,
  } = useTransaction();
  const selectedCurrency = useAppSelector((state) => state.user.selectedCurrency as keyof typeof currencySymbols);
  const currencySymbol = currencySymbols[selectedCurrency] || selectedCurrency;

  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    const { iconBackgroundColor, iconColor, iconName } = getCategoryStyles(
      item.category
    );
    const isIncome = item.type === "income";

    return (
      <View key={item.id} style={styles.CardContainer}>
        <TouchableOpacity
          style={styles.CategoryContainer}
          onPress={() =>
            navigation.navigate("DetailTransaction", {
              transactionId: item.id,
              type: item.type,
            })
          }
        >
          <View
            style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}
          >
            <Ionicons
              name={iconName as keyof typeof Ionicons.glyphMap}
              size={60}
              color={iconColor}
              style={styles.icon}
            />
          </View>
          <View style={{ flexDirection: "column", gap: 8 }}>
            <Text style={styles.IncomeText}>
              {item.category.length > 15
                ? `${item.category.slice(0, 15)}...`
                : item.category}
            </Text>
            <Text style={styles.BuyText}>
              {item.description.length > 17
                ? `${item.description.slice(0, 17)}...`
                : item.description}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.TransactionInfo}>
          <Text style={[styles.PriceText, { color: isIncome ? "green" : "red" }]}>
            {isIncome ? "+ " : "- "} {currencySymbol}{formatAmount(item.amount)}
          </Text>
          <Text style={styles.TiemText}>{item.timestamp.split("T")[1].slice(0, 5)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { flex: 1 }]}>
      {/* Sticky Header */}
      <View style={internalStyles.stickyHeader}>
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

            {isDropdownVisible && (
              <View style={styles.dropdownMenu}>
                <ScrollView>
                  {[
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
                  ].map((month) => (
                    <TouchableOpacity
                      key={month}
                      style={styles.dropdownItem}
                      onPress={() => handleSelect(month)}
                    >
                      <Text style={styles.dropdownItemText}>{month}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
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
        <TouchableOpacity
          style={styles.financialReport}
          onPress={() => navigation.navigate("FinancialReport")}
        >
          <Text style={styles.financialText}>See Your Financial Report</Text>
          <MaterialIcons name="keyboard-arrow-right" size={36} color="#7f3dff" />
        </TouchableOpacity>
      </View>

      {/* Transactions List */}
      {hasDisplayableTransactions ? (
        <SectionList
          style={{ marginVertical: 10, marginLeft: 0 }}
          sections={Object.entries(transactionsToDisplay).map(
            ([sectionTitle, transactionsList]) => ({
              title: sectionTitle,
              data: transactionsList,
            })
          )}
          keyExtractor={(item) => item.id}
          renderItem={renderTransactionItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionTitle}>{title}</Text>
          )}
        />
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={80} color="gray" />
            <Text style={styles.emptyText}>No transactions available</Text>
          </View>
        </ScrollView>
      )}

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={toggleFilterModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal content */}
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

            {/* Apply button */}
            <TouchableOpacity style={styles.modalButton} onPress={applyFilters}>
              <Text style={styles.modalButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const internalStyles = StyleSheet.create({
  stickyHeader: {
    backgroundColor: "#fff",
    zIndex: 10,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});

export default Transactions;