import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 70,
  },
  inputContainer: {
    flex: 1,
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
    borderRadius: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  resetButton: {
    height: 50,
    backgroundColor: "#7f3dff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginVertical: 5,
    textAlign: "center",
  },
});

export default styles;