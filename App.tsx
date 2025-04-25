import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactsNavigator from './screens/Lab2/routes';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Lab2'>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Lab2" component={ContactsNavigator} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
