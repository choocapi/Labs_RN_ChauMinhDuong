import { ref, uploadBytes } from "firebase/storage";

import { storage } from "@/config/firebase";
import { getDownloadURL } from "firebase/storage";

export const uploadImage = async (uri: string): Promise<string> => {
  const fileName = uri.split("/").pop() || "file.jpg";
  const storageRef = ref(storage, `services/${fileName}`);

  const response = await fetch(uri);
  const blob = await response.blob();

  await uploadBytes(storageRef, blob);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
