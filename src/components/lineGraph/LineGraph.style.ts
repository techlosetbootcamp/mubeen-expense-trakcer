import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Keeps buttons flush with border edges
    marginBottom: 10,
    borderColor: "#e8e8e8", // Light gray color
    borderWidth: 1, // Small width for smaller dots
    borderRadius: 25,
    width: '95%',
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  selectedFilterButton: {
    backgroundColor: "#fceed4",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
  },
  selectedFilterText: {
    color: "#fcac12",
  },
});

export default styles;