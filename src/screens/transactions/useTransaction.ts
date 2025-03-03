import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/store';
import { useNavigation } from '@react-navigation/native';
import { onValue, ref } from 'firebase/database';
import { database } from '../../config/firebaseConfig';
import axios from 'axios';
import { exchangeRateApiUrl } from "../../constants/exchangeRateApi";

const useTransaction = () => {
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [selectedSort, setSelectedSort] = useState<string | null>(null);
    const [filteredTransactionsData, setFilteredTransactionsData] = useState<any[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("Month");
    const [transactions, setTransactions] = useState<any[]>([]);
    const user = useAppSelector((state) => state.user.user);
    const [exchangeRates, setExchangeRates] = useState({});
    const selectedCurrency = useAppSelector((state) => state.user.selectedCurrency);
    const navigation: any = useNavigation();
    const [transactionsToDisplay, setTransactionsToDisplay] = useState<{[key: string]: any[]}>({});
    const [hasDisplayableTransactions, setHasDisplayableTransactions] = useState(false);

    useEffect(() => {
        if (!user) return;

        const expensesRef = ref(database, `expenses/${user.uid}`);
        const incomesRef = ref(database, `incomes/${user.uid}`);

        const handleTransactions = (snapshot: any, type: "expense" | "income") => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const transactionsList = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                    type,
                }));
                return transactionsList;
            }
            return [];
        };

        const unsubscribeExpenses = onValue(expensesRef, (snapshot) => {
            const expenseData = handleTransactions(snapshot, "expense");
            setTransactions((prev) => [...expenseData, ...prev].sort((a, b) => b.timestamp.localeCompare(a.timestamp)));
        });

        const unsubscribeIncomes = onValue(incomesRef, (snapshot) => {
            const incomeData = handleTransactions(snapshot, "income");
            setTransactions((prev) => [...incomeData, ...prev].sort((a, b) => b.timestamp.localeCompare(a.timestamp)));
        });

        return () => {
            unsubscribeExpenses();
            unsubscribeIncomes();
        };
    }, [user]);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await axios.get(exchangeRateApiUrl);
                const rates = response.data.conversion_rates;
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
            return convertedAmount.toFixed(0); // Format to 2 decimal places
        }
        return amount;
    }

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleSelect = (month: string) => {
        setSelectedMonth(month);
        setIsDropdownVisible(false);
    };

    const resetMonthFilter = () => {
        setSelectedMonth("Month");
    };

    const filterTransactionsByMonth = () => {
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        let filtered: {[key: string]: any[]} = {};

        if (selectedMonth !== "Month") {
            filtered = {
                [selectedMonth]: transactions.filter(
                    (tx) =>
                        new Date(tx.timestamp).toLocaleString("en-US", { month: "long" }) === selectedMonth
                ),
            };
        } else {
            const todayTransactions = transactions.filter((tx) => tx.timestamp.split("T")[0] === today);
            const yesterdayTransactions = transactions.filter((tx) => tx.timestamp.split("T")[0] === yesterdayStr);

            if (todayTransactions.length > 0) {
                filtered["Today"] = todayTransactions;
            }

            if (yesterdayTransactions.length > 0) {
                filtered["Yesterday"] = yesterdayTransactions;
            }
        }

        setTransactionsToDisplay(filtered);
        setHasDisplayableTransactions(Object.keys(filtered).length > 0);
        return filtered;
    };

    useEffect(() => {
        const filteredTransactions = filterTransactionsByMonth();
        setTransactionsToDisplay(filteredTransactions);
        setHasDisplayableTransactions(Object.keys(filteredTransactions).length > 0);

    }, [transactions, selectedMonth]);

    const toggleFilterModal = () => {
        setIsFilterModalVisible(!isFilterModalVisible);
    };

    const getCategoryStyles = (category: string) => {
        // Your category style logic here
        return {
            iconBackgroundColor: "#f2f2f2",
            iconColor: "#333",
            iconName: "help-outline",
        };
    };

    const applyFilters = () => {
        // Your filter logic here
    };

    const handleResetFilters = () => {
        // Your reset filter logic here
    };

    const resetAllFilters = () => {
        resetMonthFilter();
        // Reset other filters as needed
    };

    return {
        isFilterModalVisible,
        setIsFilterModalVisible,
        selectedFilter,
        setSelectedFilter,
        selectedSort,
        setSelectedSort,
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
        getCategoryStyles,
        applyFilters,
        handleResetFilters,
        resetAllFilters,
        hasDisplayableTransactions,
        transactionsToDisplay,
        formatAmount,
    };
};

export default useTransaction;
