import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./RecentTransactions.style";
import { useRecentTransactions } from "./useRecentTransactions";
import { useAppSelector } from "../../store/store";
import { baseStyles } from "../../constants/baseStyles";
import { currencySymbols } from "../../constants/currencySymbols";

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
    currencySymbol,
    selectedCurrency
  } = useRecentTransactions();
  

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
              <View style={styles.CardContainer}>
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
                          ? `${transaction.category.slice(0, 10)}...`
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