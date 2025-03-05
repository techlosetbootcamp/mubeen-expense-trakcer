import React from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from "./Profile.style";
import useProfile from "./useProfile";
import { useAppSelector } from "../../store/store";

const Profile: React.FC = () => {
  const {
    navigation,
    username,
    setUsername,
    isLogoutModalVisible,
    setLogoutModalVisible,
    isImageModalVisible, // Add new state
    setImageModalVisible,
    useEffect,
    openLogoutModal,
    closeLogoutModal,
    handleLogout,
    openImageModal, // Add new function
    closeImageModal, // Add new function
  } = useProfile();

  const profilePicture = useAppSelector((state) => state.user.profilePicture);

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.avatarContainer} onPress={profilePicture ? openImageModal : undefined}>
          {profilePicture ? (
            <Image source={{ uri: `data:image/jpeg;base64,${profilePicture}` }} style={styles.profileImage} />
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
          <MaterialIcons name="settings" size={36} color="#8A2BE2" style={{backgroundColor: "#eee5ff", padding:5, borderRadius: 15}}/>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("ResetPassword")}>
          <MaterialIcons name="lock-reset" size={36} color="#8A2BE2" style={{backgroundColor: "#eee5ff", padding:5, borderRadius: 15}}/>
          <Text style={styles.menuText}>Reset Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutmenuItem} onPress={openLogoutModal}>
          <MaterialIcons name="logout" size={36} color="#FF6347" style={{backgroundColor: "#ffe2e4", padding:5, borderRadius: 15}}/>
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>

        {/* Logout Modal */}
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
                Are you sure you wanna to logout?
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

        {/* Full-Screen Image Modal */}
        <Modal
          transparent={false}
          visible={isImageModalVisible}
          animationType="fade"
          onRequestClose={closeImageModal}
        >
          <View style={styles.fullScreenImageContainer}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${profilePicture}` }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeImageModal}
            >
              <MaterialIcons name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Profile;