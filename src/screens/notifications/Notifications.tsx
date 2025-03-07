import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import styles from "./notification.style";
import useNotifications from "./useNotifications";


const Notifications: React.FC = () => {
  
  const {
    dispatch,
    notifications,
    useEffect,
    navigation
} = useNotifications()

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
