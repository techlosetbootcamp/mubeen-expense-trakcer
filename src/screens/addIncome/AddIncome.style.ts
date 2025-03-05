import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputField: { borderBottomWidth: 0, textAlign: "left" },
  container: {
    flex: 1,
    backgroundColor: "#00C853",
    maxHeight: "100%",
  },
  arrowText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 40,
    marginHorizontal: 40,
  },
  greenSection: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#00C853",
    marginLeft: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e8e8e8",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dollarSign: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
    marginRight: 5,
  },
  amount: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 0,
  },
  whiteSection: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    paddingTop: 50,
    minHeight: '33%',
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
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "35%",
    width: "100%",
  },
  modalOption: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee5ff",
    borderRadius: 15,
    width: "30%",
    aspectRatio: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  modalOptionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6A1B9A",
    textAlign: "center",
    marginTop: 5,
  },
  attachmentPreviewContainer: {
    alignSelf: "flex-start", // Align to the left
    marginBottom: 8,
    position: "relative", // For positioning the close button
  },
  attachmentPreview: {
    width: 52,
    height: 52,
    borderRadius: 8,
  },
  closeButton: {
    position: "absolute",
    top: 0, // On the image’s top-right corner
    right: 0,
    backgroundColor: "black",
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
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    maxHeight: "80%",
    minHeight: "80%",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
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

export default styles;