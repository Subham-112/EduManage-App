import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../Screens/HomeScreen/HomeScreen';
import { LoginScreen } from '../Screens/authScreens/LoginScreen';
import { SplashScreen } from '../Screens/introScreen/SplashScreen';
import { CreateAccount } from '../Screens/authScreens/CreateAccount';
import { CreateTenant } from '../Screens/authScreens/CreateTenant';
import { TokenStorage } from '../utils/apiUtils';
import { OwnerDashboard } from '../Screens/HomeScreen/OwnerDashboard';

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const splashView = await TokenStorage.getSplashView();
        const token = await TokenStorage.getToken();
        
        if (splashView) {
          setInitialRoute(token ? 'HomeScreen' : 'LoginScreen');
        } else {
          setInitialRoute('SplashScreen');
        }
      } catch (error) {
        console.error('Error checking navigation status:', error);
        setInitialRoute('SplashScreen');
      }
    };
    checkStatus();
  }, []);

  if (!initialRoute) {
    return null; // Return nothing while checking status to avoid flicker
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ animation: 'fade', headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="OwnerDashboard" component={OwnerDashboard} />

      <Stack.Screen name="CreateTenant" component={CreateTenant} />
    </Stack.Navigator>
  );
};
