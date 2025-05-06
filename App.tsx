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
  HomeScreen,
  ForgotPasswordScreen,
  LoginScreen,
  RegisterScreen,
  SettingScreen,
  ProfileScreen,
} from "@/screens/Lab3";
import { PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const getTabBarIcon =
  (icon: any) =>
  ({ color }: any) =>
    <MaterialIcons name={icon} size={26} style={{ color }} />;

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="KamiSpa_Auth"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="KamiSpa_Auth" component={KamiSpa_Auth} />
          <Stack.Screen name="KamiSpa_Main" component={KamiSpa_Main} />
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="Lab2" component={ContactsNavigator} />
          <Stack.Screen name="Options" component={OptionsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
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

const KamiSpa_Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="KamiSpa_BottomNav"
      screenOptions={{
        header: (props: any) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
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
        name="KamiSpa_BottomNav"
        component={KamiSpa_BottomNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const KamiSpa_BottomNav = () => {
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
        component={HomeScreen}
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
