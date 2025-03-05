import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff6e6",
    alignItems: "center",
    flexDirection: "column",
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
  },
  text: {
    fontSize: 18,
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
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 25,
    width: "45%",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ExpenseButton: {
    backgroundColor: "#fd3c4a",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 25,
    width: "45%",
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
  amountText: {
    fontSize: 14,
  },
  boxContent: {
    flex: 1,
    justifyContent: "center",
  },
  IncomeAndTextCont: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    gap: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
});

export default styles;
