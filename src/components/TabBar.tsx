import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import Transactions from "../screens/Transactions";
import Budget from "../screens/Budget";
import HomeScreen from "../screens/HomeScreen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const TabBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotation = new Animated.Value(0);
  const navigation: any = useNavigation();

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
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "90deg"],
        }),
      },
    ],
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "#fcfcfc",
          height: 80,
          paddingTop: 18,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <MaterialCommunityIcons
                name="home-lightbulb"
                size={36}
                color={focused ? "#7f3dff" : "#c6c6c6"}
              />
              <Text
                style={{
                  color: focused ? "#7f3dff" : "#c6c6c6",
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              <Octicons
                name="arrow-switch"
                size={36}
                color={focused ? "#7f3dff" : "#c6c6c6"}
              />
              <Text style={{ color: focused ? "#7f3dff" : "#c6c6c6" }}>
                Transactions
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Plus"
        component={() => null} // No direct component rendering
        options={{
          tabBarButton: () => (
            <View style={styles.centeredContainer}>
              {isExpanded && (
                <View style={styles.actionContainer}>
                  <TouchableOpacity
                    style={styles.addIncomeButton}
                    onPress={() => navigation.navigate("AddIncome")}
                    // onPress={() => console.log("Add Income")}
                  >
                    <Ionicons name="arrow-up-circle" size={40} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.addExpenseButton}
                    onPress={() => navigation.navigate("AddExpense")}
                    // onPress={() => console.log("Add Expense")}
                  >
                    <Ionicons name="arrow-down-circle" size={40} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                style={styles.plusButton}
                onPress={togglePlusButton}
              >
                <Animated.View style={rotateStyle}>
                  <Octicons name="plus" size={36} color="white" />
                </Animated.View>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Budget"
        component={Budget}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Foundation
                name="graph-pie"
                size={36}
                color={focused ? "#7f3dff" : "#c6c6c6"}
              />
              <Text style={{ color: focused ? "#7f3dff" : "#c6c6c6" }}>
                Budget
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome
                name="user"
                size={36}
                color={focused ? "#7f3dff" : "#c6c6c6"}
              />
              <Text style={{ color: focused ? "#7f3dff" : "#c6c6c6" }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  plusButton: {
    top: Platform.OS === "android" ? -10 : -20,
    width: Platform.OS === "android" ? 50 : 60,
    height: Platform.OS === "android" ? 50 : 60,
    borderRadius: Platform.OS === "android" ? 25 : 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7f3dff",
  },
  actionContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 80,
    justifyContent: "space-between",
    width: 150,
    marginBottom: 10,
  },
  addIncomeButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#00a86b",
    marginHorizontal: 10,
  },
  addExpenseButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fd3c4a",
    marginHorizontal: 10,
  },
});

export default TabBar;
