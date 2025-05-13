import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/utils/colors";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-paper";
import { uploadImage } from "@/services/imageService";
import { Image } from "expo-image";

const EditProfileScreen = ({ navigation }: { navigation: any }) => {
  const { user, updateUserInfo } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState<string | null>(user?.imageUrl || null);
  const [uploading, setUploading] = useState(false);

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

  const handleUpdateProfile = async () => {
    if (!name) {
      Alert.alert("Cảnh báo", "Vui lòng nhập tên");
      return;
    }

    try {
      setUploading(true);
      let imageUrl = user?.imageUrl;

      if (image && image !== user?.imageUrl) {
        imageUrl = await uploadImage(image);
      }

      await updateUserInfo(user?.uid!, {
        name: name.trim(),
        imageUrl,
      });
      Alert.alert("Thành công", "Cập nhật thông tin thành công");
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Profile update error:", error);
      Alert.alert("Lỗi", "Không thể cập nhật thông tin");
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={handleImagePicker}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.profileImage}
              contentFit="cover"
            />
          ) : (
            <Image
              source={require("@/assets/defaultAvatar.png")}
              style={styles.profileImage}
              contentFit="cover"
            />
          )}
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nhập tên của bạn"
            mode="outlined"
            outlineColor={colors.primary}
            autoCapitalize="none"
            theme={{
              colors: {
                primary: colors.primary,
              },
            }}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, uploading && styles.buttonDisabled]}
          onPress={handleUpdateProfile}
          disabled={uploading}
        >
          <Text style={styles.buttonText}>
            {uploading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              "Cập nhật thông tin"
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 75,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
