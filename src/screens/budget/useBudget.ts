import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from "react";
import { database, auth } from "../../config/firebaseConfig"; // Import Firebase
import { ref, push, onValue } from "firebase/database";
import { useAppSelector } from "../../store/store";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;

const categoriesList = ["Food & Dining", "Shopping", "Transportation", "Entertainment", "Healthcare", "Rent & Bills", "Travel", "Education", "Investments", "Other"];
const durationList = ["Day", "Week", "Month", "Year"];

const exchangeRateApiUrl = "https://v6.exchangerate-api.com/v6/46d49f7b580e6aefec6a3578/latest/USD";

const useBudget = () => {
  const [budgets, setBudgets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [exchangeRates, setExchangeRates] = useState({});

  // Access expenses from Redux
  const expenses = useAppSelector((state) => state.expense.expenses);
  const selectedCurrency = useAppSelector((state) => state.user.selectedCurrency);

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
    if (selectedCurrency && exchangeRates && selectedCurrency in exchangeRates) {
      const convertedAmount = amount * exchangeRates[selectedCurrency as keyof typeof exchangeRates];
      return convertedAmount.toFixed(2); // Format to 2 decimal places
    }
    return amount.toFixed(2); // Default to original amount if no conversion rate is available
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const budgetRef = ref(database, `users/${user.uid}/budgets`);

      // Set up a listener for real-time updates
      const unsubscribe = onValue(budgetRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert the object of objects into an array of objects
          const budgetList = Object.keys(data).map(key => ({
            id: key, // Use the Firebase key as the ID
            ...data[key]
          }));
          setBudgets(budgetList);
        } else {
          setBudgets([]); // Set to empty array if no data exists
        }
      });

      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    } else {
      console.log("User not logged in.");
      // Handle the case where the user is not logged in (e.g., redirect to login)
    }
  }, []);

  // Function to add budget
  const handleAddBudget = () => {
    if (selectedCategory && budgetAmount && selectedDuration) {
      const user = auth.currentUser;
      if (!user) {
        console.log("User not logged in.");
        return;
      }

      const newBudget = {
        category: selectedCategory,
        amount: parseFloat(budgetAmount),
        duration: selectedDuration,
      };

      const budgetRef = ref(database, `users/${user.uid}/budgets`); // Reference to the user's budgets

      push(budgetRef, newBudget)
        .then(() => {
          // Budget added successfully
          setModalVisible(false);
          setSelectedCategory("");
          setBudgetAmount("");
          setSelectedDuration("");
        })
        .catch((error) => {
          console.error("Error adding budget:", error);
          alert("Failed to add budget.");
        });
    }
  };

  // Function to calculate expenses for a given category
  const calculateExpenses = (category: string) => {
    return expenses.filter(expense => expense.category.includes(category)).reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 5) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return {
    budgets,
    setBudgets,
    modalVisible,
    setModalVisible,
    selectedCategory,
    setSelectedCategory,
    budgetAmount,
    setBudgetAmount,
    selectedDuration,
    setSelectedDuration,
    expenses,
    useEffect,
    handleAddBudget,
    calculateExpenses,
    chartConfig,
    screenWidth,
    categoriesList,
    durationList,
    formatAmount, // Add this function
  };
};

export default useBudget;