import { auth } from "@/config/firebase";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { CaretRight, HardDrives, Info } from "phosphor-react-native";
import colors from "@/utils/colors";

const SettingScreen = ({ navigation }: { navigation: any }) => {
  const handleLogout = () => {
    auth.signOut();
    navigation.navigate("KamiSpa_Auth");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionItem}>
            <HardDrives weight="bold" size={24} color={colors.primary} />
            <Text style={styles.optionText}>Cài đặt dữ liệu</Text>
            <CaretRight weight="bold" size={18} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Info weight="bold" size={24} color={colors.primary} />
            <Text style={styles.optionText}>Thông tin cá nhân</Text>
            <CaretRight weight="bold" size={18} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={24} color="white" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
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
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  optionsContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#222",
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginVertical: 30,
    paddingVertical: 16,
    borderRadius: 8,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default SettingScreen;
