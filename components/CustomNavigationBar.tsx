import React, { useState } from "react";
import { getHeaderTitle } from "@react-navigation/elements";
import { Appbar, Menu } from "react-native-paper";
import colors from "@/utils/colors";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { Alert } from "react-native";
import { useAuth } from "@/context/authContext";

const CustomNavigationBar = ({ navigation, route, options, back }: any) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const title = getHeaderTitle(options, route.name);
  const service = route.params?.service;
  const { user } = useAuth();

  const handleEditService = () => {
    if (!service) return;
    navigation.navigate("AddService", { service });
    closeMenu();
  };

  const handleDeleteService = async () => {
    if (!service) return;

    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa dịch vụ này?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(firestore, "services", service.id));
            Alert.alert("Thành công", "Dịch vụ đã được xóa!");
            navigation.goBack();
          } catch (error) {
            console.error("Delete error:", error);
            Alert.alert("Lỗi", "Không thể xóa dịch vụ!");
          }
        },
      },
    ]);
    closeMenu();
  };

  return (
    <Appbar.Header style={{ backgroundColor: colors.primary }}>
      {back ? (
        <Appbar.BackAction onPress={navigation.goBack} color="white" />
      ) : null}
      <Appbar.Content
        title={title}
        titleStyle={{ color: "white", fontSize: 20, fontWeight: "bold" }}
      />
      {!back || (route.name === "ServiceDetail" && user?.role === "admin") ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={openMenu}
              color="white"
            />
          }
        >
          <Menu.Item
            onPress={handleEditService}
            title="Cập nhật dịch vụ"
            leadingIcon="pencil"
          />
          <Menu.Item
            onPress={handleDeleteService}
            title="Xóa dịch vụ"
            leadingIcon="delete"
          />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
};

export default CustomNavigationBar;
