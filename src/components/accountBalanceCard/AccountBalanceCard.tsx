import React from "react";
import { Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import useAccountBalanceCard from "./useAccountBalanceCard"; // Import the custom hook
import styles from "./AccountBalanceCard.style";

const AccountBalanceCard = () => {
  
  const { totalIncome, totalExpenses, accountBalance } = useAccountBalanceCard(); // Use the hook

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account Balance</Text>
      <Text style={styles.amount}>${accountBalance}</Text>

      <View style={styles.IncomeAndTextCont}>
        <View style={styles.IncomButton}>
          <Ionicons name="arrow-up-circle" size={40} color="#fff" />
          <View>
            <Text style={styles.IncomeText}>Income</Text>
            <Text style={styles.IncomeText}>${totalIncome}</Text>
          </View>
        </View>
        <View style={styles.ExpenseButton}>
          <Ionicons name="arrow-down-circle" size={40} color="#fff" />
          <View>
            <Text style={styles.IncomeText}>Expense</Text>
            <Text style={styles.IncomeText}>${totalExpenses}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountBalanceCard;
