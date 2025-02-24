import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const useSetting = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigation = useNavigation()

    return {
        isDarkMode,
        setIsDarkMode,
        navigation
    }
}

export default useSetting
