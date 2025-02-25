import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { onValue, ref, remove, set } from 'firebase/database';
import { auth, database } from '../../config/firebaseConfig';

const useTransactionsDetail = () => {

    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [showFullCategory, setShowFullCategory] = useState(false); // State for full category popup
    const navigation: any = useNavigation();
    const route = useRoute<any>();
    const { transactionId, type } = route.params;
    const [transaction, setTransaction] = useState<any>({});
    const [editedTransaction, setEditedTransaction] = useState<any>({});
    const isExpense = type === 'Expense';
    const [fullScreenImage, setFullScreenImage] = useState(null);

    useEffect(() => {
        if (!transactionId || !type) {
            console.log('Transaction ID or Type missing');
            return;
        }

        const transactionRef = ref(database, `${type.toLowerCase()}s/${auth.currentUser?.uid}/${transactionId}`);

        const unsubscribe = onValue(transactionRef, (snapshot) => {
            if (snapshot.exists()) {
                setTransaction({ ...snapshot.val(), id: transactionId });
                setEditedTransaction({ ...snapshot.val(), id: transactionId });
            } else {
                console.log('No data available for transaction ID:', transactionId);
            }
        });

        return () => unsubscribe();
    }, [transactionId, type]);

    // Function to delete a transaction after confirmation
    const confirmDeleteTransaction = async () => {
        try {
            const transactionRef = ref(database, `${type.toLowerCase()}s/${auth.currentUser?.uid}/${transactionId}`);
            await remove(transactionRef);
            setOpenModal(false);
            Alert.alert('Deleted', 'Transaction deleted successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting transaction:', error);
            Alert.alert('Error', 'Failed to delete transaction');
        }
    };

    // Function to handle edit transaction
    const handleEditTransaction = () => {
        setOpenEditModal(true);
    };

    // Function to save the edited transaction
    const saveEditedTransaction = async () => {
        try {
            const transactionRef = ref(database, `${type.toLowerCase()}s/${auth.currentUser?.uid}/${transactionId}`);
            await set(transactionRef, editedTransaction);
            setOpenEditModal(false);
            Alert.alert('Success', 'Transaction updated successfully');
        } catch (error) {
            console.error('Error updating transaction:', error);
            Alert.alert('Error', 'Failed to update transaction');
        }
    };

    const formattedDate = new Date().toISOString();

    const [categories, setCategories] = useState<string[]>([]);

    // Define income and expense categories
    const incomeCategories = [
        "Salary",
        "Business",
        "Freelancing",
        "Overtime Pay",
        "Bonuses and Incentives",
        "Stock Dividends",
        "Rental Income (from property)",
        "Cryptocurrency Gains",
        "Child Support/Alimony",
        "Scholarships/Grants",
        "Royalties",
        "Lottery or Gambling Winnings",
        "Gifts or Donations Received",
        "Income from Side Hustles",
    ];

    const expenseCategories = [
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

    // Update categories when type changes
    useEffect(() => {
        if (editedTransaction.type === 'Income') {
            setCategories(incomeCategories);
        } else if (editedTransaction.type === 'Expense') {
            setCategories(expenseCategories);
        }
    }, [editedTransaction.type]);

    // Function to handle type change
    const handleTypeChange = (itemValue: string) => {
        setEditedTransaction({ ...editedTransaction, type: itemValue });
    };

  return {
    openModal,
    setOpenModal,
    openEditModal,
    setOpenEditModal,
    showFullCategory,
    setShowFullCategory,
    navigation,
    route,
    transactionId,
    type,
    transaction,
    setTransaction,
    editedTransaction,
    setEditedTransaction,
    isExpense,
    useEffect,
    confirmDeleteTransaction,
    handleEditTransaction,
    saveEditedTransaction,
    formattedDate,
    categories,
    setCategories,
    incomeCategories,
    expenseCategories,
    handleTypeChange,
    fullScreenImage,
    setFullScreenImage
  }
}

export default useTransactionsDetail