import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const AccountBalanceCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account Balance</Text>
      <Text style={styles.amount}>$1,000</Text>
      <View style={styles.IncomeAndTextCont}>
        {/* Income Button */}
        <View style={styles.IncomButton}>
          <View>
            <Ionicons
              name="arrow-up-circle"
              size={40}
              color="#fff"
              style={styles.icon}
            />
          </View>
          <View style={{ flexDirection: "column", gap: 2 }}>
            <Text style={styles.IncomeText}>Income</Text>
            <Text style={styles.IncomeText}>$5000</Text>
          </View>
        </View>

        {/* Expenses Button */}
        <View style={styles.ExpensesButton}>
          <View>
            <Ionicons
              name="arrow-down-circle"
              size={40}
              color="#fff"
              style={styles.icon}
            />
          </View>
          <View style={{ flexDirection: "column", gap: 2 }}>
            <Text style={styles.ExpensesText}>Expenses</Text>
            <Text style={styles.ExpensesText}>$2000</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountBalanceCard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff6e6",
    alignItems: "center",
    flexDirection: "column",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "gray",
  },
  amount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "black",
  },
  IncomButton: {
    backgroundColor: "#00a86b",
    padding: 10,
    borderRadius: 5,
    width: "auto",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  IncomeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  ExpensesButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    width: "auto",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ExpensesText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  IncomeAndTextCont: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    gap: 40,
  },
  icon: {
    marginRight: 5,
  },
});
