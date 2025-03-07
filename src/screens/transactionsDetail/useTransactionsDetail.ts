import { useEffect, useState, } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { onValue, ref, remove, set } from 'firebase/database';
import { auth, database } from '../../config/firebaseConfig';
import { useAppSelector } from '../../store/store';
import axios from 'axios';
import { exchangeRateApiUrl } from "../../constants/exchangeRateApi";
import { Alert } from 'react-native';
import { incomeCategories } from '../../constants/Categories';
import { categories } from '../../constants/Categories';

const useTransactionsDetail = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [showFullCategory, setShowFullCategory] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigation: any = useNavigation();
    const route = useRoute<any>();
    const { transactionId, type } = route?.params;
    const [transaction, setTransaction] = useState<any>({});
    const [editedTransaction, setEditedTransaction] = useState<any>({});
    const isExpense = type === 'Expense';
    const [fullScreenImage, setFullScreenImage] = useState(null);
    const selectedCurrency = useAppSelector((state: any) => state?.user?.selectedCurrency);
    const [exchangeRates, setExchangeRates] = useState({});
    const [convertedAmount, setConvertedAmount] = useState<string>('');

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await axios?.get(exchangeRateApiUrl);
                const rates = response?.data?.conversion_rates;
                setExchangeRates(rates);
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
            }
        };
        fetchExchangeRates();
    }, []);

    useEffect(() => {
        if (!transactionId || !type) return;

        const transactionRef = ref(database, `${type?.toLowerCase()}s/${auth?.currentUser?.uid}/${transactionId}`);

        const unsubscribe = onValue(transactionRef, (snapshot) => {
            if (snapshot.exists()) {
                const transactionData = snapshot.val();
                setTransaction({ ...transactionData, id: transactionId });
                setEditedTransaction({ ...transactionData, id: transactionId });
                if (selectedCurrency && exchangeRates && selectedCurrency in exchangeRates) {
                    const rate = exchangeRates[selectedCurrency as keyof typeof exchangeRates];
                    const convertedAmountValue = (parseFloat(transactionData?.amount) * rate)?.toFixed(0);
                    setConvertedAmount(convertedAmountValue);
                } else {
                    setConvertedAmount(transactionData?.amount);
                }
            }
        });

        return () => unsubscribe();
    }, [transactionId, type, selectedCurrency, exchangeRates]);

    const confirmDeleteTransaction = async () => {
        try {
            const transactionRef = ref(database, `${type?.toLowerCase()}s/${auth?.currentUser?.uid}/${transactionId}`);
            await remove(transactionRef);
            setOpenModal(false);
            setSuccessMessage('Transaction has been successfully removed');
            setSuccessModalVisible(true);
            setTimeout(() => {
                setSuccessModalVisible(false);
                navigation.goBack();
            }, 3000);
        } catch (error) {
            console.error('Error deleting transaction:', error);
            Alert.alert('Error', 'Failed to delete transaction');
        }
    };

    const handleEditTransaction = () => {
        setOpenEditModal(true);
    };

    const saveEditedTransaction = async () => {
        try {
            const transactionRef = ref(database, `${type?.toLowerCase()}s/${auth?.currentUser?.uid}/${transactionId}`);
            await set(transactionRef, editedTransaction);
            setOpenEditModal(false);
            setSuccessMessage('Transaction has been successfully updated');
            setSuccessModalVisible(true);
            setTimeout(() => {
                setSuccessModalVisible(false);
            }, 3000); // Hide modal after 3 seconds
        } catch (error) {
            console.error('Error updating transaction:', error);
            Alert.alert('Error', 'Failed to update transaction');
        }
    };

    const formattedDate = new Date()?.toISOString();

    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        if (editedTransaction?.type === 'Income') {
            setCategories(incomeCategories);
        } else if (editedTransaction?.type === 'Expense') {
            setCategories(categories);
        }
    }, [editedTransaction.type]);

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
        successModalVisible,
        setSuccessModalVisible,
        successMessage,
        navigation,
        route,
        transactionId,
        type,
        transaction,
        setTransaction,
        editedTransaction,
        setEditedTransaction,
        isExpense,
        confirmDeleteTransaction,
        handleEditTransaction,
        saveEditedTransaction,
        formattedDate,
        categories,
        setCategories,
        incomeCategories,
        handleTypeChange,
        fullScreenImage,
        setFullScreenImage,
        convertedAmount,
        selectedCurrency,
    };
};

export default useTransactionsDetail;