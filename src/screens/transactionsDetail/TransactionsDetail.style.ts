import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topcontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 40,
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
  },
  topcontainerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  topbar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  redcontainer: {
    flex: 3,
    alignItems: 'center',
  },
  amount: {
    fontSize: 48,
    fontWeight: '700',
    color: 'white',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    padding: 5,
    color: 'white',
  },
  datebox: {
    flexDirection: 'row',
    gap: 20,
    padding: 5,
  },
  dateboxText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'white',
  },

  belowContainer: {
    flex: 2,
    backgroundColor: 'white',
    height: 150,
    marginTop: -50,
    marginHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  belowBox1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15,
    flexWrap: 'wrap',
    borderColor: '#E6E6E6',
  },
  box1Text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#91919F',
  },
  box1Text2: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D0E0F',
    paddingTop: 5,
    flexWrap: 'wrap'
  },
  description: {
    paddingVertical: 15,
    fontSize: 14,
    fontWeight: '500',
    color: '#91919F',
    textAlign: 'justify',
    lineHeight: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  descriptionHead: {
    fontSize: 16,
    fontWeight: '600',
    color: '#91919F',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0D0E0F',
    lineHeight: 20,
  },
  pictureBox: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  pic: {
    width: '100%',
    height: 116,
    marginBottom: 10,
    borderRadius: 8,
  },
  imageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#91919F',
    marginBottom: 10,
  },
  actualpic: {
    width: '100%',
    height: 116,
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    width: '100%',

    borderRadius: 16,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: '#7F3DFF',
    marginBottom: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    padding: 5,
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Edit Modal Styles
  editModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  editModalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    maxHeight: '80%',
  },
  editModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#888',
  },
  dropdownMenu: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  fullCategoryModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  fullCategoryModalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    position: 'relative', // Required for absolute positioning of the close icon
  },
  fullCategoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20, // Add margin to avoid overlap with the close icon
  },
  fullCategoryCloseIcon: {
    position: 'absolute', // Position the icon absolutely
    top: 10, // Adjust top position
    right: 10, // Adjust right position
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 40,
    width: "100%",
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#eee5ff",
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 20,
    alignItems: "center",
    marginRight: 10,
    color: "#7f3dff",
  },
  confirmButton: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 20,
    alignItems: "center",
    marginLeft: 10,
  },
  modalCancelButtonText: {
    color: "#7f3dff",
    fontWeight: "bold",
  },
  modalYesButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '90%',
    height: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
});



export default styles