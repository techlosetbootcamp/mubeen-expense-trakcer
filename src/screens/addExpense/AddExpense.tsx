import React from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from "./AddExpense.style";
import { useAddExpense } from "./useAddExpense";

const AddExpense = () => {
   
    const {
        amount,
        setAmount,
        category,
        setCategory,
        description,
        setDescription,
        dropdownVisible,
        setDropdownVisible,
        categories,
        handleContinuePress,
        navigation
    } = useAddExpense();

    return (
        <View style={styles.container}>
            <View style={styles.arrowText}>
                <AntDesign
                    name="arrowleft"
                    size={36}
                    color="white"
                    onPress={() => navigation.navigate("Main")}
                />
                <Text style={[styles.header, { marginLeft: 100, marginTop: 2 }]}>
                    Expense
                </Text>
            </View>
            <View style={styles.greenSection}>
                <Text style={styles.label}>How much?</Text>
                <TextInput
                    style={[styles.amount, styles.inputField]}
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.whiteSection}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setDropdownVisible(true)}
                >
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: category ? "black" : "gray" }}>
                            {category || "Select Category"}
                        </Text>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="gray" />
                    </View>
                </TouchableOpacity>

                <Modal visible={dropdownVisible} transparent animationType="fade">
                    <View style={styles.modalOverlay}>
                        <View style={styles.dropdownContainer}>
                            {categories.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setCategory(item);
                                        setDropdownVisible(false);
                                    }}
                                >
                                    <Text style={styles.dropdownItemText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Modal>

                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Description"
                />
                <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddExpense;
