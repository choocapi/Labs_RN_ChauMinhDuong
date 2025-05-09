import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/config/firebase";
import colors from "@/utils/colors";
import { useAuth } from "@/context/authContext";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Service } from "@/types";

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
  const [image, setImage] = useState<string | null>(
    editingService?.imageUrl || null
  );
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (editingService) {
      setName(editingService.name);
      setPrice(editingService.price?.toString());
      setImage(editingService.imageUrl || null);
    }
  }, [editingService]);

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string): Promise<string> => {
    const fileName = uri.split("/").pop() || "file.jpg";
    const storageRef = ref(storage, `services/${fileName}`);

    const response = await fetch(uri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSubmit = async () => {
    if (!name || !price) {
      Alert.alert("Cảnh báo", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setUploading(true);
      let imageUrl = editingService?.imageUrl;

      if (image && image !== editingService?.imageUrl) {
        imageUrl = await uploadImage(image);
      }

      if (editingService && editingService.id) {
        await updateDoc(doc(firestore, "services", editingService.id), {
          name: name.trim(),
          price: parseInt(price),
          imageUrl,
          updatedAt: new Date(),
        });
        Alert.alert("Thành công", "Dịch vụ đã được cập nhật!");
      } else {
        await setDoc(doc(collection(firestore, "services")), {
          name: name.trim(),
          price: parseInt(price),
          creator: user?.name || "",
          imageUrl,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        Alert.alert("Thành công", "Dịch vụ đã được thêm!");
      }
      navigation.goBack();
    } catch (error) {
      console.error("Service error:", error);
      Alert.alert("Lỗi", "Không thể xử lý dịch vụ!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={handleImagePicker}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Chọn ảnh</Text>
          </View>
        )}
      </TouchableOpacity>

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

      <TouchableOpacity
        style={[styles.button, uploading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>
          {uploading
            ? "Đang xử lý..."
            : editingService && editingService.id
            ? "Cập nhật"
            : "Thêm"}
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
  imageContainer: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
  },
  placeholderText: {
    color: "#666",
    fontSize: 16,
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
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddServiceScreen;
