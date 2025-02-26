// components/TransactionsDetail.tsx
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    Modal,
    TextInput,
    ScrollView
} from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from './TransactionsDetail.style';
import { Picker } from '@react-native-picker/picker'; // Import Picker for dropdowns
import useTransactionsDetail from './useTransactionsDetail';

const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    PKR: "₨",
    JPY: "¥",
};

export default function DetailTransaction() {

    const {
        openModal,
        setOpenModal,
        openEditModal,
        setOpenEditModal,
        showFullCategory,
        setShowFullCategory,
        navigation,
        route,
        transactionId,
        type,
        transaction,
        setTransaction,
        editedTransaction,
        setEditedTransaction,
        isExpense,
        useEffect,
        confirmDeleteTransaction,
        handleEditTransaction,
        saveEditedTransaction,
        formattedDate,
        categories,
        setCategories,
        incomeCategories,
        expenseCategories,
        handleTypeChange,
        fullScreenImage,
        setFullScreenImage,
        convertedAmount,
        selectedCurrency,
    } = useTransactionsDetail()

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);  // new State

    const openDeleteModal = () => {  // new function
        setOpenModal(false)
        setIsDeleteModalVisible(true);
    };

    const closeDeleteModal = () => {  // new function
        setIsDeleteModalVisible(false);
    };

    const currencySymbol = currencySymbols[selectedCurrency] || selectedCurrency;

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.topcontainer,
                    { backgroundColor: type === 'expense' ? '#FD3C4A' : '#00A86B' },
                ]}
            >
                <View style={styles.topbar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.topcontainerText}>Detail Transaction</Text>
                    <TouchableOpacity onPress={openDeleteModal}>
                        <Ionicons name="trash-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.redcontainer}>
                    <Text style={styles.amount}>{currencySymbol}{convertedAmount}</Text>
                    <Text style={styles.text}>{transaction.description}</Text>
                    <View style={styles.datebox}>
                        <Text style={styles.dateboxText}>{formattedDate}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.belowContainer}>
                <View style={styles.belowBox1}>
                    <View>
                        <Text style={styles.box1Text}>Type</Text>
                        <Text style={styles.box1Text2}>{type}</Text>
                    </View>
                    <View>
                        <Text style={styles.box1Text}>Category</Text>
                        <TouchableOpacity onPress={() => setShowFullCategory(!showFullCategory)}>
                            <Text style={styles.box1Text2}>
                                {transaction.category && transaction.category.length > 15
                                    ? `${transaction.category.slice(0, 15)}...`
                                    : transaction.category}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.box1Text}>Wallet</Text>
                        <Text style={styles.box1Text2}>PayPal</Text>
                    </View>
                </View>
                <View style={styles.description}>
                    <Text style={styles.descriptionHead}>Description</Text>
                    <Text style={styles.descriptionText}>{transaction.description}</Text>
                </View>
                <View style={styles.pictureBox}>
                    <Text style={styles.imageText}>Attachment</Text>
                    <View style={styles.pic}>
                        {transaction.attachment ? (
                            <TouchableOpacity onPress={() => setFullScreenImage(transaction.attachment)}>
                                <Image
                                    style={styles.actualpic}
                                    resizeMode="cover"
                                    source={{ uri: transaction.attachment }}
                                />
                            </TouchableOpacity>
                        ) : (
                            <Text>No image available</Text>
                        )}
                    </View>
                </View>

                {/* Edit Transaction Button */}
                <TouchableOpacity style={styles.button} onPress={handleEditTransaction}>
                    <Text style={styles.btnText}>Edit Transaction</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={fullScreenImage !== null}
                transparent={true}
                onRequestClose={() => setFullScreenImage(null)}
            >
                <View style={styles.fullScreenContainer}>
                    <Image
                        style={styles.fullScreenImage}
                        resizeMode="contain"
                        source={fullScreenImage ? { uri: fullScreenImage } : undefined}
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setFullScreenImage(null)}
                    >
                        <Ionicons name="close-circle" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={isDeleteModalVisible}  // change state here
                onRequestClose={closeDeleteModal}  // change function here
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Remove This Transaction?</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure do you wanna remove this transaction?
                        </Text>
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={[styles.cancelButton]}
                                onPress={closeDeleteModal}  // change function here
                            >
                                <Text style={styles.modalCancelButtonText}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.confirmButton]}
                                onPress={confirmDeleteTransaction}  // remain same functionality
                            >
                                <Text style={styles.modalYesButtonText}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Full Category Modal */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={showFullCategory}
                onRequestClose={() => setShowFullCategory(false)}
            >
                <View style={styles.fullCategoryModalContainer}>
                    <View style={styles.fullCategoryModalContent}>
                        {/* Cross Icon at Top Right */}
                        <TouchableOpacity
                            style={styles.fullCategoryCloseIcon}
                            onPress={() => setShowFullCategory(false)}
                        >
                            <Ionicons name="close" size={24} color="#000" />
                        </TouchableOpacity>

                        {/* Full Category Text */}
                        <Text style={styles.fullCategoryText}>{transaction.category}</Text>
                    </View>
                </View>
            </Modal>

            {/* Edit Transaction Modal */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={openEditModal}
                onRequestClose={() => setOpenEditModal(false)}
            >
                <View style={styles.editModalContainer}>
                    <View style={styles.editModalContent}>
                        <Text style={styles.editModalTitle}>Edit Transaction</Text>
                        <ScrollView>
                            {/* Amount Input */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Amount</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter amount"
                                    value={editedTransaction.amount}
                                    onChangeText={(text) => setEditedTransaction({ ...editedTransaction, amount: text })}
                                    keyboardType="numeric"
                                />
                            </View>
                            {/* Description Input */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Description</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter description"
                                    value={editedTransaction.description}
                                    onChangeText={(text) => setEditedTransaction({ ...editedTransaction, description: text })}
                                />
                            </View>

                            {/* Type Dropdown */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Type</Text>
                                <View style={styles.dropdown}>
                                    <Picker
                                        selectedValue={editedTransaction.type || type}
                                        onValueChange={handleTypeChange}
                                        style={styles.dropdownText}
                                    >
                                        <Picker.Item label="Expense" value="Expense" />
                                        <Picker.Item label="Income" value="Income" />
                                    </Picker>
                                </View>
                            </View>

                            {/* Category Dropdown */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Category</Text>
                                <View style={styles.dropdown}>
                                    <Picker
                                        selectedValue={editedTransaction.category}
                                        onValueChange={(itemValue) => setEditedTransaction({ ...editedTransaction, category: itemValue })}
                                        style={styles.dropdownText}
                                    >
                                        {categories.map((category, index) => (
                                            <Picker.Item key={index} label={category} value={category} />
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                        </ScrollView>

                        {/* Save and Cancel Buttons */}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: 'gray' }]}
                                onPress={() => setOpenEditModal(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#00A86B' }]}
                                onPress={saveEditedTransaction}
                            >
                                <Text style={styles.modalButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
