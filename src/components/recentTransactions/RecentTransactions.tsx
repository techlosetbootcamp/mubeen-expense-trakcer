import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./RecentTransactions.style";
import { useRecentTransactions } from "./useRecentTransactions";
import { useAppSelector } from "../../store/store";

const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  PKR: "PKR ",
  JPY: "¥",
};

type RecentTransactionsProps = {
  recentText: string;
  enableShowMore: boolean;
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  recentText = "Recent Transactions",
  enableShowMore = false,
}) => {
  const {
    displayedTransactions,
    showAll,
    setShowAll,
    transactions,
    truncateDescription,
    navigation,
    formatAmount,
  } = useRecentTransactions();
  const selectedCurrency = useAppSelector((state) => state.user.selectedCurrency as keyof typeof currencySymbols);
  const currencySymbol = currencySymbols[selectedCurrency] || selectedCurrency;

  const baseStyles = {
    "Food & Dining": { iconBackgroundColor: "#fdd5d7", iconColor: "#fd3c4a", iconName: "restaurant" },
    "Shopping": { iconBackgroundColor: "#fceed4", iconColor: "#fcac12", iconName: "cart" },
    "Transportation": { iconBackgroundColor: "#f5f5f5", iconColor: "#6c757d", iconName: "car-sport" },
    "Entertainment": { iconBackgroundColor: "#fff3cd", iconColor: "#ff9800", iconName: "film" },
    "Healthcare": { iconBackgroundColor: "#e3f2fd", iconColor: "#2196f3", iconName: "medkit" },
    "Rent & Bills": { iconBackgroundColor: "#e6f7ff", iconColor: "#007bff", iconName: "home" },
    "Travel": { iconBackgroundColor: "#e8f5e9", iconColor: "#4caf50", iconName: "airplane" },
    "Education": { iconBackgroundColor: "#ede7f6", iconColor: "#673ab7", iconName: "school" },
    "Investments": { iconBackgroundColor: "#d0f0c0", iconColor: "#388e3c", iconName: "trending-up" },
    "Salary": { iconBackgroundColor: "#d4edda", iconColor: "#28a745", iconName: "wallet" },
    "Business": { iconBackgroundColor: "#cce5ff", iconColor: "#007bff", iconName: "briefcase" },
    "Freelancing": { iconBackgroundColor: "#e9ecef", iconColor: "#6c757d", iconName: "laptop" },
    "Overtime Pay": { iconBackgroundColor: "#f3e5f5", iconColor: "#9c27b0", iconName: "timer" },
    "Bonuses and Incentives": { iconBackgroundColor: "#fff3cd", iconColor: "#ff9800", iconName: "gift" },
    "Stock Dividends": { iconBackgroundColor: "#c8e6c9", iconColor: "#4caf50", iconName: "bar-chart-outline" },
    "Rental Income (from property)": { iconBackgroundColor: "#e0f7fa", iconColor: "#0097a7", iconName: "building" },
    "Cryptocurrency Gains": { iconBackgroundColor: "#f5f5f5", iconColor: "#ff5722", iconName: "cash" },
    "Child Support/Alimony": { iconBackgroundColor: "#ffecb3", iconColor: "#ff9800", iconName: "people" },
    "Scholarships/Grants": { iconBackgroundColor: "#e3f2fd", iconColor: "#1565c0", iconName: "school" },
    "Royalties": { iconBackgroundColor: "#ede7f6", iconColor: "#673ab7", iconName: "musical-notes" },
    "Lottery or Gambling Winnings": { iconBackgroundColor: "#f5e6e6", iconColor: "#dc3545", iconName: "dice" },
    "Gifts or Donations Received": { iconBackgroundColor: "#e2f3e4", iconColor: "#28a745", iconName: "heart" },
    "Income from Side Hustles": { iconBackgroundColor: "#fce4ec", iconColor: "#e91e63", iconName: "hammer" },
    default: { iconBackgroundColor: "#f0f0f0", iconColor: "#6c757d", iconName: "help-circle" },
  };

  return (
    <>
      <View style={styles.textAndButtonCont}>
        <Text style={styles.RecentText}>{recentText}</Text>
        {enableShowMore && transactions.length > 3 && (
          <TouchableOpacity onPress={() => setShowAll(!showAll)}>
            <Text style={styles.SeeAllButton}>{showAll ? "See Less" : "See All"}</Text>
          </TouchableOpacity>
        )}
      </View>

      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No Transaction History</Text>
        </View>
      ) : (
        <View style={styles.container}>
          {displayedTransactions.map((transaction) => {
            const { iconBackgroundColor, iconColor, iconName } =
              baseStyles[transaction.category as keyof typeof baseStyles] || baseStyles.default;

            return (
              <View key={transaction.id} style={styles.CardContainer}>
                <TouchableOpacity
                  style={styles.CategoryContainer}
                  onPress={() =>
                    navigation.navigate("DetailTransaction", {
                      transactionId: transaction.id,
                      type: transaction.type,
                    })
                  }
                >
                  <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
                    <Ionicons name={iconName} size={60} color={iconColor} style={styles.icon} />
                  </View>
                  <View style={styles.TextContainer}>
                    <View style={styles.Row}>
                      <Text style={styles.IncomeText}>
                        {transaction.category.length > 15
                          ? `${transaction.category.slice(0, 15)}...`
                          : transaction.category}
                      </Text>
                      <Text
                        style={
                          transaction.type === "income" ? styles.IncomePriceText : styles.PriceText
                        }
                      >
                        {transaction.type === "income" ? "+ " : "- "} {currencySymbol}{formatAmount(transaction.amount)}
                      </Text>
                    </View>
                    <View style={styles.Row}>
                      <Text style={styles.BuyText}>
                        {truncateDescription(transaction.description, 17)}
                      </Text>
                      <Text style={styles.TiemText}>
                        {transaction.timestamp?.split("T")[1]?.slice(0, 5) || "N/A"}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </>
  );
};

export default RecentTransactions;