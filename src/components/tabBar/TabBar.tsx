import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../../screens/profile/Profile";
import Transactions from "../../screens/transactions/Transactions";
import Budget from "../../screens/budget/Budget";
import HomeScreen from "../../screens/homeScreen/HomeScreen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./TabBar.style";
import { useTabBar } from "./useTabBar";

const Tab = createBottomTabNavigator();

const TabBar = () => {
  const { isExpanded, togglePlusButton, rotateStyle, navigation } = useTabBar();

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
            <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <MaterialCommunityIcons
                name="home-lightbulb"
                size={36}
                color={focused ? "#7f3dff" : "#c6c6c6"}
              />
              <Text style={{ color: focused ? "#7f3dff" : "#c6c6c6", minWidth: 43, textAlign: "center" }}>
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
            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 2 }}>
              <Octicons name="arrow-switch" size={36} color={focused ? "#7f3dff" : "#c6c6c6"} />
              <Text style={{ color: focused ? "#7f3dff" : "#c6c6c6", minWidth: 73, textAlign: "center" }}>
                Transaction
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Plus"
        options={{
          tabBarButton: () => (
            <View style={styles.centeredContainer}>
              {isExpanded && (
                <View style={styles.actionContainer}>
                  <TouchableOpacity style={styles.addIncomeButton} onPress={() => navigation.navigate("AddIncome")}>
                    <Ionicons name="arrow-up-circle" size={40} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.addExpenseButton} onPress={() => navigation.navigate("AddExpense")}>
                    <Ionicons name="arrow-down-circle" size={40} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity style={styles.plusButton} onPress={togglePlusButton}>
                <Animated.View style={rotateStyle}>
                  <Octicons name="plus" size={36} color="white" />
                </Animated.View>
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        {() => null}
      </Tab.Screen>
      <Tab.Screen
        name="Budget"
        component={Budget}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Foundation name="graph-pie" size={36} color={focused ? "#7f3dff" : "#c6c6c6"} />
              <Text style={{ color: focused ? "#7f3dff" : "#c6c6c6", minWidth: 45, textAlign: "center" }}>
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
              <FontAwesome name="user" size={36} color={focused ? "#7f3dff" : "#c6c6c6"} />
              <Text style={{ color: focused ? "#7f3dff" : "#c6c6c6", minWidth: 43, textAlign: "center" }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;
