import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { useAuth } from "@/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/utils/colors";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";

const ChangePasswordScreen = ({ navigation }: { navigation: any }) => {
  const { changePassword } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu mới không khớp");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }

    try {
      setIsLoading(true);
      await changePassword(oldPassword, newPassword);
      Alert.alert("Thành công", "Đổi mật khẩu thành công");
      await signOut(auth);
      navigation.navigate("KamiSpa_Auth");
      // Clear the form
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      Alert.alert(
        "Lỗi",
        "Không thể đổi mật khẩu. Vui lòng kiểm tra mật khẩu hiện tại."
      );
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu hiện tại</Text>
          <TextInput
            style={styles.input}
            value={oldPassword}
            onChangeText={setOldPassword}
            placeholder="Nhập mật khẩu hiện tại"
            secureTextEntry
            mode="outlined"
            outlineColor={colors.primary}
            theme={{
              colors: {
                primary: colors.primary,
              },
            }}
          />

          <Text style={styles.label}>Mật khẩu mới</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Nhập mật khẩu mới"
            secureTextEntry
            mode="outlined"
            outlineColor={colors.primary}
            theme={{
              colors: {
                primary: colors.primary,
              },
            }}
          />

          <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Nhập lại mật khẩu mới"
            secureTextEntry
            mode="outlined"
            outlineColor={colors.primary}
            theme={{
              colors: {
                primary: colors.primary,
              },
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleChangePassword}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              "Đổi mật khẩu"
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
