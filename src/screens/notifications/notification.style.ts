import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      paddingTop: 40,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#333",
    },
    notificationItem: {
      flexDirection: "row",
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 12,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
      alignItems: "center",
    },
    unseen: {
      backgroundColor: "#ffe6e6",
    },
    icon: {
      marginRight: 10,
    },
    content: {
      flex: 1,
    },
    messageRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    notificationText: {
      fontSize: 16,
      color: "#333",
      fontWeight: "500",
    },
    newLabel: {
      backgroundColor: "#FF6347",
      color: "#fff",
      fontSize: 12,
      fontWeight: "bold",
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    timestamp: {
      fontSize: 12,
      color: "#6B7280",
      marginTop: 4,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
    },
    emptyText: {
      fontSize: 18,
      color: "#6B7280",
      marginTop: 10,
    },
    listContent: {
      padding: 20,
    },
  });

export default styles
