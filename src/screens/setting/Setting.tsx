import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Setting.style";
import useSetting from "./useSetting";



const Setting = () => {

    const {
        isDarkMode,
        setIsDarkMode,
        navigation
    } = useSetting()

    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 100 }}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.header}>Settings</Text>
            </View>
            {/* Currency Selection */}
            <TouchableOpacity style={styles.option}>
                <Ionicons name="cash-outline" size={24} color="#333" />
                <Text style={styles.optionText}>Currency</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#777" />
            </TouchableOpacity>

            {/* Dark Mode Toggle */}
            <View style={styles.option}>
                <Ionicons name="moon-outline" size={24} color="#333" />
                <Text style={styles.optionText}>Dark Mode</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={() => setIsDarkMode(!isDarkMode)}
                />
            </View>
        </View>
    );
};

export default Setting;
