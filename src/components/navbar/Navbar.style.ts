import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 40,
      backgroundColor: "#fff6e6",
      zIndex: 10,
    },
    profileSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    placeholder: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#6B7280",
      justifyContent: "center",
      alignItems: "center",
    },
    placeholderText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    dropdownSection: {
      flexDirection: "column",
      alignItems: "center",
    },
    dropdownButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 5,
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 2,
      borderRadius: 10,
      padding: 4,
    },
    icon: {
      marginRight: 5,
    },
    dropdown: {
      fontSize: 16,
      fontWeight: "500",
      color: "#333",
    },
    dropdownMenu: {
      position: "absolute",
      top: 45,
      backgroundColor: "#FFF",
      paddingHorizontal: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      zIndex: 1,
      minWidth: "100%",
    },
    dropdownItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 10,
    },
    itemIcon: {
      marginRight: 8,
    },
    dropdownItemText: {
      fontSize: 14,
      color: "#333",
    },
    icons: {
      flexDirection: "row",
      alignItems: "center",
    },
  });
  
  export default styles