import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store';
import { markNotificationsAsSeen, updateNotificationsSeen } from '../../store/slices/BudgetSlice';
import { useNavigation } from '@react-navigation/native';

const useNotifications = () => {

    const dispatch = useAppDispatch();
    const notifications = useAppSelector((state) => state?.budget?.notifications);

    useEffect(() => {
        dispatch(markNotificationsAsSeen());
        dispatch(updateNotificationsSeen() as any);
    }, [dispatch]);

    const navigation: any = useNavigation()

    return {
        dispatch,
        notifications,
        useEffect,
        navigation
    }
}

export default useNotifications