import { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/store';
import { useNavigation } from '@react-navigation/native';
import { onValue, ref } from 'firebase/database';
import { database } from '../../config/firebaseConfig';

const useTransaction = () => {

    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [selectedSort, setSelectedSort] = useState<string | null>(null);
    const [filteredTransactionsData, setFilteredTransactionsData] = useState<any[]>([]);

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("Month");
    const [transactions, setTransactions] = useState<any[]>([]);
    const user = useAppSelector((state) => state.user.user);
    const navigation: any = useNavigation();

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
                    type, // Identifies income vs expense
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

        return selectedMonth !== "Month"
            ? {
                [selectedMonth]: transactions.filter(
                    (tx) =>
                        new Date(tx.timestamp).toLocaleString("en-US", { month: "long" }) === selectedMonth
                ),
            }
            : {
                Today: transactions.filter((tx) => tx.timestamp.split("T")[0] === today),
                Yesterday: transactions.filter((tx) => tx.timestamp.split("T")[0] === yesterdayStr),
            };
    };

    const toggleFilterModal = () => {
        setIsFilterModalVisible(!isFilterModalVisible);
    };

    const getCategoryStyles = (category: string) => {
        switch (category) {
            case "Food & Dining":
                return { iconBackgroundColor: "#fdd5d7", iconColor: "#fd3c4a", iconName: "restaurant" };
            case "Shopping":
                return { iconBackgroundColor: "#fceed4", iconColor: "#fcac12", iconName: "cart" };
            case "Transportation":
                return { iconBackgroundColor: "#f5f5f5", iconColor: "#6c757d", iconName: "car-sport" };
            case "Entertainment":
                return { iconBackgroundColor: "#fff3cd", iconColor: "#ff9800", iconName: "film" };
            case "Healthcare":
                return { iconBackgroundColor: "#e3f2fd", iconColor: "#2196f3", iconName: "medkit" };
            case "Rent & Bills":
                return { iconBackgroundColor: "#e6f7ff", iconColor: "#007bff", iconName: "home" };
            case "Travel":
                return { iconBackgroundColor: "#e8f5e9", iconColor: "#4caf50", iconName: "airplane" };
            case "Education":
                return { iconBackgroundColor: "#ede7f6", iconColor: "#673ab7", iconName: "school" };
            case "Investments":
                return { iconBackgroundColor: "#d0f0c0", iconColor: "#388e3c", iconName: "trending-up" };
            case "Salary":
                return { iconBackgroundColor: "#d4edda", iconColor: "#28a745", iconName: "wallet" };
            case "Business":
                return { iconBackgroundColor: "#cce5ff", iconColor: "#007bff", iconName: "briefcase" };
            case "Freelancing":
                return { iconBackgroundColor: "#e9ecef", iconColor: "#6c757d", iconName: "laptop" };
            case "Overtime Pay":
                return { iconBackgroundColor: "#f3e5f5", iconColor: "#9c27b0", iconName: "timer" };
            case "Bonuses and Incentives":
                return { iconBackgroundColor: "#fff3cd", iconColor: "#ff9800", iconName: "gift" };
            case "Stock Dividends":
                return { iconBackgroundColor: "#c8e6c9", iconColor: "#4caf50", iconName: "bar-chart-outline" };
            case "Rental Income (from property)":
                return { iconBackgroundColor: "#e0f7fa", iconColor: "#0097a7", iconName: "building" };
            case "Cryptocurrency Gains":
                return { iconBackgroundColor: "#f5f5f5", iconColor: "#ff5722", iconName: "cash" };
            case "Child Support/Alimony":
                return { iconBackgroundColor: "#ffecb3", iconColor: "#ff9800", iconName: "people" };
            case "Scholarships/Grants":
                return { iconBackgroundColor: "#e3f2fd", iconColor: "#1565c0", iconName: "school" };
            case "Royalties":
                return { iconBackgroundColor: "#ede7f6", iconColor: "#673ab7", iconName: "musical-notes" };
            case "Lottery or Gambling Winnings":
                return { iconBackgroundColor: "#f5e6e6", iconColor: "#dc3545", iconName: "dice" };
            case "Gifts or Donations Received":
                return { iconBackgroundColor: "#e2f3e4", iconColor: "#28a745", iconName: "heart" };
            case "Income from Side Hustles":
                return { iconBackgroundColor: "#fce4ec", iconColor: "#e91e63", iconName: "hammer" };
            default:
                return { iconBackgroundColor: "#f0f0f0", iconColor: "#6c757d", iconName: "help-circle" };
        }
    };

    // Function to handle applying filters
    const applyFilters = () => {
        let filtered = [...transactions];

        if (selectedFilter) {
            filtered = filtered.filter((tx) => tx.type === selectedFilter);
        }

        if (selectedSort) {
            switch (selectedSort) {
                case "highest":
                    filtered.sort((a, b) => b.amount - a.amount);
                    break;
                case "lowest":
                    filtered.sort((a, b) => a.amount - b.amount);
                    break;
                case "newest":
                    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                    break;
                case "oldest":
                    filtered.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
                    break;
            }
        }

        setFilteredTransactionsData(filtered);
        setIsFilterModalVisible(false);
    };

    // Function to handle resetting filters
    const handleResetFilters = () => {
        setSelectedFilter(null);
        setSelectedSort(null);
        setFilteredTransactionsData([]);
        setIsFilterModalVisible(false); // Also close the modal on reset
    };

    const resetAllFilters = () => {
        resetMonthFilter();
        handleResetFilters();
    };

    const transactionsToDisplay = filteredTransactionsData.length > 0
        ? { "Filtered Transactions": filteredTransactionsData }
        : filterTransactionsByMonth();

    const hasDisplayableTransactions = Object.values(transactionsToDisplay).some((list) => list.length > 0);

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
        useEffect,
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
    }
}

export default useTransaction