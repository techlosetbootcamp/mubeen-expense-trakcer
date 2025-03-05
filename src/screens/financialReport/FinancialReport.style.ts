import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  progressContainer: {
    marginTop: 20,
  },
  progressItem: {
    marginBottom: 15,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1fa', // Light gray background
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 25,
    borderColor: '#e8e8e8',
    borderWidth: 0.5
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#f1f1fa",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
  amountText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
    paddingBottom: 30
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 50, // Adjust height if needed
  },
  
  iconContainer: {
    position: "absolute",
    left: 10, // Adjust as needed
  },
  
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
    // paddingVertical: 10
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
});

export default styles;