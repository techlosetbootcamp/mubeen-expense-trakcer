import { useState } from "react";
import { Animated } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationParamList } from "../../constants/types/navigationTypes";

export const useTabBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotation = new Animated.Value(0);
  const navigation = useNavigation<NavigationProp<StackNavigationParamList>>();

  const togglePlusButton = () => {
    setIsExpanded((prev) => !prev);

    Animated.timing(rotation, {
      toValue: isExpanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const rotateStyle = {
    transform: [
      {
        rotate: rotation?.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },
    ],
  };

  return { isExpanded, togglePlusButton, rotateStyle, navigation };
};
