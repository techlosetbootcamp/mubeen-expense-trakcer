// hooks/useTransactions.ts
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../config/firebaseConfig";
import { useAppSelector } from "../../store/store";
import { useNavigation } from "@react-navigation/native";

export const useRecentTransactions = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [showAll, setShowAll] = useState(false);
    const user = useAppSelector((state) => state.user.user);
    const navigation:any = useNavigation()

    useEffect(() => {
        if (!user) return;

        const expensesRef = ref(database, `expenses/${user.uid}`);
        const incomesRef = ref(database, `incomes/${user.uid}`);

        const unsubscribeExpenses = onValue(expensesRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const expenseList = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                    type: "expense",
                }));
                setTransactions((prev) => [...expenseList, ...prev]);
            }
        });

        const unsubscribeIncomes = onValue(incomesRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const incomeList = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                    type: "income",
                }));
                setTransactions((prev) => [...incomeList, ...prev]);
            }
        });

        return () => {
            unsubscribeExpenses();
            unsubscribeIncomes();
        };
    }, [user]);

    const sortedTransactions = transactions.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );

    const displayedTransactions = showAll
        ? sortedTransactions
        : sortedTransactions.slice(0, 3);


    const truncateDescription = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    return { displayedTransactions, showAll, setShowAll, transactions, truncateDescription, navigation };
}
