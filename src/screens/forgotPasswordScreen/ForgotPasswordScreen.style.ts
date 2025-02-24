import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: "#fff",
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 40,
      marginBottom: 70,
    },
    text: {
      fontWeight: "bold",
      fontSize: 28,
      marginBottom: 40,
    },
    headerText: {
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 10,
      textAlign: "center",
      paddingHorizontal: 70,
      marginBottom: 1,
    },
    input: {
      height: 50,
      borderColor: "#e5e5e5",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginVertical: 10,
    },
    forgotButton: {
      height: 50,
      backgroundColor: "#7f3dff",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      marginVertical: 10,
    },
    forgotButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    orText: {
      textAlign: "center",
      color: "#9e9e9e",
      marginVertical: 10,
    },
    bottomLine: {
      position: "absolute",
      bottom: 20,
      left: "40%",
      width: "20%",
      height: 2,
      backgroundColor: "#000",
    },
    errorText: {
      color: "red",
      marginVertical: 5,
      textAlign: "center",
    },
  });
  


  export default styles