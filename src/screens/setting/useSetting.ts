import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setCurrency } from '../../store/slices/userSlice';

const useSetting = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const selectedCurrency = useSelector((state: RootState) => state.user.selectedCurrency);
    const currencies = ["USD", "EUR", "GBP", "INR", "PKR", "JPY"];

    const handleSetCurrency = (currency: string) => {
        dispatch(setCurrency(currency));
    };

    return {
        isDarkMode,
        setIsDarkMode,
        navigation,
        selectedCurrency,
        setCurrency: handleSetCurrency,
        currencies
    };
};

export default useSetting;