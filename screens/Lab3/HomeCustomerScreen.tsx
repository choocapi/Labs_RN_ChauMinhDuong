import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { firestore } from "@/config/firebase";
import colors from "@/utils/colors";
import { PlusCircle, UserCircle, MagnifyingGlass } from "phosphor-react-native";
import { useAuth } from "@/context/authContext";
import { Service } from "@/types";
import { formatCurrency } from "@/utils/common";
import { TextInput } from "react-native-paper";
import { Image } from "expo-image";

const HomeCustomerScreen = ({ navigation }: { navigation: any }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  // Filter services based on search query
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // fetch services
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(firestore, "services"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const serviceList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Service[];
      setServices(serviceList);
    });

    return () => unsubscribe();
  }, [user]);

  const renderItems = ({ item }: { item: Service }) => {
    const openServiceDetail = () => {
      navigation.navigate("ServiceDetail", { service: item });
    };

    return (
      <TouchableOpacity style={styles.serviceItem} onPress={openServiceDetail}>
        {item.imageUrl ? (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.serviceImage}
            contentFit="cover"
          />
        ) : (
          <View style={styles.serviceImagePlaceholder}>
            <Text style={styles.serviceImagePlaceholderText}>No Image</Text>
          </View>
        )}
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.servicePrice}>{formatCurrency(item.price)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{user?.name || user?.email}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile", { userInfo: user })}
        >
          <UserCircle weight="fill" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/logolab3.png")}
          style={styles.logo}
          contentFit="contain"
        />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          placeholder="Tìm kiếm dịch vụ..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          left={
            <TextInput.Icon
              icon={() => <MagnifyingGlass size={20} color={colors.primary} />}
            />
          }
          right={
            searchQuery ? (
              <TextInput.Icon icon="close" onPress={() => setSearchQuery("")} />
            ) : null
          }
          outlineColor={colors.primary}
          activeOutlineColor={colors.primary}
        />
      </View>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Danh sách dịch vụ</Text>
      </View>
      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        renderItem={renderItems}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery
                ? "Không tìm thấy dịch vụ phù hợp"
                : "Chưa có dịch vụ nào"}
            </Text>
          </View>
        }
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
  logoContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  logo: {
    width: 200,
    height: 150,
    marginTop: 10,
    marginBottom: -10,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: -10,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 4,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  addButton: {
    marginLeft: 8,
  },
  serviceItem: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  serviceImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#eee",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  serviceImagePlaceholderText: {
    color: "#999",
    fontSize: 12,
  },
  serviceInfo: {
    flex: 1,
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
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  searchInput: {
    backgroundColor: "white",
    fontSize: 16,
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

export default HomeCustomerScreen;
