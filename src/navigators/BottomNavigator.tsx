import { Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Fa6 from 'react-native-vector-icons/FontAwesome6';
import { FONT } from '../utils/theme';
import { LoginScreen } from '../Screens/authScreens/LoginScreen';
import { CreateAccount } from '../Screens/authScreens/CreateAccount';
import { OwnerDashboard } from '../Screens/Owners/DashboardScreen/Dashboard';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={OwnerDashboard} />
      <Tab.Screen name="Students" component={LoginScreen} />
      <Tab.Screen name="Teachers" component={CreateAccount} />
    </Tab.Navigator>
  );
}
