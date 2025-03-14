import { useEffect } from 'react'
import {RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { getAuth } from 'firebase/auth';
import { setUserProfile } from '../../store/slices/userSlice';

const uesHomeScreen = () => {

    const dispatch = useAppDispatch();
    const userProfile = useAppSelector((state: RootState) => state?.user);

    useEffect(() => {
        const fetchUserData = () => {
            const auth = getAuth();
            const user = auth?.currentUser;
            if (user) {
                dispatch(
                    setUserProfile({
                        profilePicture: user?.photoURL || "",
                        name: user?.displayName || "",
                    })
                );
            }
        };

        fetchUserData();
    }, [dispatch]);

    return {
        dispatch,
        userProfile,
        useEffect
    }
}

export default uesHomeScreen

