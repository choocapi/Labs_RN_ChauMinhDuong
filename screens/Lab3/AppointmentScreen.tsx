import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { useAuth } from "@/context/authContext";
import colors from "@/utils/colors";
import { Appointment } from "@/types";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatCurrency } from "@/utils/common";
import { CalendarX, PencilSimple } from "phosphor-react-native";
import { Image } from "expo-image";

const AppointmentScreen = ({ navigation }: { navigation: any }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const { user } = useAuth();

  // Fetch appointments
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(firestore, "appointments"),
      where("customerId", "==", user.uid),
      orderBy("appointmentDate", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const appointmentList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Appointment[];
      setAppointments(appointmentList);
    });

    return () => unsubscribe();
  }, [user]);

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "denied":
        return "Đã từ chối";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return colors.pending;
      case "confirmed":
        return colors.confirmed;
      case "denied":
        return colors.cancelled;
      case "cancelled":
        return colors.cancelled;
      default:
        return colors.default;
    }
  };

  const formatDate = (date: Date | any) => {
    if (!date) return "";
    if (typeof date === "string") return date;
    if (date.toDate) return date.toDate().toLocaleDateString("vi-VN");
    if (date instanceof Date) return date.toLocaleDateString("vi-VN");
    return "";
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    Alert.alert("Xác nhận hủy", "Bạn có chắc chắn muốn hủy lịch hẹn này?", [
      {
        text: "Không",
        style: "cancel",
      },
      {
        text: "Hủy lịch",
        style: "destructive",
        onPress: async () => {
          try {
            await updateDoc(doc(firestore, "appointments", appointmentId), {
              status: "cancelled",
              updatedAt: new Date(),
            });
            Alert.alert("Thành công", "Đã hủy lịch hẹn thành công");
          } catch (error) {
            console.error("Cancel error:", error);
            Alert.alert("Lỗi", "Không thể hủy lịch hẹn. Vui lòng thử lại sau.");
          }
        },
      },
    ]);
  };

  const handleUpdateAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
    setSelectedAppointment(null);
  };

  const handleConfirmDate = async (date: Date) => {
    hideDatePicker();

    if (!selectedAppointment) return;

    if (date < new Date()) {
      Alert.alert("Lỗi", "Không thể đặt lịch trong quá khứ");
      return;
    }

    const hour = date.getHours();
    if (hour < 8 || hour >= 20) {
      Alert.alert("Lỗi", "Vui lòng chọn thời gian trong khoảng 8:00 - 20:00");
      return;
    }

    try {
      await updateDoc(doc(firestore, "appointments", selectedAppointment.id), {
        appointmentDate: date,
        updatedAt: new Date(),
      });
      Alert.alert("Thành công", "Đã cập nhật lịch hẹn thành công");
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert("Lỗi", "Không thể cập nhật lịch hẹn. Vui lòng thử lại sau.");
    }
  };

  const renderItem = ({ item }: { item: Appointment }) => {
    return (
      <View style={styles.appointmentItem}>
        <View style={styles.appointmentContent}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.serviceImage}
              contentFit="cover"
            />
          </View>
          <View style={styles.appointmentInfo}>
            <Text style={styles.serviceName} numberOfLines={1}>
              {item.serviceName}
            </Text>
            <Text style={styles.servicePrice}>
              {formatCurrency(item.servicePrice)}
            </Text>
            <Text style={styles.appointmentDate}>
              {formatDate(item.appointmentDate)}
            </Text>
          </View>
          <View style={styles.actionsContainer}>
            <View
              style={[
                styles.statusContainer,
                { backgroundColor: getStatusColor(item.status) },
              ]}
            >
              <Text style={styles.statusText}>
                {getStatusText(item.status)}
              </Text>
            </View>
            {item.status === "pending" && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.updateButton]}
                  onPress={() => handleUpdateAppointment(item)}
                >
                  <PencilSimple weight="fill" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() => handleCancelAppointment(item.id)}
                >
                  <CalendarX weight="fill" size={24} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lịch hẹn của tôi</Text>
      </View>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có lịch hẹn nào</Text>
          </View>
        }
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
        minuteInterval={30}
        locale="vi-VN"
      />
      <StatusBar backgroundColor={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  appointmentItem: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  appointmentContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    marginRight: 12,
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  appointmentInfo: {
    flex: 1,
    marginRight: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 4,
  },
  appointmentDate: {
    fontSize: 14,
    color: "#666",
  },
  actionsContainer: {
    alignItems: "flex-end",
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
    marginBottom: 8,
  },
  statusText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: colors.cancelled,
  },
  updateButton: {
    backgroundColor: colors.confirmed,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});

export default AppointmentScreen;
