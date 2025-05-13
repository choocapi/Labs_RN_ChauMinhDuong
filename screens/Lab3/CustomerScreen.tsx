import { StyleSheet, Text, View, FlatList, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { useAuth } from "@/context/authContext";
import colors from "@/utils/colors";
import { UserType } from "@/types";
import { EnvelopeSimple, User } from "phosphor-react-native";
import { Image } from "expo-image";

const CustomerScreen = () => {
  const [customers, setCustomers] = useState<UserType[]>([]);
  const { user } = useAuth();

  // Fetch customers
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(firestore, "users"),
      where("role", "==", "customer"),
      orderBy("name", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const customerList = snapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as UserType[];
      setCustomers(customerList);
    });

    return () => unsubscribe();
  }, [user]);

  const renderItem = ({ item }: { item: UserType }) => {
    return (
      <View style={styles.customerItem}>
        <View style={styles.customerContent}>
          <View style={styles.imageContainer}>
            {item.imageUrl ? (
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.customerImage}
                contentFit="cover"
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <User weight="fill" size={32} color="#999" />
              </View>
            )}
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName} numberOfLines={1}>
              {item.name || "Chưa cập nhật tên"}
            </Text>
            <View style={styles.emailContainer}>
              <EnvelopeSimple size={16} color="#666" />
              <Text style={styles.customerEmail} numberOfLines={1}>
                {item.email}
              </Text>
            </View>
          </View>
          <View style={styles.roleContainer}>
            <Text style={styles.roleText}>Khách hàng</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Danh sách khách hàng</Text>
      </View>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.uid}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có khách hàng nào</Text>
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
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  customerItem: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  customerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    marginRight: 12,
  },
  customerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  customerInfo: {
    flex: 1,
    marginRight: 12,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  customerEmail: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  roleContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  roleText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
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

export default CustomerScreen;
