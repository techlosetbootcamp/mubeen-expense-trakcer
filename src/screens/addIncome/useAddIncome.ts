import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { database, auth } from "../../config/firebaseConfig";
import { ref, push } from "firebase/database";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { setIncome } from "../../store/slices/incomeSlice";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as MediaLibrary from "expo-media-library";
import { incomeCategories } from '../../constants/Categories';

const useAddIncome = () => {
    const [amount, setAmount] = useState("0");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
    const [attachment, setAttachment] = useState<any>(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [whiteSectionHeight, setWhiteSectionHeight] = useState(1.5);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation: any = useNavigation();
    const dispatch = useAppDispatch();
    const userIncome = useAppSelector(
        (state: RootState) => state?.income?.income || []
    );


    const handleAttachmentOption = async (option: string) => {
        let result: any = null;

        try {
            if (option === "Camera") {
                await MediaLibrary.requestPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker?.MediaTypeOptions?.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                    base64: true,
                });
            } else if (option === "Image") {
                await ImagePicker?.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker?.launchImageLibraryAsync({
                    mediaTypes: ImagePicker?.MediaTypeOptions.Images,
                    base64: true,
                });
            } else if (option === "Document") {
                result = await DocumentPicker?.getDocumentAsync({
                    type: "*/*",
                    copyToCacheDirectory: true,
                });
            }

            if (result && !result.canceled) {
                const selectedImage = result?.assets ? result?.assets[0] : result;
                if (selectedImage.base64) {
                    setAttachment(`data:image/jpeg;base64,${selectedImage?.base64}`);
                }
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

        const newIncomeRef = ref(database, `incomes/${user?.uid}`);
        const newIncome = {
            amount,
            category,
            description,
            attachment: attachment || null,
            timestamp: new Date()?.toISOString(),
        };

        push(newIncomeRef, newIncome)
            .then(() => {
                dispatch(setIncome([...userIncome, newIncome]));
                setLoading(false); // Stop loading before showing the success modal
                setSuccessModalVisible(true);
                setTimeout(() => {
                    setSuccessModalVisible(false);
                    setAmount("0");
                    setCategory("");
                    setDescription("");
                    setAttachment(null);
                    setWhiteSectionHeight(1.5);
                    navigation.navigate("Main");
                }, 3000); // Show success modal for 3 seconds
            })
            .catch((error) => {
                console.error("Error adding income to Firebase:", error);
                alert("Failed to add income.");
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
        attachmentModalVisible,
        setAttachmentModalVisible,
        dropdownVisible,
        setDropdownVisible,
        whiteSectionHeight,
        setWhiteSectionHeight,
        successModalVisible,
        setSuccessModalVisible,
        navigation,
        dispatch,
        incomeCategories,
        handleAttachmentOption,
        handleContinuePress,
        attachment,
        setAttachment,
        loading,
    };
};

export default useAddIncome;