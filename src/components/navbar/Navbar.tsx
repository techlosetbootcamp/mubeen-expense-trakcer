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

interface NavbarProps {
  profilePicture?: string;
  name?: string;
}

const Navbar: React.FC<NavbarProps> = ({ profilePicture, name }) => {
  const {
    navigation,
    isDropdownVisible,
    selectedMonth,
    dropdownItems,
    toggleDropdown,
    handleSelect,
  } = useNavbar();

  const renderAvatar = () => {
    if (profilePicture) {
      return <Image source={{ uri: profilePicture }} style={styles.profileImage} />;
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
      {/* Profile Section */}
      <TouchableOpacity
        style={styles.profileSection}
        onPress={() => navigation.navigate("Profile", { profilePicture, name })}
      >
        {renderAvatar()}
      </TouchableOpacity>

      {/* Dropdown Section */}
      <View style={styles.dropdownSection}>
        <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
          <Ionicons name="caret-down-outline" size={20} color="#6B7280" style={styles.icon} />
          <Text style={styles.dropdown}>{selectedMonth}</Text>
        </TouchableOpacity>

        {isDropdownVisible && (
          <View style={styles.dropdownMenu}>
            <FlatList
              data={dropdownItems}
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

      {/* Notification Icon */}
      <View style={styles.icons}>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;
