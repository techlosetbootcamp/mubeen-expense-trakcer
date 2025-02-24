import React from "react";
import { ScrollView, View } from "react-native";
import Navbar from "../../components/navbar/Navbar";
import AccountBalanceCard from "../../components/accountBalanceCard/AccountBalanceCard";
import RecentTransactions from "../../components/recentTransactions/RecentTransactions";
import LineGraph from "../../components/lineGraph/LineGraph";
import styles from "./HomeScreen.style";
import uesHomeScreen from "./uesHomeScreen";

const HomeScreen = () => {

  const {
    dispatch,
    userProfile,
    useEffect
  } = uesHomeScreen()

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Navbar
          profilePicture={userProfile.profilePicture}
          name={userProfile.name}
        />
        <AccountBalanceCard />
        <LineGraph />
        <RecentTransactions
          recentText="Recent Transactions"
          enableShowMore={true}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;