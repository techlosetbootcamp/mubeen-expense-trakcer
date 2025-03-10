import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store';
import { markNotificationsAsSeen, updateNotificationsSeen } from '../../store/slices/BudgetSlice';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationParamList } from '../../constants/types/navigationTypes';

const useNotifications = () => {

    const dispatch = useAppDispatch();
    const notifications = useAppSelector((state) => state?.budget?.notifications);

    useEffect(() => {
        dispatch(markNotificationsAsSeen());
        dispatch(updateNotificationsSeen());
    }, [dispatch]);

    const navigation = useNavigation<NavigationProp<StackNavigationParamList>>();

    return {
        dispatch,
        notifications,
        useEffect,
        navigation
    }
}

export default useNotifications