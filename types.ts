import { Timestamp } from "firebase/firestore";

export type UserType = {
  uid: string;
  email: string;
  name?: string;
  role?: string;
};

export type Service = {
  id: string;
  name: string;
  price: number;
  creator: string;
  imageUrl?: string;
  createdAt: Date | Timestamp | string;
  updatedAt: Date | Timestamp | string;
};

export type AuthContextType = {
  user: UserType | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; msg: string; role?: string }>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; msg: string }>;
  logout: () => Promise<void>;
};
