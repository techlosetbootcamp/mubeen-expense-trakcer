import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      marginTop: 5,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 80
    },
    textAndButtonCont: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: 10,
    },
    RecentText: {
      marginTop: 30,
      fontSize: 20,
      fontWeight: "bold",
    },
    SeeAllButton: {
      backgroundColor: "#eee5ff",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 15,
      color: "#8647ff",
      fontWeight: "bold",
      fontSize: 16,
      marginTop: 30
    },
    CategoryContainer: {
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      flex: 1,
    },
    IncomeText: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
    },
    PriceText: {
      color: "#fd3c4a",
      fontSize: 18,
      fontWeight: "bold",
    },
    IncomePriceText: {
      color: "#00a86b",
      fontSize: 18,
      fontWeight: "bold",
    },
    TiemText: {
      color: "gray",
      fontSize: 16,
      fontWeight: "bold",
    },
    BuyText: {
      color: "gray",
      fontSize: 16,
      fontWeight: "bold",
    },
    iconContainer: {
      padding: 10,
      borderRadius: 15,
    },
    icon: {
      marginRight: 5,
    },
    CardContainer: {
      marginTop: 10,
      backgroundColor: "#fcfcfc",
      flexDirection: "row",
      alignItems: "flex-start",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      justifyContent: "space-between",
      width: "90%", // Max width for mobile screens
      overflow: "hidden",
    },
    TransactionInfo: {
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingRight: 10,
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 50,
      marginBottom: 80
    },
    
    emptyText: {
      fontSize: 18,
      color: "red",
      marginTop: 10,
      fontWeight: "500",
    },
  });



  export default styles
  