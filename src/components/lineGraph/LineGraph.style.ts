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
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
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