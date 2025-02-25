import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { setExpenses } from "../../store/slices/expenseSlice";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as MediaLibrary from "expo-media-library";
import { auth, database } from "../../config/firebaseConfig";
import { push, ref } from "firebase/database";

export const useAddExpense = () => {
    const [amount, setAmount] = useState("0");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
    const [attachment, setAttachment] = useState<string | null>(null); // Now storing Base64 string
    const [whiteSectionHeight, setWhiteSectionHeight] = useState(1.5);
    const userExpense = useAppSelector(
        (state: RootState) => state.expense.expenses || []
    );

    const navigation: any = useNavigation();
    const dispatch = useAppDispatch();

    const categories = [
        "Food & Dining",
        "Shopping",
        "Transportation",
        "Entertainment",
        "Healthcare",
        "Rent & Bills",
        "Travel",
        "Education",
        "Investments",
        "Other",
    ];

    const handleAttachmentOption = async (option: string) => {
        let result: any = null;
        try {
            if (option === "Camera") {
                await MediaLibrary.requestPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                    base64: true, // Convert to Base64
                });
            } else if (option === "Image") {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    base64: true, // Convert to Base64
                });
            } else if (option === "Document") {
                result = await DocumentPicker.getDocumentAsync({
                    type: "*/*",
                    copyToCacheDirectory: true,
                });
            }

            if (result && !result.canceled) {
                if (result.assets && result.assets[0].base64) {
                    setAttachment(`data:image/jpeg;base64,${result.assets[0].base64}`);
                } else {
                    setAttachment(null);
                }
                setWhiteSectionHeight(3.0);
            }
        } catch (err) {
            console.error("Error picking attachment:", err);
            alert("An error occurred while picking the attachment.");
        } finally {
            setAttachmentModalVisible(false);
        }
    };

    const handleContinuePress = () => {
        if (!amount || !category || !description) {
            alert("Please fill all fields");
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            alert("User not logged in");
            return;
        }

        const newExpenseRef = ref(database, `expenses/${user.uid}`);
        const newExpense = {
            amount,
            category,
            description,
            attachment: attachment, // Store Base64 image in Firebase
            timestamp: new Date().toISOString(),
        };

        push(newExpenseRef, newExpense)
            .then(() => {
                dispatch(setExpenses([...userExpense, newExpense])); // Update Redux store
                setPopupVisible(true);
                setTimeout(() => {
                    setPopupVisible(false);
                    setAmount("0");
                    setCategory("");
                    setDescription("");
                    setAttachment(null);
                    setWhiteSectionHeight(1.5);
                    navigation.navigate("Main");
                }, 2000);
            })
            .catch((error) => {
                console.error("Error adding expense to Firebase:", error);
                alert("Failed to add expense.");
            });
    };

    return {
        amount,
        setAmount,
        category,
        setCategory,
        description,
        setDescription,
        dropdownVisible,
        setDropdownVisible,
        popupVisible,
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
    };
};
