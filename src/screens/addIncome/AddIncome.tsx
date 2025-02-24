import React from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Modal,
    Image, // Import Image
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from "./AddIncome.style";
import useAddIncome from "./useAddIncome";

const AddIncome = () => {
    const {
        amount,
        setAmount,
        category,
        setCategory,
        description,
        setDescription,
        attachmentModalVisible,
        setAttachmentModalVisible,
        dropdownVisible,
        setDropdownVisible,
        whiteSectionHeight,
        setWhiteSectionHeight,
        popupVisible,
        setPopupVisible,
        navigation,
        dispatch,
        categories,
        handleAttachmentOption,
        handleContinuePress,
        attachment,
    } = useAddIncome();

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
                    Income
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
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ color: category ? "black" : "gray" }}>
                            {category || "Select Category"}
                        </Text>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="gray" />
                    </View>
                </TouchableOpacity>

                {/* Dropdown Modal */}
                <Modal
                    transparent
                    visible={dropdownVisible}
                    animationType="fade"
                    onRequestClose={() => setDropdownVisible(false)}
                >
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
                {attachment && attachment.uri && (
                    <Image
                        source={{ uri: attachment.uri }}
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
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={handleContinuePress}
                >
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddIncome;
