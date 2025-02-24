import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    centeredContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 90
    },
    plusButton: {
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#7f3dff",
      borderRadius: 25,
    },
    actionContainer: {
      position: "absolute",
      flexDirection: "row",
      bottom: 30,
      justifyContent: "space-between",
      width: 150,
      marginBottom: 0,
    },
    addIncomeButton: {
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "#00a86b",
      marginHorizontal: 10,
    },
    addExpenseButton: {
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "#fd3c4a",
      marginHorizontal: 10,
    },
  });
  
  

  export default styles