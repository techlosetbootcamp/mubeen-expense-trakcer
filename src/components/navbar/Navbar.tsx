import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useNavbar from "./useNavbar";
import styles from "./Navbar.style";
import { useAppSelector } from "../../store/store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { MonthNames } from "../../constants/MonthsNames";

const Navbar: React.FC = () => {
  const {
    navigation,
    isDropdownVisible,
    selectedMonth,
    toggleDropdown,
    handleSelect,
    profilePicture,
    name,
    unseenNotificationsCount,
  } = useNavbar();

  const renderAvatar = () => {
    if (profilePicture) {
      return <Image source={{ uri: `data:image/jpeg;base64,${profilePicture}` }} style={styles.profileImage} />;
    }
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          {name?.charAt(0).toUpperCase() || "?"}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileSection}
        onPress={() => navigation.navigate("Profile", { profilePicture, name })}
      >
        {renderAvatar()}
      </TouchableOpacity>

      <View style={styles.dropdownSection}>
        <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={32}
            color="#7f3dff"
            style={styles.icon}
          />
          <Text style={styles.dropdown}>{selectedMonth}</Text>
        </TouchableOpacity>

        {isDropdownVisible && (
          <View style={styles.dropdownMenu}>
            <FlatList
              data={MonthNames}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect(item)}>
                  <Ionicons size={16} color="#6B7280" style={styles.itemIcon} />
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      <View style={styles.icons}>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <View style={{ position: "relative" }}>
            <Ionicons name="notifications" size={28} color="#7f3dff" />
            {unseenNotificationsCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unseenNotificationsCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;