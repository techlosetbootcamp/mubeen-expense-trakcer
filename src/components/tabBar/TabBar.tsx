import React from "react";
import { View, Text, TouchableOpacity, Animated, Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../../screens/profile/Profile";
import Transactions from "../../screens/transactions/Transactions";
import Budget from "../../screens/budget/Budget";
import HomeScreen from "../../screens/homeScreen/HomeScreen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import styles from "./TabBar.style";
import { useTabBar } from "./useTabBar";

const Tab = createBottomTabNavigator();

const TabBar = () => {
  const { isExpanded, togglePlusButton, rotateStyle, navigation } = useTabBar();

  return (
    <>
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
            zIndex: 2,
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
                <View>
                  <Image
                    source={require('../../constants/icons/Transaction.png')}
                    style={{
                      width: 33,
                      height: 33,
                      resizeMode: 'contain',
                      marginTop: 12,
                      tintColor: focused ? "#7f3dff" : "#c6c6c6",
                    }}
                  />
                </View>
                <Text style={{ color: focused ? "#7f3dff" : "#c6c6c6", minWidth: 80, textAlign: "center" }}>
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
                      <View style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: "#00a86b",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        <Image
                          source={require('../../constants/icons/income2.png')}
                          style={{ width: 30, height: 30, resizeMode: 'contain' }}
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addExpenseButton} onPress={() => navigation.navigate("AddExpense")}>
                      <View style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: "#fd3c4a",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        <Image
                          source={require('../../constants/icons/expense2.png')}
                          style={{ width: 30, height: 30, resizeMode: 'contain' }}
                        />
                      </View>
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
      {isExpanded && (
        <View style={styles.overlay} />
      )}
    </>
  );
};

export default TabBar;