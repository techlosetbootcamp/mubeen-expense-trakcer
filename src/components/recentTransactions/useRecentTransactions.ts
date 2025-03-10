import React, { useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../config/firebaseConfig";
import { useAppSelector } from "../../store/store";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { exchangeRateApiUrl } from "../../constants/exchangeRateApi";
import { currencySymbols } from "../../constants/currencySymbols";
import { StackNavigationParamList } from "../../constants/types/navigationTypes";
import { Transaction } from "../../constants/types/stateTypes";


export const useRecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAll, setShowAll] = useState(false);
  const user = useAppSelector((state) => state?.user?.user);
  const navigation = useNavigation<NavigationProp<StackNavigationParamList>>();

  const [exchangeRates, setExchangeRates] = React.useState({});
  const [convertedTransactions, setConvertedTransactions] = React.useState(transactions);
  const selectedCurrency = useAppSelector((state) => state?.user?.selectedCurrency as keyof typeof currencySymbols);
  const currencySymbol = currencySymbols[selectedCurrency] || selectedCurrency;

  

  const formatAmount = (amount: number) => {
    const numericAmount = Number(amount); // Convert to number
    return numericAmount?.toFixed(0);
  }
  

  React.useEffect(() => {
    if (!user) return;

    const expensesRef = ref(database, `expenses/${user?.uid}`);
    const incomesRef = ref(database, `incomes/${user?.uid}`);

    const unsubscribeExpenses = onValue(expensesRef, (snapshot) => {
      if (snapshot?.exists()) {
        const data = snapshot.val();
        const expenseList = Object?.keys(data)?.map((key) => ({
          id: key,
          ...data[key],
          type: "expense",
        }));
        setTransactions((prev) => [...expenseList, ...prev]);
      }
    });

    const unsubscribeIncomes = onValue(incomesRef, (snapshot) => {
      if (snapshot?.exists()) {
        const data = snapshot?.val();
        const incomeList = Object?.keys(data)?.map((key) => ({
          id: key,
          ...data[key],
          type: "income",
        }));
        setTransactions((prev) => [...incomeList, ...prev]);
      }
    });

    return () => {
      unsubscribeExpenses();
      unsubscribeIncomes();
    };
  }, [user]);

  React.useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(exchangeRateApiUrl);
        const rates = response?.data?.conversion_rates;
        setExchangeRates(rates);

        if (selectedCurrency && rates[selectedCurrency]) {
          const rate = rates[selectedCurrency];
          const convertedTransactionsList = transactions?.map((transaction) => ({
            ...transaction,
            amount: (parseFloat(transaction.amount) * rate)?.toString(),
          }));
          setConvertedTransactions(convertedTransactionsList);
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, [selectedCurrency, transactions]);

  const sortedTransactions = convertedTransactions.sort(
    (a, b) => new Date(b?.time).getTime() - new Date(a?.time).getTime()
  );

  const displayedTransactions = showAll
    ? sortedTransactions
    : sortedTransactions.slice(0, 3);

  const truncateDescription = (text: string, maxLength: number) => {
    return text?.length > maxLength ? text?.slice(0, maxLength) + "..." : text;
  };

  return {
    displayedTransactions,
    showAll,
    setShowAll,
    transactions: convertedTransactions,
    truncateDescription,
    navigation,
    formatAmount,
    currencySymbol,
    selectedCurrency
  };
};
