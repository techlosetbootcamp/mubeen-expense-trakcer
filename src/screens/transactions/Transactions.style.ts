import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  CardContainer: {
    marginTop: 10,
    backgroundColor: "#fcfcfc",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: "space-between",
    width: "90%",
    overflow: "hidden",
    padding: 10,
  },
  CategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  TextContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  Row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
  },
  IncomeText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
  },
  BuyText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "semibold",
    flexShrink: 1,
  },
  PriceText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  TiemText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "semibold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 2,
  },
  dropdownContainer: {
    position: "relative",
  },
  monthSelection: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f1f1fa",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  dropdownMenu: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 3,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  menuIcon: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f1f1fa",
    alignItems: "center",
    justifyContent: "center",
  },
  financialReport: {
    height: 48,
    width: "100%",
    backgroundColor: "#eee5ff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 30,
  },
  financialText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7f3dff",
  },
  iconContainer: {
    padding: 10,
    borderRadius: 15,
  },
  icon: {
    marginRight: 5,
  },
  emptyText: {
    fontSize: 18,
    color: "red",
    marginTop: 10,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    marginBottom: 80,
  },
  transactionCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },
  resetButtonText: {
    color: "white",
    fontWeight: "bold"
  },
  resetButton: {
    backgroundColor: "#7f3dff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#7f3dff",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalResetButton: {
    backgroundColor: "#ebe2ff",
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    color: '#7f3dff'
  },
  resetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center"
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  fileterButtons: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginVertical: 20,
    borderColor: "#ebe2ff",
    borderWidth: 1
  },
  selectedButton: {
    backgroundColor: '#ebe2ff',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginVertical: 20,
    borderColor: "#ebe2ff",
    borderWidth: 1
  },
  SortButtons: {
    color: "#8647ff",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginVertical: 10,
    borderColor: "#ebe2ff",
    borderWidth: 1
  },
  SortSelectedButton: {
    color: "#8647ff",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginVertical: 10,
    borderColor: "#ebe2ff",
    borderWidth: 1
  },
  SortButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginLeft: 10
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5
  },
  selectedCategoriesContainer: {
    flexDirection: "row",
    rowGap: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  categoryText: {
    fontSize: 20
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  }
});



export default styles