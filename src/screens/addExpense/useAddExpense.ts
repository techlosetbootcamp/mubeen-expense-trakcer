import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../store/store";
import { addExpenseToFirebase } from "../../store/slices/expenseSlice";

export const useAddExpense = () => {
    const [amount, setAmount] = useState("0");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);

    const navigation: any = useNavigation();
    const dispatch = useAppDispatch();

    const categories = [
        "Food & Dining",
        "Shopping",
        "Transportation",
        "Entertainment",
        "Healthcare",
        "Rent & Bills",
        "Travel",
        "Education",
        "Investments",
        "Other",
    ];

    const handleContinuePress = () => {
        if (!amount || !category || !description) {
            alert("Please fill all fields");
            return;
        }

        const newExpense = {
            amount,
            category,
            description,
            attachment: null,
            timestamp: new Date().toISOString(),
        };

        dispatch(addExpenseToFirebase(newExpense))
            .unwrap()
            .then(() => {
                setPopupVisible(true);
                setTimeout(() => {
                    setPopupVisible(false);
                    setAmount("0");
                    setCategory("");
                    setDescription("");
                    navigation.navigate("Main");
                }, 2000);
            })
            .catch((error) => {
                console.error("Error adding expense:", error);
                alert("Failed to add expense.");
            });
    };

    return {
        amount,
        setAmount,
        category,
        setCategory,
        description,
        setDescription,
        dropdownVisible,
        setDropdownVisible,
        popupVisible,
        categories,
        handleContinuePress,
        navigation
    };
};
