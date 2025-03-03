import React, { useState } from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useAccountBalanceCard from "./useAccountBalanceCard"; // Import the custom hook
import styles from "./AccountBalanceCard.style";

const AccountBalanceCard = () => {
  
  const { totalIncome, totalExpenses, accountBalance, currencySymbol } = useAccountBalanceCard(); // Use the hook

  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);

  const handleIncomeModalToggle = () => {
    setIsIncomeModalVisible(!isIncomeModalVisible);
  };

  const handleExpenseModalToggle = () => {
    setIsExpenseModalVisible(!isExpenseModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account Balance</Text>
      <Text style={styles.amount}>{currencySymbol}{Number(accountBalance).toFixed(2)}</Text>

      <View style={styles.IncomeAndTextCont}>
        <TouchableOpacity style={styles.IncomButton} onPress={handleIncomeModalToggle}>
          <Ionicons name="arrow-up-circle" size={40} color="#fff" />
          <View style={styles.boxContent}>
            <Text style={styles.IncomeText}>Income</Text>
            <Text style={[styles.IncomeText, styles.amountText]} numberOfLines={1}>{currencySymbol}{totalIncome}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ExpenseButton} onPress={handleExpenseModalToggle}>
          <Ionicons name="arrow-down-circle" size={40} color="#fff" />
          <View style={styles.boxContent}>
            <Text style={styles.IncomeText}>Expense</Text>
            <Text style={[styles.IncomeText, styles.amountText]} numberOfLines={1}>{currencySymbol}{totalExpenses}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Income Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isIncomeModalVisible}
        onRequestClose={handleIncomeModalToggle}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Income Details</Text>
              <TouchableOpacity onPress={handleIncomeModalToggle}>
                <MaterialIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalAmount}>{currencySymbol}{totalIncome.toFixed(0)}</Text>
          </View>
        </View>
      </Modal>

      {/* Expense Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isExpenseModalVisible}
        onRequestClose={handleExpenseModalToggle}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Expense Details</Text>
              <TouchableOpacity onPress={handleExpenseModalToggle}>
                <MaterialIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalAmount}>{currencySymbol}{totalExpenses.toFixed(0)}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AccountBalanceCard;
