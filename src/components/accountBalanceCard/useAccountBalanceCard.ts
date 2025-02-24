import { RootState, useAppSelector } from "../../store/store";

const useAccountBalanceCard = () => {
  const income = useAppSelector((state: RootState) => state.income.income || []);
  const expenses = useAppSelector((state: RootState) => state.expense.expenses || []);

  const totalIncome = income.reduce((sum: number, item: { amount: string }) => sum + parseFloat(item.amount), 0);
  const totalExpenses = expenses.reduce((sum: number, item: { amount: string }) => sum + parseFloat(item.amount), 0);

  const accountBalance = totalIncome - totalExpenses;

  return {
    totalIncome,
    totalExpenses,
    accountBalance,
  };
};

export default useAccountBalanceCard;
