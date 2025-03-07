import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootState, useAppSelector } from "../../store/store";
import { View } from "react-native";
import styles from "./Navbar.style";

const useNavbar = () => {
  const user = useAppSelector((state: RootState) => state?.user?.user);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Select Month");
  const navigation: any = useNavigation();

  const profilePicture = useAppSelector((state) => state?.user?.profilePicture);
  const name = useAppSelector((state) => state?.user?.name);
  const unseenNotificationsCount = useAppSelector((state) =>
    state?.budget?.notifications?.filter((n) => !n?.isSeen)?.length
  );


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
    toggleDropdown,
    handleSelect,
    profilePicture,
    name,
    unseenNotificationsCount,
  };
};

export default useNavbar;
