import React, { useState } from "react";
import { useAppSelector } from "../../store/store";
import axios from "axios";
import { exchangeRateApiUrl } from "../../constants/exchangeRateApi";


const useLineGraph = () => {
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const expenses = useAppSelector((state) => state?.expense?.expenses || []);
  const selectedCurrency = useAppSelector((state: any) => state?.user?.selectedCurrency);

  const [exchangeRates, setExchangeRates] = React.useState({});
  const [convertedExpenses, setConvertedExpenses] = React.useState(expenses);

  React.useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(exchangeRateApiUrl);
        const rates = response?.data?.conversion_rates;
        setExchangeRates(rates);

        if (selectedCurrency && rates[selectedCurrency]) {
          const rate = rates[selectedCurrency];
          const convertedExpensesList = expenses?.map((expense) => ({
            ...expense,
            amount: (parseFloat(expense.amount) * rate)?.toString(),
          }));
          setConvertedExpenses(convertedExpensesList);
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, [selectedCurrency, expenses]);

  const convertToLocalDate = (utcTimestamp: string) => {
    const utcDate = new Date(utcTimestamp);
    return new Date(
      utcDate.getFullYear(),
      utcDate.getMonth(),
      utcDate.getDate(),
      utcDate.getHours(),
      utcDate.getMinutes(),
      utcDate.getSeconds()
    );
  };

  const getFilteredData = (filter: string) => {
    const now = new Date();
    let groupedData: { [key: string]: number } = {};

    convertedExpenses.forEach((expense) => {
      const localDate = convertToLocalDate(expense?.timestamp);

      const isToday =
        localDate.getFullYear() === now?.getFullYear() &&
        localDate.getMonth() === now?.getMonth() &&
        localDate.getDate() === now?.getDate();

      const isSameWeek = () => {
        const firstDayOfWeek = new Date(now);
        firstDayOfWeek.setDate(now.getDate() - now?.getDay());
        return localDate >= firstDayOfWeek && localDate <= now;
      };

      const isSameMonth =
        localDate.getFullYear() === now?.getFullYear() &&
        localDate.getMonth() === now?.getMonth();

      const isSameYear = localDate?.getFullYear() === now?.getFullYear();

      if (filter === "Today" && !isToday) return;
      if (filter === "Week" && !isSameWeek()) return;
      if (filter === "Month" && !isSameMonth) return;
      if (filter === "Year" && !isSameYear) return;

      let dateKey = "";
      switch (filter) {
        case "Today":
          dateKey = `${localDate?.getHours()}:00`; // Group by hours
          break;
        case "Week":
          dateKey = localDate?.toLocaleDateString("en-US", { weekday: "short" });
          break;
        case "Month":
          dateKey = localDate?.toLocaleDateString("en-US", { day: "numeric" });
          break;
        case "Year":
          dateKey = localDate?.toLocaleDateString("en-US", { month: "short" });
          break;
      }

      groupedData[dateKey] = (groupedData[dateKey] || 0) + parseFloat(expense?.amount);
    });

    const labels = Object?.keys(groupedData).sort();
    const dataValues = Object?.values(groupedData);

    if (labels.length < 5) {
      while (labels?.length < 5) {
        labels?.push("");
        dataValues?.push(0);
      }
    }

    return {
      labels,
      datasets: [
        {
          data: dataValues,
          color: (opacity = 1) => `#7f3dff`,
          strokeWidth: 5,
        },
      ],
    };
  };

  return {
    selectedFilter,
    setSelectedFilter,
    getFilteredData,
  };
};

export default useLineGraph;
