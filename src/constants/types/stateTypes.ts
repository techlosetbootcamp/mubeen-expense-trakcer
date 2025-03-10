import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";


export interface Transaction {
    id: string;
    type: "expense" | "income";
    amount: string; // Stored as string in Firebase, parsed to number later
    category: string;
    timestamp: string; // Assuming ISO string or similar from Firebase
    time: string;
  }

export type AttachmentResult = ImagePicker.ImagePickerResult| DocumentPicker.DocumentPickerResult;

// type AttachmentResult = ImagePicker.ImagePickerResult | DocumentPicker.DocumentPickerResult;