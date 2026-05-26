import { Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Fa6 from 'react-native-vector-icons/FontAwesome6';
import { FONT } from '../utils/theme';
import { OwnerDashboard } from '../Screens/HomeScreen/OwnerDashboard';
import { LoginScreen } from '../Screens/authScreens/LoginScreen';
import { CreateAccount } from '../Screens/authScreens/CreateAccount';
import { HomeScreen } from '../Screens/HomeScreen/HomeScreen';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={OwnerDashboard} />
      <Tab.Screen name="Students" component={LoginScreen} />
      <Tab.Screen name="Teachers" component={CreateAccount} />
      <Tab.Screen name="Profile" component={HomeScreen} />
    </Tab.Navigator>
  );
}
