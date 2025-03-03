import React from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from "./Profile.style";
import useProfile from "./useProfile";
import { useAppSelector } from "../../store/store"; // Import useAppSelector

const Profile: React.FC = () => {
  const {
    navigation,
    username,
    setUsername,
    isLogoutModalVisible,
    setLogoutModalVisible,
    useEffect,
    openLogoutModal,
    closeLogoutModal,
    handleLogout
  } = useProfile();

  // Fetch profile picture from Redux
  const profilePicture = useAppSelector((state) => state.user.profilePicture);

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.avatarContainer}>
          {profilePicture ? (
            <Image source={{ uri: `data:image/png;base64,${profilePicture}` }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>{username.charAt(0).toUpperCase()}</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.username}>Username</Text>
          <Text style={styles.name}>{username}</Text>
        </View>

        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => navigation.navigate("UpdateProfile", { username, profilePicture })}
        >
          <SimpleLineIcons name="pencil" size={18} color="black" />
        </TouchableOpacity>
      </View>

      {/* Menu Options */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Setting")}>
          <MaterialIcons name="settings" size={48} color="#8A2BE2" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("ResetPassword")}>
          <MaterialIcons name="lock-reset" size={48} color="#8A2BE2" />
          <Text style={styles.menuText}>Reset Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={openLogoutModal}>
          <MaterialIcons name="logout" size={48} color="#FF6347" />
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>

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
    </View>
  );
};

export default Profile;