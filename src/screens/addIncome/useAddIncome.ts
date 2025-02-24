import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { database, auth } from "../../config/firebaseConfig";
import { ref, push } from "firebase/database";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { setIncome } from "../../store/slices/incomeSlice";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as MediaLibrary from "expo-media-library";

const useAddIncome = () => {
    const [amount, setAmount] = useState("0");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
    const [attachment, setAttachment] = useState<any>(null); // Changed to any for simplicity
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [whiteSectionHeight, setWhiteSectionHeight] = useState(1.5);
    const [popupVisible, setPopupVisible] = useState(false);
    const navigation: any = useNavigation();
    const dispatch = useAppDispatch();
    const userIncome = useAppSelector(
        (state: RootState) => state.income.income || []
    );

    const categories = [
        "Salary",
        "Business",
        "Freelancing",
        "Overtime Pay",
        "Bonuses and Incentives",
        "Stock Dividends",
        "Rental Income (from property)",
        "Cryptocurrency Gains",
        "Child Support/Alimony",
        "Scholarships/Grants",
        "Royalties",
        "Lottery or Gambling Winnings",
        "Gifts or Donations Received",
        "Income from Side Hustles",
    ];

    const handleAttachmentOption = async (option: string) => {
        let result: any = null; // Changed type to any
        console.log('permission', ImagePicker.PermissionStatus)

        try {
            if (option === "Camera") {
                const { status } = await MediaLibrary.requestPermissionsAsync();  // Request Permission
                result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                    base64: true, // include Base64
                });
            } else if (option === "Image") {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(); // Request Permission
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    base64: true, // include Base64
                });
            } else if (option === "Document") {
                result = await DocumentPicker.getDocumentAsync({
                    type: "*/*",
                    copyToCacheDirectory: true,
                });
            }

            if (result && !result.canceled) {
                setAttachment(result.assets ? result.assets[0] : result); // Adjust based on the structure of the result object
                setWhiteSectionHeight(3.0);
            }
        } catch (err) {
            console.error("Error picking or processing the attachment:", err);
            alert("An error occurred while processing the attachment.");
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

        const newIncomeRef = ref(database, `incomes/${user.uid}`);
        const newIncome = {
            amount,
            category,
            description,
            attachment: attachment ? attachment.uri : null,
            timestamp: new Date().toISOString(),
        };

        push(newIncomeRef, newIncome)
            .then(() => {
                dispatch(setIncome([...userIncome, newIncome])); // Update Redux store
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
                console.error("Error adding income to Firebase:", error);
                alert("Failed to add income.");
            });
    };

    return {
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
        setAttachment,
    };
};

export default useAddIncome;
