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
    const [amount, setAmount] = useState("0"); // Initial value is just "0", no $
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
    const [attachment, setAttachment] = useState<string | null>(null);
    const [whiteSectionHeight, setWhiteSectionHeight] = useState(1.5);
    const [loading, setLoading] = useState(false);

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
                    base64: true,
                });
            } else if (option === "Image") {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    base64: true,
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

        setLoading(true);

        const newExpenseRef = ref(database, `expenses/${user.uid}`);
        const newExpense = {
            amount, // Store only the numeric value
            category,
            description,
            attachment: attachment,
            timestamp: new Date().toISOString(),
        };

        push(newExpenseRef, newExpense)
            .then(() => {
                dispatch(setExpenses([...userExpense, newExpense]));
                setPopupVisible(true);
                setTimeout(() => {
                    setPopupVisible(false);
                    setAmount("0"); // Reset to "0" without $
                    setCategory("");
                    setDescription("");
                    setAttachment(null);
                    setWhiteSectionHeight(1.5);
                    setLoading(false);
                    navigation.navigate("Main");
                }, 2000);
            })
            .catch((error) => {
                console.error("Error adding expense to Firebase:", error);
                alert("Failed to add expense.");
                setLoading(false);
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
        loading,
    };
};