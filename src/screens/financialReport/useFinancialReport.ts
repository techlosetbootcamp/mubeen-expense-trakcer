import { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { database } from "../../config/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useAppSelector } from "../../store/store";


const screenWidth = Dimensions.get("window").width;

const useFinancialReport = () => {

    const navigation: any = useNavigation();
    const user = useAppSelector((state) => state.user.user);

    const [selectedMonth, setSelectedMonth] = useState("Month");
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedType, setSelectedType] = useState<"expense" | "income">(
        "expense"
    );

    useEffect(() => {
        if (!user) return;

        const expenseRef = ref(database, `expenses/${user.uid}`);
        const incomeRef = ref(database, `incomes/${user.uid}`);

        const fetchTransactions = (refPath: any, type: "expense" | "income") => {
            onValue(refPath, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const transactionList = Object.keys(data).map((key) => ({
                        id: key,
                        type,
                        ...data[key],
                    }));
                    setTransactions((prev) => [
                        ...prev.filter((t) => t.type !== type),
                        ...transactionList,
                    ]);
                } else {
                    setTransactions((prev) => prev.filter((t) => t.type !== type));
                }
            });
        };

        fetchTransactions(expenseRef, "expense");
        fetchTransactions(incomeRef, "income");

        return () => {
            setTransactions([]);
        };
    }, [user]);

    const handleSelect = (month: string) => {
        setSelectedMonth(month);
        setIsDropdownVisible(false);
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const getCategoryColors = (category: string) => {
        const categoryColors: { [key: string]: string } = {
            "Food & Dining": "#fd3c4a",
            Shopping: "#fcac12",
            Transportation: "#6c757d",
            Entertainment: "#ff9800",
            Healthcare: "#2196f3",
            "Rent & Bills": "#007bff",
            Travel: "#4caf50",
            Education: "#673ab7",
            Investments: "#388e3c",
            Salary: "#28a745",
            Business: "#007bff",
            Freelancing: "#6c757d",
            "Overtime Pay": "#9c27b0",
            "Bonuses and Incentives": "#ff9800",
            "Stock Dividends": "#4caf50",
            "Rental Income (from property)": "#0097a7",
            "Cryptocurrency Gains": "#ff5722",
            "Child Support/Alimony": "#ff9800",
            "Scholarships/Grants": "#1565c0",
            Royalties: "#673ab7",
            "Lottery or Gambling Winnings": "#dc3545",
            "Gifts or Donations Received": "#28a745",
            "Income from Side Hustles": "#e91e63",
        };
        return categoryColors[category] || "#6c757d"; // Default color
    };

    const getFilteredTransactions = () => {
        return transactions.filter((tx) => {
            const transactionMonth = new Date(tx.timestamp).toLocaleString("en-US", {
                month: "long",
            });
            return (
                (selectedMonth === "Month" || transactionMonth === selectedMonth) &&
                tx.type === selectedType
            );
        });
    };

    const getChartData = () => {
        const filteredTransactions = getFilteredTransactions();
        const categories = filteredTransactions.reduce((acc: any, tx) => {
            if (!acc[tx.category]) {
                acc[tx.category] = { amount: 0, color: getCategoryColors(tx.category) };
            }
            acc[tx.category].amount += parseFloat(tx.amount);
            return acc;
        }, {});

        return Object.keys(categories).map((category) => ({
            name: category.length > 13 ? `${category.slice(0, 13)}...` : category,
            barGraphname: category,
            population: categories[category].amount,
            color: categories[category].color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 12,
        }));
    };


    return {
        navigation,
        user,
        selectedMonth,
        setSelectedMonth,
        transactions,
        setTransactions,
        isDropdownVisible,
        setIsDropdownVisible,
        selectedType,
        setSelectedType,
        useEffect,
        handleSelect,
        toggleDropdown,
        getCategoryColors,
        getFilteredTransactions,
        getChartData,
        screenWidth
    }
}

export default useFinancialReport

