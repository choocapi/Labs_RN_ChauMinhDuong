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

const admin = {
  name: "Admin",
  email: "admin@gmail.com",
  password: "cmd@0556",
  role: "admin",
};

export default function AdminInitializer() {
  useEffect(() => {
    const checkAdmin = async () => {
      const q = query(
        collection(firestore, "users"),
        where("role", "==", "admin"),
        where("email", "==", admin.email)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            admin.email,
            admin.password
          );
          await setDoc(doc(firestore, "users", userCredential.user.uid), {
            name: admin.name,
            email: admin.email,
            role: admin.role,
            uid: userCredential.user.uid,
          });
        } catch (error) {
          console.error("Error creating admin:", error);
        }
      }
    };
    checkAdmin();
  }, []);

  return null;
}
