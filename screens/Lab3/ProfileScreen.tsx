import { auth } from "@/config/firebase";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "@/utils/colors";
import * as Icons from "phosphor-react-native";
import { useAuth } from "@/context/authContext";
import { Image } from "expo-image";

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useAuth();

  const handleLogout = () => {
    auth.signOut();
    navigation.navigate("KamiSpa_Auth");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* name & email & image */}
        <View style={styles.profileInfo}>
          {user?.imageUrl ? (
            <Image
              source={{ uri: user?.imageUrl }}
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
          <Text style={styles.profileName}>{user?.name || "No Name"}</Text>
          <Text style={styles.profileEmail}>{user?.email || ""}</Text>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Icons.Pencil weight="bold" size={24} color={colors.primary} />
            <Text style={styles.optionText}>Đổi thông tin cá nhân</Text>
            <Icons.CaretRight weight="bold" size={18} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Icons.Lock weight="bold" size={24} color={colors.primary} />
            <Text style={styles.optionText}>Đổi mật khẩu</Text>
            <Icons.CaretRight weight="bold" size={18} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icons.SignOut size={24} color="white" />
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
  profileInfo: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
    textAlign: "center",
  },
  profileEmail: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
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
    alignSelf: "center",
    minWidth: 180,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default ProfileScreen;
