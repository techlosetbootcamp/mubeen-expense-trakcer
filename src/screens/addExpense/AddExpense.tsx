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
        successModalVisible,
        setSuccessModalVisible,
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
        loading,
    } = useAddExpense();

    return (
        <View style={styles.container}>
            {/* Conditionally render Loader as an overlay */}
            {loading && (
                <View style={styles.loaderOverlay}>
                    <Loader />
                </View>
            )}

            <View style={styles.arrowText}>
                <AntDesign
                    name="arrowleft"
                    size={24}
                    color="white"
                    onPress={() => navigation.navigate("Main")}
                />
                <Text style={[styles.header, { marginLeft: 100, marginTop: 2 }]}>
                    Expense
                </Text>
            </View>
            <View style={styles.greenSection}>
                <Text style={styles.label}>How much?</Text>
                <View style={styles.amountContainer}>
                    <Text style={styles.dollarSign}>$</Text>
                    <TextInput
                        style={[styles.amount, styles.inputField]}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        placeholder="0"
                        placeholderTextColor="#fff"
                    />
                </View>
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

                {/* Attachment Preview with Cross Icon */}
                {attachment && typeof attachment === "string" && (
                    <View style={styles.attachmentPreviewContainer}>
                        <Image
                            source={{ uri: attachment }}
                            style={styles.attachmentPreview}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => {
                                setAttachment(null);
                                setWhiteSectionHeight(1.5);
                            }}
                        >
                            <MaterialIcons name="close" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
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

            {/* Success Modal */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={successModalVisible}
                onRequestClose={() => {}}
            >
                <View style={styles.successModalOverlay}>
                    <View style={styles.successModalContainer}>
                        <View style={styles.successIconContainer}>
                            <MaterialIcons name="check" size={40} color="white" />
                        </View>
                        <Text style={styles.successModalText}>
                            Transaction has been successfully added
                        </Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default AddExpense;