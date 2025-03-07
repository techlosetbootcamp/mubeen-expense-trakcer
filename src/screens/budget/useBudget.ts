import { Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { database, auth } from "../../config/firebaseConfig";
import { ref, push, onValue } from "firebase/database";
import { useAppSelector, useAppDispatch } from "../../store/store";
import axios from "axios";
import { exchangeRateApiUrl } from "../../constants/exchangeRateApi";
import * as Notifications from "expo-notifications";
import { categories } from "../../constants/Categories";
import { durationList } from "../../constants/MonthsNames";

const screenWidth = Dimensions.get("window").width;


const useBudget = () => {
  const [budgets, setBudgets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [exchangeRates, setExchangeRates] = useState({});

  const expenses = useAppSelector((state) => state?.expense?.expenses);
  const selectedCurrency = useAppSelector((state) => state?.user?.selectedCurrency);
  const notifiedBudgetIds = useAppSelector((state) => state?.budget?.notifiedBudgetIds);
  const dispatch = useAppDispatch();

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
    if (selectedCurrency && exchangeRates && selectedCurrency in exchangeRates) {
      const convertedAmount = amount * exchangeRates[selectedCurrency as keyof typeof exchangeRates];
      return convertedAmount?.toFixed(0);
    }
    return amount?.toFixed(0);
  };

  useEffect(() => {
    const user = auth?.currentUser;
    if (user) {
      const budgetRef = ref(database, `users/${user?.uid}/budgets`);
      const unsubscribe = onValue(budgetRef, (snapshot) => {
        const data = snapshot?.val();
        if (data) {
          const budgetList = Object?.keys(data)?.map(key => ({
            id: key,
            ...data[key]
          }));
          setBudgets(budgetList);

          budgetList.forEach(budget => {
            if (!notifiedBudgetIds.includes(budget?.id)) {
              const spent = calculateExpenses(budget?.category);
              if (spent > budget.amount) {
                sendBudgetNotification(budget?.id, budget?.category, budget?.amount, spent);
              }
            }
          });
        } else {
          setBudgets([]);
        }
      });

      return () => unsubscribe();
    } else {
    }
  }, [expenses, notifiedBudgetIds]);

  const handleAddBudget = () => {
    if (selectedCategory && budgetAmount && selectedDuration) {
      const user = auth?.currentUser;
      if (!user) {
        return;
      }

      const newBudget = {
        category: selectedCategory,
        amount: parseFloat(budgetAmount),
        duration: selectedDuration,
      };

      const budgetRef = ref(database, `users/${user?.uid}/budgets`);
      push(budgetRef, newBudget)
        .then(() => {
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

  const calculateExpenses = (category: string) => {
    return expenses.filter(expense => expense?.category?.includes(category))?.reduce((sum, expense) => sum + parseFloat(expense?.amount), 0);
  };

  const sendBudgetNotification = async (budgetId: string, category: string, budget: number, spent: number) => {
    await Notifications?.scheduleNotificationAsync({
      content: {
        title: "Budget Alert",
        body: `You've exceeded your ${category} budget of ${formatAmount(budget)} ${selectedCurrency}! Spent: ${formatAmount(spent)} ${selectedCurrency}.`,
        data: { category, budget, spent },
      },
      trigger: null,
    });

    const notification = {
      message: `Budget exceeded for ${category}: ${formatAmount(budget)} ${selectedCurrency} vs Spent: ${formatAmount(spent)} ${selectedCurrency}`,
      timestamp: new Date().toISOString(),
      budgetId,
      isSeen: false, // Explicitly set isSeen
    };

    const user = auth.currentUser;
    if (user) {
      const notificationsRef = ref(database, `users/${user?.uid}/notifications`);
      push(notificationsRef, notification);
    }

    dispatch({
      type: "budget/addNotification",
      payload: notification,
    });
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 5) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
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
    categories,
    durationList,
    formatAmount,
  };
};

export default useBudget;