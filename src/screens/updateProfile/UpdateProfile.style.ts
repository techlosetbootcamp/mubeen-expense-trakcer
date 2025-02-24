import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    stretch: {
        width: 50,
        height: 200,
        resizeMode: 'stretch',
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        maxHeight: "100%",
    },
    arrowText: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 40,
        color: "black",
        paddingHorizontal: 30
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: "black",
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 40,
    },
    avatarContainer: {
        borderColor: "#8A2BE2",
        borderWidth: 2,
        borderRadius: 50,
        padding: 2,
        marginRight: 16,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderColor: "#8A2BE2",
        borderWidth: 2,
        marginTop: 40,
        flexDirection: "row",
    },
    pencilIconContainer: {
        position: "absolute",
        bottom: 5, // Move icon slightly inside the image
        right: 125,  // Move it towards the border
        backgroundColor: "white",
        borderRadius: 15, // Make it circular
        padding: 6, // Padding for a clean look
        alignItems: "center",
        justifyContent: "center",
    },

    inputContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        marginBottom: 40
        // flex: 1
    },

    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#000",
    },

    input: {
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        color: "#000",
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 15,
    },
    modalButton: {
        backgroundColor: "#7f3dff",
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 40,
        width: "90%",
        justifyContent: "center",
        marginBottom: 30
    },
    modalButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    textContainer: {
        flex: 1,
    },
    username: {
        fontSize: 14,
        color: "gray",
        fontWeight: "500",
    },
    editIcon: {
        padding: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1F2937",
    },
    placeholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
    },
    placeholderText: {
        color: "#6B7280",
        fontSize: 32,
    },
    profilePictureContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    }
});


export default styles