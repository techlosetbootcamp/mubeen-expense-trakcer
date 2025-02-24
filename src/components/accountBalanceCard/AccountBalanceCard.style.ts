import { StyleSheet } from "react-native";
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
    ExpenseButton: {
      backgroundColor: "#fd3c4a",
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
  export default styles