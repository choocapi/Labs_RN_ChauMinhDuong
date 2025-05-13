import { useAuth } from "@/context/authContext";
import colors from "@/utils/colors";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { formatCurrency } from "@/utils/common";
import { Image } from "expo-image";
const ServiceDetailScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { service } = route.params;
  const { user } = useAuth();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (date: any) => {
    if (!date) return "";
    if (typeof date === "string") return date;
    if (date.toDate) return date.toDate().toLocaleString("vi-VN");
    if (date instanceof Date) return date.toLocaleString("vi-VN");
    return "";
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    hideDatePicker();

    if (date < new Date()) {
      Alert.alert("Lỗi", "Không thể đặt lịch trong quá khứ");
      return;
    }

    const hour = date.getHours();
    if (hour < 8 || hour >= 20) {
      Alert.alert("Lỗi", "Vui lòng chọn thời gian trong khoảng 8:00 - 20:00");
      return;
    }

    setSelectedDate(date);
    setIsLoading(true);
    handleBookAppointment(date);
  };

  const handleBookAppointment = async (date: Date) => {
    try {
      const appointmentData = {
        serviceId: service.id,
        serviceName: service.name,
        servicePrice: service.price,
        imageUrl: service.imageUrl,
        customerId: user?.uid,
        customerName: user?.name,
        appointmentDate: date,
        status: "pending", // pending, confirmed, denied, cancelled
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(firestore, "appointments"), appointmentData);
      Alert.alert(
        "Thành công",
        "Đặt lịch thành công! Chúng tôi sẽ xác nhận lịch hẹn của bạn sớm nhất.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Booking error:", error);
      Alert.alert("Lỗi", "Không thể đặt lịch. Vui lòng thử lại sau.");
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {service.imageUrl ? (
        <Image
          source={{ uri: service.imageUrl }}
          style={styles.image}
          contentFit="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>No Image</Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.textInfo}>
          <Text style={styles.label}>Tên dịch vụ: </Text>
          {service.name}
        </Text>
        <Text style={styles.textInfo}>
          <Text style={styles.label}>Giá: </Text>
          {formatCurrency(service.price)}
        </Text>
        <Text style={styles.textInfo}>
          <Text style={styles.label}>Người tạo: </Text>
          {service.creator}
        </Text>
        <Text style={styles.textInfo}>
          <Text style={styles.label}>Thời gian tạo: </Text>
          {formatDate(service.createdAt)}
        </Text>
        <Text style={styles.textInfo}>
          <Text style={styles.label}>Cập nhật lần cuối: </Text>
          {formatDate(service.updatedAt)}
        </Text>
      </View>

      {user?.role === "customer" && (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={showDatePicker}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                "Đặt lịch ngay"
              )}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={new Date()}
            minuteInterval={30}
            locale="vi-VN"
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 250,
  },
  imagePlaceholder: {
    width: "100%",
    height: 250,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    color: "#666",
    fontSize: 16,
  },
  infoContainer: {
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  textInfo: {
    fontSize: 18,
    marginBottom: 12,
    color: "#444",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    margin: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ServiceDetailScreen;
