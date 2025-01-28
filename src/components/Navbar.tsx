import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface NavbarProps {
  profilePicture?: string;
  name?: string;
}

const Navbar: React.FC<NavbarProps> = ({ profilePicture, name }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Select Month");
  const navigation: any = useNavigation();

  const dropdownItems = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSelect = (item: string) => {
    setSelectedMonth(item);
    setIsDropdownVisible(false);
  };

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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileSection}
        onPress={() =>
          navigation.navigate("Profile", {
            profilePicture,
            name,
          })
        }
      >
        {renderAvatar()}
      </TouchableOpacity>

      <View style={styles.dropdownSection}>
        <TouchableOpacity
          onPress={toggleDropdown}
          style={styles.dropdownButton}
        >
          <Ionicons
            name="caret-down-outline"
            size={20}
            color="#6B7280"
            style={styles.icon}
          />
          <Text style={styles.dropdown}>{selectedMonth}</Text>
        </TouchableOpacity>

        {isDropdownVisible && (
          <View style={styles.dropdownMenu}>
            <FlatList
              data={dropdownItems}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item)}
                >
                  <Ionicons size={16} color="#6B7280" style={styles.itemIcon} />
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      <View style={styles.icons}>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

export default Navbar;
