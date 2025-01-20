import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setUserProfile } from "../store/slices";
import { getAuth } from "firebase/auth";
import Navbar from "../components/Navbar";
import AccountBalanceCard from "../components/AccountBalanceCard";
import RecentTransactions from "../components/RecentTransactions";
import LineGraph from "../components/LineGraph";

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchUserData = () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        dispatch(
          setUserProfile({
            profilePicture: user.photoURL || "",
            name: user.displayName || "",
          })
        );
      }
    };

    fetchUserData();
  }, [dispatch]);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
