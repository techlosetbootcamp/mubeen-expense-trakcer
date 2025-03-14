import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { onValue, ref } from 'firebase/database';
import { database } from '../../config/firebaseConfig';
import axios from 'axios';
import { exchangeRateApiUrl } from "../../constants/exchangeRateApi";
import { baseStyles } from '../../constants/baseStyles';
import { currencySymbols } from '../../constants/currencySymbols';
import { Transaction } from '../../constants/types/stateTypes';
import { StackNavigationParamList } from '../../constants/types/navigationTypes';

const useTransaction = () => {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [filteredTransactionsData, setFilteredTransactionsData] = useState<Transaction[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [transactions, setTransactions] = useState<any[]>([]);
  const user = useAppSelector((state) => state?.user?.user);
  const [exchangeRates, setExchangeRates] = useState({});
  const selectedCurrency = useAppSelector((state) => state?.user?.selectedCurrency);
  const navigation: any = useNavigation();
  const [transactionsToDisplay, setTransactionsToDisplay] = useState<{ [key: string]: any[] }>({});
  const [hasDisplayableTransactions, setHasDisplayableTransactions] = useState(false);
  const currencySymbol = currencySymbols[selectedCurrency] || selectedCurrency;


  useEffect(() => {
    if (!user) return;

    const expensesRef = ref(database, `expenses/${user?.uid}`);
    const incomesRef = ref(database, `incomes/${user?.uid}`);

    const handleTransactions = (snapshot: any, type: "expense" | "income") => {
      if (snapshot.exists()) {
        const data = snapshot?.val();
        return Object.keys(data)?.map((key) => ({
          id: key,
          ...data[key],
          type,
        }));
      }
      return [];
    };

    const unsubscribeExpenses = onValue(expensesRef, (snapshot) => {
      const expenseData = handleTransactions(snapshot, "expense");
      setTransactions((prev) => [...expenseData, ...prev.filter(t => t.type !== "expense")].sort((a, b) => b?.timestamp?.localeCompare(a?.timestamp)));
    });

    const unsubscribeIncomes = onValue(incomesRef, (snapshot) => {
      const incomeData = handleTransactions(snapshot, "income");
      setTransactions((prev) => [...incomeData, ...prev.filter(t => t.type !== "income")].sort((a, b) => b?.timestamp?.localeCompare(a?.timestamp)));
    });

    return () => {
      unsubscribeExpenses();
      unsubscribeIncomes();
    };
  }, [user]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios?.get(exchangeRateApiUrl);
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
      const convertedAmount = amount * exchangeRates[selectedCurrency as keyof typeof exchangeRates];
      return convertedAmount?.toFixed(0);
    }
    return amount;
  };

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const handleSelect = (month: string) => {
    setSelectedMonth(month);
    setIsDropdownVisible(false);
  };

  const resetMonthFilter = () => setSelectedMonth("Month");

  const filterTransactionsByMonth = () => {
    const today = new Date()?.toISOString()?.split("T")[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday?.getDate() - 1);
    const yesterdayStr = yesterday?.toISOString()?.split("T")[0];

    let filtered: { [key: string]: any[] } = {};

    if (selectedMonth !== "Month") {
      filtered[selectedMonth] = transactions?.filter(
        (tx) => new Date(tx?.timestamp).toLocaleString("en-US", { month: "long" }) === selectedMonth
      );
    } else if (!selectedFilter && !selectedSort && selectedCategories.length === 0) {
      const todayTransactions = transactions?.filter((tx) => tx.timestamp.split("T")[0] === today);
      const yesterdayTransactions = transactions?.filter((tx) => tx?.timestamp?.split("T")[0] === yesterdayStr);

      if (todayTransactions?.length > 0) filtered["Today"] = todayTransactions;
      if (yesterdayTransactions?.length > 0) filtered["Yesterday"] = yesterdayTransactions;
    }

    setTransactionsToDisplay(filtered);
    setHasDisplayableTransactions(Object?.keys(filtered)?.length > 0);
    return filtered;
  };

  useEffect(() => {
    if (!selectedFilter && !selectedSort && selectedCategories?.length === 0) {
      const filteredTransactions = filterTransactionsByMonth();
      setTransactionsToDisplay(filteredTransactions);
      setHasDisplayableTransactions(Object.keys(filteredTransactions)?.length > 0);
    }
  }, [transactions, selectedMonth, selectedFilter, selectedSort, selectedCategories]);

  const toggleFilterModal = () => setIsFilterModalVisible(!isFilterModalVisible);

  const toggleCategoryModal = () => setIsCategoryModalVisible(!isCategoryModalVisible);

  const applyFilters = () => {
    let filtered = [...transactions];

    // Apply type filter
    if (selectedFilter) {
      filtered = filtered?.filter((tx) => tx?.type === selectedFilter);
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((tx) => selectedCategories?.includes(tx?.category));
    }

    // Apply sort
    if (selectedSort) {
      switch (selectedSort) {
        case "highest":
          filtered.sort((a, b) => b?.amount - a?.amount);
          break;
        case "lowest":
          filtered.sort((a, b) => a?.amount - b?.amount);
          break;
        case "newest":
          filtered.sort((a, b) => b?.timestamp?.localeCompare(a?.timestamp));
          break;
        case "oldest":
          filtered.sort((a, b) => a?.timestamp?.localeCompare(b?.timestamp));
          break;
      }
    }

    setTransactionsToDisplay({ "Filtered Transactions": filtered });
    setHasDisplayableTransactions(filtered.length > 0);
    setFilteredTransactionsData(filtered);
    toggleFilterModal();
  };

  const resetFilters = () => {
    setSelectedFilter(null);
    setSelectedSort(null);
    setSelectedCategories([]);
    setFilteredTransactionsData([]);
    filterTransactionsByMonth(); // Reset to default Today/Yesterday view
    setIsFilterModalVisible(false);
  };


  return {
    isFilterModalVisible,
    setIsFilterModalVisible,
    selectedFilter,
    setSelectedFilter,
    selectedSort,
    setSelectedSort,
    selectedCategories,
    setSelectedCategories,
    isCategoryModalVisible,
    setIsCategoryModalVisible,
    filteredTransactionsData,
    setFilteredTransactionsData,
    isDropdownVisible,
    setIsDropdownVisible,
    selectedMonth,
    setSelectedMonth,
    transactions,
    setTransactions,
    user,
    navigation,
    toggleDropdown,
    handleSelect,
    resetMonthFilter,
    filterTransactionsByMonth,
    toggleFilterModal,
    toggleCategoryModal,
    applyFilters,
    resetFilters,
    hasDisplayableTransactions,
    transactionsToDisplay,
    formatAmount,
    currencySymbol,
  };
};

export default useTransaction;