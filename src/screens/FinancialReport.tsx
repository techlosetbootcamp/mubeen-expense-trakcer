import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const FinancialReport = () => {
  const navigation: any = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AntDesign
        name="arrowleft"
        size={24}
        color="black"
        onPress={() => navigation.navigate("Transactions")}
      />
      <Text>FinancialReport</Text>
    </View>
  );
};

export default FinancialReport;

const styles = StyleSheet.create({});
