import { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { setExpenses } from "../../store/slices/expenseSlice";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { auth, database } from "../../config/firebaseConfig";
import { push, ref } from "firebase/database";
import { categories } from "../../constants/Categories";
import { StackNavigationParamList } from "../../constants/types/navigationTypes";
import { AttachmentResult } from "../../constants/types/stateTypes";


export const useAddExpense = () => {
    const [amount, setAmount] = useState("0");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
    const [attachment, setAttachment] = useState<string | null>(null);
    const [whiteSectionHeight, setWhiteSectionHeight] = useState(1.5);
    const [loading, setLoading] = useState(false);
    const userExpense = useAppSelector(
        (state: RootState) => state?.expense?.expenses || []
    );

    const navigation = useNavigation<NavigationProp<StackNavigationParamList>>();
    const dispatch = useAppDispatch();

  const handleAttachmentOption = async (option: string) => {
    let result: AttachmentResult = { canceled: true, assets: null };
    try {
      if (option === "Camera") {
        await ImagePicker.requestCameraPermissionsAsync();
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
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if ("base64" in asset && asset.base64) {
          setAttachment(`data:image/jpeg;base64,${asset.base64}`);
        } else {
          setAttachment(null);
        }
        setWhiteSectionHeight(3.0);
      } else {
        setAttachment(null);
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

        const newExpenseRef = ref(database, `expenses/${user?.uid}`);
        const newExpense = {
            amount,
            category,
            description,
            attachment: attachment,
            timestamp: new Date()?.toISOString(),
        };

        push(newExpenseRef, newExpense)
            .then(() => {
                dispatch(setExpenses([...userExpense, newExpense]));
                setLoading(false); 
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
    };
};