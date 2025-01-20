import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

type RecentTransactionsProps = {
  recentText: string;
  enableShowMore: boolean;
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  recentText = "Recent Transactions",
  enableShowMore = false,
}) => {
  const [showAll, setShowAll] = useState(false);

  const transactions = [
    {
      id: 1,
      category: "Shopping",
      description: "Buy some Grocery and food",
      price: -38,
      time: "10:00 AM",
    },
    {
      id: 2,
      category: "Food",
      description: "Lunch at restaurant",
      price: -25,
      time: "11:00 AM",
    },
    {
      id: 3,
      category: "Shopping",
      description: "Buy a book",
      price: -15,
      time: "01:00 PM",
    },
    {
      id: 4,
      category: "Utilities",
      description: "Electricity Bill",
      price: -60,
      time: "02:00 PM",
    },
    {
      id: 5,
      category: "Transport",
      description: "Uber ride",
      price: -20,
      time: "03:00 PM",
    },
    {
      id: 6,
      category: "Subscription",
      description: "Spotify Monthly",
      price: -10,
      time: "04:00 PM",
    },
  ];

  const displayedTransactions = showAll
    ? transactions
    : transactions.slice(0, 3);

  const truncateDescription = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "Food":
        return {
          iconBackgroundColor: "#fdd5d7",
          iconColor: "#fd3c4a",
          iconName: "restaurant",
        };
      case "Shopping":
        return {
          iconBackgroundColor: "#fceed4",
          iconColor: "#fcac12",
          iconName: "cart",
        };
      case "Utilities":
        return {
          iconBackgroundColor: "#e6f7ff",
          iconColor: "#007bff",
          iconName: "bulb",
        };
      case "Transport":
        return {
          iconBackgroundColor: "#f5f5f5",
          iconColor: "#6c757d",
          iconName: "car-sport",
        };
      case "Subscription":
        return {
          iconBackgroundColor: "#eee5ff",
          iconColor: "#7f3dff",
          iconName: "musical-notes",
        };
      default:
        return {
          iconBackgroundColor: "#f0f0f0",
          iconColor: "#6c757d",
          iconName: "help-circle",
        };
    }
  };

  return (
    <>
      <View style={styles.textAndButtonCont}>
        <Text style={styles.RecentText}>{recentText}</Text>
        {enableShowMore && (
          <TouchableOpacity onPress={() => setShowAll(!showAll)}>
            <Text style={styles.SeeAllButton}>
              {showAll ? "See Less" : "See All"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.container}>
        {displayedTransactions.map((transaction) => {
          const { iconBackgroundColor, iconColor, iconName } =
            getCategoryStyles(transaction.category);

          return (
            <View key={transaction.id} style={styles.CardContainer}>
              <View style={styles.CategoryContainer}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: iconBackgroundColor },
                  ]}
                >
                  <Ionicons
                    name={iconName}
                    size={60}
                    color={iconColor}
                    style={styles.icon}
                  />
                </View>
                <View style={{ flexDirection: "column", gap: 8 }}>
                  <Text style={styles.IncomeText}>{transaction.category}</Text>
                  <Text style={styles.BuyText}>
                    {truncateDescription(transaction.description, 17)}
                  </Text>
                </View>
              </View>
              <View style={styles.TransactionInfo}>
                <Text style={styles.PriceText}>
                  {transaction.price < 0
                    ? `- $${Math.abs(transaction.price)}`
                    : `$${transaction.price}`}
                </Text>
                <Text style={styles.TiemText}>{transaction.time}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default RecentTransactions;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textAndButtonCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  RecentText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  SeeAllButton: {
    backgroundColor: "#eee5ff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    color: "#8647ff",
    fontWeight: "bold",
    fontSize: 16,
  },
  CategoryContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flex: 1,
  },
  IncomeText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  PriceText: {
    color: "#fd3c4a",
    fontSize: 18,
    fontWeight: "bold",
  },
  TiemText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
  },
  BuyText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconContainer: {
    padding: 10,
    borderRadius: 15,
  },
  icon: {
    marginRight: 5,
  },
  CardContainer: {
    marginTop: 10,
    backgroundColor: "#fcfcfc",
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: "space-between",
    width: "90%", // Max width for mobile screens
    overflow: "hidden",
  },
  TransactionInfo: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingRight: 10,
  },
});
