import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { markNotificationsAsSeen, updateNotificationsSeen } from "../../store/slices/BudgetSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";


const Notifications: React.FC = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.budget.notifications);

  useEffect(() => {
    dispatch(markNotificationsAsSeen());
    dispatch(updateNotificationsSeen() as any); // Persist to Firebase
  }, [dispatch]);

  const navigation: any = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <Ionicons name="notifications" size={28} color="#7f3dff" />
      </View>
      <FlatList
        data={notifications.slice().reverse()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.notificationItem, !item.isSeen && styles.unseen]}>
            <Ionicons
              name={item.isSeen ? "checkmark-circle-outline" : "alert-circle-outline"}
              size={24}
              color={item.isSeen ? "#6B7280" : "#FF6347"}
              style={styles.icon}
            />
            <View style={styles.content}>
              <View style={styles.messageRow}>
                <Text style={styles.notificationText}>{item.message}</Text>
                {!item.isSeen && <Text style={styles.newLabel}>New</Text>}
              </View>
              <Text style={styles.timestamp}>
                {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={50} color="#6B7280" />
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
  },
  unseen: {
    backgroundColor: "#ffe6e6",
  },
  icon: {
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  messageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  newLabel: {
    backgroundColor: "#FF6347",
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#6B7280",
    marginTop: 10,
  },
  listContent: {
    padding: 20,
  },
});