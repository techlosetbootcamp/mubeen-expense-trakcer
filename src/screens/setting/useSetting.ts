import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { setCurrency } from '../../store/slices/userSlice';
import { currencies } from '../../constants/currencySymbols';

const useSetting = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const selectedCurrency = useAppSelector((state: RootState) => state?.user?.selectedCurrency);

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