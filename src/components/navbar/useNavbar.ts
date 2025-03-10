import { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootState, useAppSelector } from "../../store/store";
import { StackNavigationParamList } from "../../constants/types/navigationTypes";

const useNavbar = () => {
  const user = useAppSelector((state: RootState) => state?.user?.user);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Select Month");
  const navigation = useNavigation<NavigationProp<StackNavigationParamList>>();

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
