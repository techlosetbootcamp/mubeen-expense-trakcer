import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 40,
      backgroundColor: "#fff6e6",
      zIndex: 10,
    },
    profileSection: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: "#8A2BE2",
      borderWidth: 1,
      borderRadius: 50,
      padding: 2
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
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
      paddingVertical: 8,
      borderRadius: 25,
      borderColor: '#eee5ff',
      borderWidth: 1,
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
    badge: {
      position: "absolute",
      top: -5,
      right: -5,
      backgroundColor: "#FF6347",
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    badgeText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "bold",
    },
  });
  
  export default styles