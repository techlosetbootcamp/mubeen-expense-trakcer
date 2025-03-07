import { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { database } from "../../config/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useAppSelector } from "../../store/store";
import axios from "axios";
import { exchangeRateApiUrl } from "../../constants/exchangeRateApi";
import { categories } from '../../constants/Categories';
import { incomeCategories } from '../../constants/Categories';
import { getCategoryColors } from '../../constants/Categories';

const screenWidth = Dimensions?.get("window")?.width;

const useFinancialReport = () => {
  const navigation: any = useNavigation();
  const user = useAppSelector((state) => state?.user?.user);
  const selectedCurrency = useAppSelector((state) => state?.user?.selectedCurrency);

  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isMonthDropdownVisible, setIsMonthDropdownVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<"expense" | "income">("expense");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(exchangeRateApiUrl);
        const rates = response?.data?.conversion_rates;
        setExchangeRates(rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };
    fetchExchangeRates();
  }, []);

  const formatAmount = (amount: number) => {
    if (selectedCurrency && selectedCurrency in exchangeRates) {
      const convertedAmount = amount * (exchangeRates[selectedCurrency as keyof typeof exchangeRates] || 1);
      return convertedAmount?.toFixed(0);
    }
    return amount?.toFixed(0);
  };

  useEffect(() => {
    if (!user) return;

    const expenseRef = ref(database, `expenses/${user?.uid}`);
    const incomeRef = ref(database, `incomes/${user?.uid}`);

    const fetchTransactions = (refPath: any, type: "expense" | "income") => {
      return onValue(refPath, (snapshot) => {
        const transactionList = snapshot.exists()
          ? Object.keys(snapshot.val()).map((key) => ({
              id: key,
              type,
              ...snapshot.val()[key],
            }))
          : [];

        setTransactions((prev) => {
          const updatedTransactions = [
            ...prev.filter((t) => t.type !== type), // Remove old transactions of this type
            ...transactionList, // Add new ones
          ];
          return updatedTransactions;
        });

        // Apply filters immediately after updating transactions
        applyFilters();
      });
    };

    const unsubscribeExpense = fetchTransactions(expenseRef, "expense");
    const unsubscribeIncome = fetchTransactions(incomeRef, "income");

    return () => {
      unsubscribeExpense();
      unsubscribeIncome();
      setTransactions([]);
    };
  }, [user]);

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setIsMonthDropdownVisible(false);
    applyFilters(month, selectedCategories);
  };

  const toggleMonthDropdown = () => {
    setIsMonthDropdownVisible(!isMonthDropdownVisible);
  };

  const toggleCategoryModal = () => {
    setIsCategoryModalVisible(!isCategoryModalVisible);
  };

  const applyFilters = (month = selectedMonth, cats = selectedCategories) => {
    let filtered = transactions.filter((tx) => tx.type === selectedType);

    if (month !== "Month") {
      filtered = filtered?.filter((tx) =>
        new Date(tx.timestamp)?.toLocaleString("en-US", { month: "long" }) === month
      );
    }

    if (cats.length > 0) {
      filtered = filtered?.filter((tx) => cats?.includes(tx?.category));
    }

    setFilteredTransactions(filtered);
    setIsCategoryModalVisible(false);
  };

  const resetFilters = () => {
    setSelectedMonth("Month");
    setSelectedCategories([]);
    setFilteredTransactions(transactions.filter((tx) => tx.type === selectedType));
    setIsCategoryModalVisible(false);
  };

  const getCategoriesForType = () => {
    return selectedType === "income" ? incomeCategories : categories;
  };

  const getFilteredTransactions = () => {
    return filteredTransactions.length > 0
      ? filteredTransactions
      : transactions.filter((tx) => tx.type === selectedType);
  };

  const getChartData = () => {
    const filtered = getFilteredTransactions();
    const categoryTotals = filtered?.reduce((acc: any, tx) => {
      if (!acc[tx?.category]) {
        acc[tx?.category] = { amount: 0, color: getCategoryColors(tx?.category) };
      }
      acc[tx.category].amount += parseFloat(tx.amount || "0");
      return acc;
    }, {});

    return Object.keys(categoryTotals).map((category) => ({
      name: category?.length > 13 ? `${category?.slice(0, 13)}...` : category,
      barGraphname: category,
      population: categoryTotals[category]?.amount,
      color: categoryTotals[category]?.color,
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    }));
  };

  const getTotalAmount = () => {
    const filtered = getFilteredTransactions();
    const total = filtered.reduce((sum, tx) => sum + parseFloat(tx?.amount || "0"), 0);
    return Number(formatAmount(total));
  };

  useEffect(() => {
    applyFilters();
  }, [selectedType, transactions]);

  return {
    navigation,
    selectedMonth,
    setSelectedMonth,
    isMonthDropdownVisible,
    setIsMonthDropdownVisible,
    selectedType,
    setSelectedType,
    selectedCategories,
    setSelectedCategories,
    isCategoryModalVisible,
    setIsCategoryModalVisible,
    handleMonthSelect,
    toggleMonthDropdown,
    toggleCategoryModal,
    applyFilters,
    resetFilters,
    getChartData,
    getTotalAmount,
    screenWidth,
    formatAmount,
    getCategoriesForType,
  };
};

export default useFinancialReport;