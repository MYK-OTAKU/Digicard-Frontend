import { createStackNavigator } from '@react-navigation/stack';
import ScanScreen from '../screens/ScanScreen';
import ResultScreen from '../screens/ResultScreen';

const Stack = createStackNavigator();
export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Scan">
      <Stack.Screen 
        name="Scan" 
        component={ScanScreen} 
        options={{ headerShown: false }} // Hide the header
      />
      <Stack.Screen 
        name="Result" 
        component={ResultScreen} 
        options={{ title: 'Scan Result' }} 
      />
    </Stack.Navigator>
  );
}
