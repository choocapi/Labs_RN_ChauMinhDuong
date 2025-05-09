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
} from "@/screens/Lab3";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "./context/authContext";
import AdminInitializer from "./screens/Lab3/AdminInitalizer";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const getTabBarIcon =
  (icon: any) =>
  ({ color }: any) =>
    <MaterialIcons name={icon} size={26} style={{ color }} />;

export default function App() {
  return (
    <AuthProvider>
      <AdminInitializer />
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="KamiSpa_Auth"
            screenOptions={{ headerShown: false }}
          >
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
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
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
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name="AddService"
        component={AddServiceScreen}
        options={{ title: "Service" }}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{ title: "Service detail" }}
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
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{ title: "Service detail" }}
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
        options={{ tabBarIcon: getTabBarIcon("home") }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{ tabBarIcon: getTabBarIcon("money") }}
      />
      <Tab.Screen
        name="Customer"
        component={CustomerScreen}
        options={{ tabBarIcon: getTabBarIcon("person-outline") }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{ tabBarIcon: getTabBarIcon("settings") }}
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
        options={{ tabBarIcon: getTabBarIcon("home") }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{ tabBarIcon: getTabBarIcon("settings") }}
      />
    </Tab.Navigator>
  );
};
