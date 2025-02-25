import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#7f3dff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  switchText: {
    color: "#7f3dff",
    textDecorationLine: "underline",
    marginTop: 10,
    alignSelf: "center",
    paddingLeft: 60
  },
  orText: {
    textAlign: "center",
    width: "100%",
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "200",
    color: 'gray',
  },
  googleButton: {
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignSelf: "center",
    width: "90%",
  },
  googleButtonText: {
    fontSize: 20,
    paddingLeft: 20,
  },
  forgotPassword: {
    fontSize: 18,
    color: '#7f3dff',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingLeft: 160,
    paddingBottom: 4,
    flexWrap: 'wrap',
  },
  Policy: {
    fontSize: 15,
    color: 'blcak',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 4,
    flexWrap: 'wrap',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
});

export default styles;