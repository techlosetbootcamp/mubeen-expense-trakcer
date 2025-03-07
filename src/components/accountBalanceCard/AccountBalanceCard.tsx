import React from "react";
import { Text, View, Modal, TouchableOpacity, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useAccountBalanceCard from "./useAccountBalanceCard";
import styles from "./AccountBalanceCard.style";

const AccountBalanceCard = () => {
  const {
    totalIncome,
    totalExpenses,
    accountBalance,
    currencySymbol,
    handleIncomeModalToggle,
    handleExpenseModalToggle,
    isIncomeModalVisible,
    isExpenseModalVisible,
  } = useAccountBalanceCard()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account Balance</Text>
      <Text style={styles.amount}>{currencySymbol}{Number(accountBalance).toFixed(2)}</Text>

      <View style={styles.IncomeAndTextCont}>
        <TouchableOpacity style={styles.IncomButton} onPress={handleIncomeModalToggle}>
          <View style={{ backgroundColor: 'white', paddingVertical: 8, paddingHorizontal: 8, borderRadius: 15, marginRight: 5 }}>
            <Image
              source={require('../../constants/icons/income.png')}
              style={{ width: 30, height: 30, resizeMode: 'contain' }}
            />
          </View>
          <View style={styles.boxContent}>
            <Text style={styles.IncomeText}>Income</Text>
            <Text style={[styles.IncomeText, styles.amountText]} numberOfLines={1}>
              {currencySymbol}{totalIncome}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ExpenseButton} onPress={handleExpenseModalToggle}>
          <View style={{ backgroundColor: 'white', paddingVertical: 8, paddingHorizontal:8, borderRadius: 15, marginRight: 5 }}>
            <Image
              source={require('../../constants/icons/Expense.png')}
              style={{ width: 30, height: 30, resizeMode: 'contain' }}
            />
          </View>
          <View style={styles.boxContent}>
            <Text style={styles.IncomeText}>Expense</Text>
            <Text style={[styles.IncomeText, styles.amountText]} numberOfLines={1}>{currencySymbol}{totalExpenses}</Text>
          </View>
        </TouchableOpacity>
      </View>

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
