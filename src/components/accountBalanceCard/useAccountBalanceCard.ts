import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import axios from "axios";
import React, { useEffect } from "react";
import { loadUser } from "../../store/slices/userSlice";
import { exchangeRateApiUrl } from "../../constants/exchangeRateApi";


const useAccountBalanceCard = () => {
  const income = useAppSelector((state: RootState) => state.income.income || []);
  const expenses = useAppSelector((state: RootState) => state.expense.expenses || []);
  const selectedCurrency = useAppSelector((state: RootState) => state.user.selectedCurrency);

  const totalIncome = income.reduce((sum: number, item: { amount: string }) => sum + parseFloat(item.amount), 0);
  const totalExpenses = expenses.reduce((sum: number, item: { amount: string }) => sum + parseFloat(item.amount), 0);

  const accountBalance = totalIncome - totalExpenses;

  const [exchangeRates, setExchangeRates] = React.useState({});
  const [convertedIncome, setConvertedIncome] = React.useState(0);
  const [convertedExpenses, setConvertedExpenses] = React.useState(0);
  const [convertedBalance, setConvertedBalance] = React.useState(0);
  const dispatch = useAppDispatch();


  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(exchangeRateApiUrl);
        const rates = response.data.conversion_rates;
        setExchangeRates(rates);

        if (selectedCurrency && rates[selectedCurrency]) {
          const rate = rates[selectedCurrency];
          setConvertedIncome(totalIncome * rate);
          setConvertedExpenses(totalExpenses * rate);
          setConvertedBalance(accountBalance * rate);
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, [selectedCurrency, totalIncome, totalExpenses, accountBalance]);

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    PKR: "PKR ",
    JPY: "¥",
  } as const;

  const currencySymbol = currencySymbols[selectedCurrency as keyof typeof currencySymbols] || selectedCurrency;

  return {
    totalIncome: convertedIncome,
    totalExpenses: convertedExpenses,
    accountBalance: convertedBalance,
    currencySymbol,
  };
};

export default useAccountBalanceCard;