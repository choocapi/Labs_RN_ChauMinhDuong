import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import colors from "@/utils/colors";
import { PlusCircle, UserCircle } from "phosphor-react-native";

type UserType = {
  uid: string;
  email: string | null;
  name: string | null;
};

type Service = {
  id: string;
  name: string;
  price: number;
  creator: string;
  createdAt: Date | Timestamp | string;
  updatedAt: Date | Timestamp | string;
};

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [user, setUser] = useState<UserType | null>(null);

  // fetch user info in firestore
  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(firestore, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({
          uid: uid,
          email: userData.email,
          name: userData.name,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // check user logged in before
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        fetchUserData(firebaseUser.uid);
      } else {
        setUser(null);
        navigation.navigate("KamiSpa_Auth");
      }
    });
    return () => unsubscribe();
  }, []);

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
        <Text style={styles.serviceName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.servicePrice}>
          {item.price?.toLocaleString()} ₫
        </Text>
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
          resizeMode="contain"
        />
      </View>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Danh sách dịch vụ</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddService")}
        >
          <PlusCircle weight="fill" size={32} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderItems}
        contentContainerStyle={{ paddingBottom: 80 }}
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
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#eee",
  },
  serviceName: {
    fontSize: 16,
    color: "#222",
    flex: 1,
    marginRight: 10,
  },
  servicePrice: {
    fontSize: 15,
    color: "gray",
    fontWeight: "bold",
  },
});

export default HomeScreen;
