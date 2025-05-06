// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiRdIWMruG5eqrQv1ayG59J_P897I_wNo",
  authDomain: "reactnativefirebase-49b75.firebaseapp.com",
  projectId: "reactnativefirebase-49b75",
  storageBucket: "reactnativefirebase-49b75.firebasestorage.app",
  messagingSenderId: "281115227767",
  appId: "1:281115227767:web:5bbe92972eed6a2f8ff872",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// DB
const firestore = getFirestore(app);

// Storage
const storage = getStorage(app);

export { auth, firestore, storage };
