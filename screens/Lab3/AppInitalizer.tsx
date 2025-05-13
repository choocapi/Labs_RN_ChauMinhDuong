import { useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import { firestore, auth } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/context/authContext";

const adminInfo = {
  name: "Admin",
  email: "admin@gmail.com",
  password: "cmd@0556",
  role: "admin",
};

export default function AppInitializer({ navigation }: { navigation: any }) {
  const { user } = useAuth();
  useEffect(() => {
    const checkAdmin = async () => {
      const q = query(
        collection(firestore, "users"),
        where("role", "==", "admin"),
        where("email", "==", adminInfo.email)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            adminInfo.email,
            adminInfo.password
          );
          await setDoc(doc(firestore, "users", userCredential.user.uid), {
            name: adminInfo.name,
            email: adminInfo.email,
            role: adminInfo.role,
            uid: userCredential.user.uid,
          });
        } catch (error) {
          console.error("Error creating admin:", error);
        }
      }
    };
    checkAdmin();
    if (!auth.currentUser) {
      navigation.replace("KamiSpa_Auth");
      return;
    }

    const route =
      user?.role === "customer" ? "KamiSpa_Customer" : "KamiSpa_Admin";
    navigation.replace(route);
  }, [navigation, user]);

  return null;
}
