import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 90,
  },
  plusButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7f3dff",
    borderRadius: 25,
    zIndex: 3,
  },
  actionContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 30,
    justifyContent: "space-between",
    width: 150,
    marginBottom: 0,
    zIndex: 2,
  },
  addIncomeButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: "#00a86b",
    marginHorizontal: 10,
  },
  addExpenseButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: "#fd3c4a",
    marginHorizontal: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(127, 61, 255, 0.2)',
    zIndex: 1, 
  },
  });
  
  

  export default styles