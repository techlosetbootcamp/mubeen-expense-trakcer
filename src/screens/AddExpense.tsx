import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as MediaLibrary from "expo-media-library";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const AddExpense = () => {
  const [amount, setAmount] = useState("0");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
  const [attachment, setAttachment] = useState<any>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [whiteSectionHeight, setWhiteSectionHeight] = useState(1.5);
  const [popupVisible, setPopupVisible] = useState(false);
  const navigation: any = useNavigation();

  const categories = [
    "Food",
    "Transportation",
    "Housing",
    "Health",
    "Fitness",
    "Clothing",
    "Recreation",
    "Hobbies",
    "Debt Payments",
    "Investments",
    "Insurance",
    "Education",
    "Childcare",
    "Pets",
    "Gifts",
    "Charity",
    "Social Events",
    "Devices",
    "Subscriptions",
    "Trips",
    "Travel Essentials (Visas, Passports, Luggage...)",
    "Luxury (Jewelry, High-End Purchases...)",
  ];

  const handleAttachmentOption = async (option: string) => {
    let result;

    if (option === "Camera") {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }
    } else if (option === "Image") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === "granted") {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }
    } else if (option === "Document") {
      result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });
    }

    if (result && !result.canceled) {
      setAttachment(option === "Document" ? result : result.assets[0]);
      setWhiteSectionHeight(3.0);
    }
    setAttachmentModalVisible(false);
  };

  const removeAttachment = () => {
    setAttachment(null);
    setWhiteSectionHeight(1.5);
  };

  const handleContinuePress = () => {
    setPopupVisible(true); // Show popup
    setTimeout(() => setPopupVisible(false), 2000); // Hide popup after 2 seconds
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.arrowText}>
        <AntDesign
          name="arrowleft"
          size={36}
          color="white"
          onPress={() => navigation.navigate("Home")}
        />
        <Text style={[styles.header, { marginLeft: 100, marginTop: 2 }]}>
          Expense
        </Text>
      </View>
      <View style={styles.redSection}>
        <Text style={styles.label}>How much?</Text>
        <Text style={styles.amount}>${amount}</Text>
      </View>

      {/* Form Section */}
      <View style={[styles.whiteSection, { flex: whiteSectionHeight }]}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
        />
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
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
        />
        {attachment && (
          <View style={styles.attachmentPreviewContainer}>
            <View style={styles.attachmentPreview}>
              {attachment.uri ? (
                <Image
                  source={{ uri: attachment.uri }}
                  style={{ width: 118, height: 118 }}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.attachmentName}>{attachment.name}</Text>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={removeAttachment}
              >
                <Entypo name="cross" size={24} color="white" />
              </TouchableOpacity>
            </View>
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
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinuePress}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown Modal */}
      <Modal
        transparent
        visible={dropdownVisible}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dropdownContainer}>
            {categories.map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setCategory(cat);
                  setDropdownVisible(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Success Popup */}
      <Modal transparent visible={popupVisible} animationType="fade">
        <View style={styles.successContainer}>
          <View style={styles.popup}>
            <AntDesign name="checkcircle" size={36} color="purple" />
            <Text style={styles.successText}>
              Transaction has been successfully added
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddExpense;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff0000",
  },
  arrowText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 40,
    marginHorizontal: 40,
  },
  redSection: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#ff0000",
    marginLeft: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  amount: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
  whiteSection: {
    flex: 1.5,
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    paddingTop: 40,
  },
  input: {
    width: "95%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: "#f1f1fa",
    borderWidth: 1,
    color: "gray",
  },
  attachmentButton: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    borderWidth: 1,
    borderColor: "#f1f1fa",
    gap: 10,
    color: "gray",
  },
  attachmentText: {
    color: "gray",
  },
  continueButton: {
    backgroundColor: "#6A1B9A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "95%",
    borderWidth: 1,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
  },
  modalContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "20%",
    width: "100%",
    gap: 25,
  },
  modalOption: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginVertical: 35,
    backgroundColor: "#eee5ff",
    borderRadius: 15,
    width: "25%",
    marginLeft: 12,
  },
  modalOptionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6A1B9A",
  },
  attachmentPreviewContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 15,
    width: "95%",
  },
  attachmentPreview: {
    position: "relative",
    width: 118,
    height: 118,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "red",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  attachmentName: {
    fontSize: 14,
    color: "#6A1B9A",
    textAlign: "center",
    padding: 10,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    overflow: "scroll",
    maxHeight: 850,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  dropdownItemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  successContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  popup: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  popupText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A1B9A",
    marginBottom: 20,
  },
  successText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 20,
  },
});
