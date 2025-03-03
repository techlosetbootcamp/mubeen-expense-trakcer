import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  NavHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  dropdownContainer: {
    position: "relative",
  },
  monthSelection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
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
    zIndex: 20,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 16,
  },
  menuIcon: {
    padding: 10,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  // New styles for center label
  centerLabel: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerLabelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  centerLabelSubText: {
    fontSize: 12,
    color: "#7F7F7F",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    backgroundColor: "#f1f1fa",
    borderRadius: 50,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  activeButton: {
    backgroundColor: "#6A5ACD",
  },
  buttonText: {
    fontWeight: "bold",
  },
  activeButtonText: {
    color: "white",
  },
  progressContainer: {
    marginTop: 20,
  },
  progressItem: {
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
  amountText: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default styles;