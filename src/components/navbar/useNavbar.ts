import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootState, useAppSelector } from "../../store/store";

const useNavbar = () => {
  const user = useAppSelector((state: RootState) => state.user.user);
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

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);
  const handleSelect = (item: string) => {
    setSelectedMonth(item);
    setIsDropdownVisible(false);
  };

  return {
    user,
    navigation,
    isDropdownVisible,
    selectedMonth,
    dropdownItems,
    toggleDropdown,
    handleSelect,
  };
};

export default useNavbar;
