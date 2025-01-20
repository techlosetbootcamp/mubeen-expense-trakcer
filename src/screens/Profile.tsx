import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Profile: React.FC = () => {
  const route = useRoute();
  const navigation: any = useNavigation();
  const { profilePicture, name } = route.params as {
    profilePicture: string;
    name: string;
  };

  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const renderAvatar = () => {
    if (profilePicture) {
      return (
        <Image source={{ uri: profilePicture }} style={styles.profileImage} />
      );
    }
    const firstLetter = name?.charAt(0).toUpperCase() || "?";
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>{firstLetter}</Text>
      </View>
    );
  };

  const openLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  const handleLogout = async () => {
    try {
      setLogoutModalVisible(false); // Close the modal
      navigation.navigate("AuthenticationScreen"); // Navigate to the SignIn screen
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>{renderAvatar()}</View>
        <View style={styles.textContainer}>
          <Text style={styles.username}>Username</Text>
          <Text style={styles.name}>{name || "Iriana Saliha"}</Text>
        </View>
        <TouchableOpacity style={styles.editIcon}>
          <SimpleLineIcons name="pencil" size={18} color="#8A2BE2" />
        </TouchableOpacity>
      </View>

      {/* Menu Options */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="settings" size={48} color="#8A2BE2" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="lock-reset" size={48} color="#8A2BE2" />
          <Text style={styles.menuText}>Reset Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={openLogoutModal}>
          <MaterialIcons name="logout" size={48} color="#FF6347" />
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        transparent={true}
        visible={isLogoutModalVisible}
        animationType="fade"
        onRequestClose={closeLogoutModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Logout?</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.cancelButton]}
                onPress={closeLogoutModal}
              >
                <Text style={styles.modalCancelButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmButton]}
                onPress={handleLogout}
              >
                <Text style={styles.modalYesButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: "#8A2BE2",
    borderWidth: 2,
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
});

export default Profile;
