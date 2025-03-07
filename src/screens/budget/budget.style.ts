import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 40,
        paddingHorizontal: 20,
        marginBottom: 80
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    addButton: {
        backgroundColor: "#4CAF50",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    budgetCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        flexDirection: "column", justifyContent: "space-between",
    },
    categoryName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    durationText: {
        fontSize: 14,
        color: "#666",
    },
    budgetAmount: {
        fontSize: 16,
        color: "#2ecc71",
        fontWeight: "bold",
    },
    emptyText: {
        textAlign: "center",
        color: "#999",
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        width: "80%",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
    },
    optionButton: {
        backgroundColor: "#ddd",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    selectedOption: {
        backgroundColor: "#4CAF50",
    },
    optionText: {
        color: "#333",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 15,
        textAlign: "center",
    },
    addBudgetButton: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: "100%",
        alignItems: "center",
    },
    addBudgetButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    closeButton: {
        marginTop: 10,
    },
    closeButtonText: {
        color: "#e74c3c",
        fontWeight: "bold",
    },
});


export default styles




