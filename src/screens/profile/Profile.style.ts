import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F9FAFB",
      paddingHorizontal: 20,
      paddingTop: 50,
    },
    profileSection: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 40,
    },
    avatarContainer: {
      borderColor: "#8A2BE2",
      borderWidth: 2,
      borderRadius: 50,
      padding: 2,
      marginRight: 16,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    placeholder: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "#E5E7EB",
      alignItems: "center",
      justifyContent: "center",
    },
    placeholderText: {
      color: "#6B7280",
      fontSize: 32,
    },
    textContainer: {
      flex: 1,
    },
    username: {
      fontSize: 14,
      color: "gray",
      fontWeight: "500",
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#1F2937",
    },
    editIcon: {
      padding: 8,
    },
    menu: {
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#E5E7EB",
    },
    menuText: {
      fontSize: 16,
      fontWeight: "500",
      color: "#374151",
      marginLeft: 12,
    },
    logoutText: {
      color: "#FF6347",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    modalContainer: {
      backgroundColor: "#FFF",
      paddingHorizontal: 20,
      paddingVertical: 40,
      width: "100%",
      borderTopEndRadius: 15,
      borderTopStartRadius: 15,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 10,
    },
    modalMessage: {
      fontSize: 16,
      color: "#666",
      marginBottom: 20,
      textAlign: "center",
    },
    modalActions: {
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
    },
    cancelButton: {
      backgroundColor: "#eee5ff",
      paddingVertical: 20,
      paddingHorizontal: 60,
      borderRadius: 20,
      alignItems: "center",
      marginRight: 10,
      color: "#7f3dff",
    },
    confirmButton: {
      backgroundColor: "#8A2BE2",
      paddingVertical: 20,
      paddingHorizontal: 60,
      borderRadius: 20,
      alignItems: "center",
      marginLeft: 10,
    },
    modalCancelButtonText: {
      color: "#7f3dff",
      fontWeight: "bold",
    },
    modalYesButtonText: {
      color: "white",
      fontWeight: "bold",
    },
    input: {
      fontSize: 18,
      borderBottomWidth: 1,
      borderColor: "#ccc",
      padding: 5,
    },
    modalOption: { fontSize: 16, paddingVertical: 10, textAlign: "center" },
    // New styles for full-screen image modal
    fullScreenImageContainer: {
      flex: 1,
      backgroundColor: "#000", // Black background for contrast
      justifyContent: "center",
      alignItems: "center",
    },
    fullScreenImage: {
      width: "100%",
      height: "100%",
    },
    closeButton: {
      position: "absolute",
      top: 40,
      right: 20,
      padding: 10,
    },
});

export default styles;