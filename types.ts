import { Timestamp } from "firebase/firestore";

export type UserType = {
  uid: string;
  email: string;
  name?: string;
  imageUrl?: string;
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

export type Appointment = {
  id: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  imageUrl?: string;
  customerId: string;
  customerName: string;
  appointmentDate: Date;
  status: string;
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
  resetPassword: (email: string) => Promise<{ success: boolean; msg: string }>;
  changePassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<{ success: boolean; msg: string }>;
  updateUserInfo: (
    uid: string,
    data: {
      name?: string;
      email?: string;
      role?: string;
      imageUrl?: string;
    }
  ) => Promise<{ success: boolean; msg: string }>;
};
