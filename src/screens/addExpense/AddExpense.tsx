import React from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from "./AddExpense.style";
import { useAddExpense } from "./useAddExpense";
import Entypo from "@expo/vector-icons/Entypo";
import Loader from "../../components/loader/Loader";



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
        navigation,
        attachmentModalVisible,
        setAttachmentModalVisible,
        attachment,
        setAttachment,
        whiteSectionHeight,
        setWhiteSectionHeight,
        handleAttachmentOption,
        loading, // Add loading from the hook
    } = useAddExpense();

    // Show Loader when loading is true
    if (loading) {
        return <Loader />;
    }

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
            <View style={[styles.whiteSection, { flex: whiteSectionHeight }]}>
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

                {/* Attachment Preview Above Button */}
                {attachment && typeof attachment === "string" && (
                    <Image
                        source={{ uri: attachment }}
                        style={{ width: 52, height: 52, marginBottom: 8 }}
                    />
                )}

                <TouchableOpacity
                    style={styles.attachmentButton}
                    onPress={() => setAttachmentModalVisible(true)}
                >
                    <Entypo name="attachment" size={24} color="gray" />
                    <Text style={styles.attachmentText}>Add attachment</Text>
                </TouchableOpacity>

                <Modal
                    transparent
                    visible={attachmentModalVisible}
                    animationType="slide"
                    onRequestClose={() => setAttachmentModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                style={styles.modalOption}
                                onPress={() => handleAttachmentOption("Camera")}
                            >
                                <Entypo name="camera" size={24} color="#6A1B9A" />
                                <Text style={styles.modalOptionText}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalOption}
                                onPress={() => handleAttachmentOption("Image")}
                            >
                                <Entypo name="image" size={24} color="#6A1B9A" />
                                <Text style={styles.modalOptionText}>Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalOption}
                                onPress={() => handleAttachmentOption("Document")}
                            >
                                <Entypo name="document" size={24} color="#6A1B9A" />
                                <Text style={styles.modalOptionText}>Document</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddExpense;