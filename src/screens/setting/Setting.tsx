// Setting.tsx
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
import { Picker } from "@react-native-picker/picker";

const Setting = () => {
    const {
        isDarkMode,
        setIsDarkMode,
        navigation,
        selectedCurrency,
        setCurrency,
        currencies
    } = useSetting();

    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 100 }}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.header}>Settings</Text>
            </View>
            
            {/* Currency Selection */}
            <View style={styles.option}>
                <Ionicons name="cash-outline" size={24} color="#333" />
                <Text style={styles.optionText}>Currency</Text>
                <Picker
                    selectedValue={selectedCurrency}
                    onValueChange={(itemValue) => setCurrency(itemValue)}
                    style={{ width: 150 }}
                >
                    {currencies.map((currency) => (
                        <Picker.Item key={currency} label={currency} value={currency} />
                    ))}
                </Picker>
            </View>

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
