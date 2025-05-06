import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "@/config/firebase";
import colors from "@/utils/colors";

type Service = {
  id?: string;
  name: string;
  price: number;
  creator: string;
  createdAt: Date | Timestamp | string;
  updatedAt: Date | Timestamp | string;
};

const AddServiceScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const editingService: Service | undefined = route?.params?.service;
  const [name, setName] = useState(editingService?.name || "");
  const [price, setPrice] = useState(editingService?.price?.toString() || "");

  useEffect(() => {
    if (editingService) {
      setName(editingService.name);
      setPrice(editingService.price?.toString());
    }
  }, [editingService]);

  const handleSubmit = async () => {
    if (!name || !price) {
      Alert.alert("Cảnh báo", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      if (editingService && editingService.id) {
        await updateDoc(doc(firestore, "services", editingService.id), {
          name: name.trim(),
          price: parseInt(price),
          updatedAt: new Date(),
        });
        Alert.alert("Thành công", "Dịch vụ đã được cập nhật!");
      } else {
        const newService: Omit<Service, "id"> = {
          name: name.trim(),
          price: parseInt(price),
          creator: "Chau Minh Duong",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await addDoc(collection(firestore, "services"), newService);
        Alert.alert("Thành công", "Dịch vụ đã được thêm!");
      }
      navigation.goBack();
    } catch (error) {
      console.error("Service error:", error);
      Alert.alert("Lỗi", "Không thể xử lý dịch vụ!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên dịch vụ</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên dịch vụ"
        mode="outlined"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        theme={{
          colors: {
            primary: colors.primary,
          },
        }}
      />

      <Text style={styles.label}>Giá tiền (VNĐ)</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập giá tiền"
        mode="outlined"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        autoCapitalize="none"
        theme={{
          colors: {
            primary: colors.primary,
          },
        }}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {editingService && editingService.id ? "Cập nhật" : "Thêm"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  label: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginBottom: 6,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddServiceScreen;
