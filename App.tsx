import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContactsNavigator from "./screens/Lab2/routes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import OptionsScreen from "./screens/Lab2/Options";
import colors from "./utils/colors";
import Index from "./screens/Index";
import CustomNavigationBar from "./components/CustomNavigationBar";
import {
  AddServiceScreen,
  ServiceDetailScreen,
  CustomerScreen,
  TransactionScreen,
  HomeAdminScreen,
  HomeCustomerScreen,
  ForgotPasswordScreen,
  LoginScreen,
  RegisterScreen,
  SettingScreen,
  ProfileScreen,
  AppInitializer,
  EditProfileScreen,
  ChangePasswordScreen,
  AppointmentScreen,
} from "@/screens/Lab3";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "./context/authContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const getTabBarIcon =
  (icon: any) =>
  ({ color }: any) =>
    <MaterialIcons name={icon} size={26} style={{ color }} />;

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="AppInit"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="AppInit" component={AppInitializer} />
            <Stack.Screen name="KamiSpa_Auth" component={KamiSpa_Auth} />
            <Stack.Screen name="KamiSpa_Admin" component={KamiSpa_Admin} />
            <Stack.Screen
              name="KamiSpa_Customer"
              component={KamiSpa_Customer}
            />
            <Stack.Screen name="Index" component={Index} />
            <Stack.Screen name="Lab2" component={ContactsNavigator} />
            <Stack.Screen name="Options" component={OptionsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}

const KamiSpa_Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Đăng nhập" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Đăng ký" }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: "Quên mật khẩu" }}
      />
    </Stack.Navigator>
  );
};

const KamiSpa_Admin = () => {
  return (
    <Stack.Navigator
      initialRouteName="KamiSpa_Admin_BottomNav"
      screenOptions={{
        header: (props: any) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeAdminScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Hồ sơ" }}
      />
      <Stack.Screen
        name="AddService"
        component={AddServiceScreen}
        options={{ title: "Thêm dịch vụ" }}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{ title: "Chi tiết dịch vụ" }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Chỉnh sửa hồ sơ" }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ title: "Đổi mật khẩu" }}
      />
      <Stack.Screen
        name="KamiSpa_Admin_BottomNav"
        component={KamiSpa_Admin_BottomNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const KamiSpa_Customer = () => {
  return (
    <Stack.Navigator
      initialRouteName="KamiSpa_Customer_BottomNav"
      screenOptions={{
        header: (props: any) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeCustomerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Hồ sơ" }}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{ title: "Chi tiết dịch vụ" }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Chỉnh sửa hồ sơ" }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ title: "Đổi mật khẩu" }}
      />
      <Stack.Screen
        name="KamiSpa_Customer_BottomNav"
        component={KamiSpa_Customer_BottomNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const KamiSpa_Admin_BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.greyLight,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeAdminScreen}
        options={{
          tabBarIcon: getTabBarIcon("home"),
          title: "Trang chủ",
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          tabBarIcon: getTabBarIcon("money"),
          title: "Lịch đặt",
        }}
      />
      <Tab.Screen
        name="Customer"
        component={CustomerScreen}
        options={{
          tabBarIcon: getTabBarIcon("person-outline"),
          title: "Khách hàng",
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: getTabBarIcon("settings"),
          title: "Cài đặt",
        }}
      />
    </Tab.Navigator>
  );
};

const KamiSpa_Customer_BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.greyLight,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeCustomerScreen}
        options={{
          tabBarIcon: getTabBarIcon("home"),
          title: "Trang chủ",
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentScreen}
        options={{
          tabBarIcon: getTabBarIcon("calendar-month"),
          title: "Lịch đặt",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: getTabBarIcon("settings"),
          title: "Cài đặt",
        }}
      />
    </Tab.Navigator>
  );
};
