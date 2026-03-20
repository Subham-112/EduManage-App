import React, { lazy } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../components/HomeScreen';
import { LoginScreen } from '../components/LoginScreen';
import { SplashScreen } from '../components/SplashScreen';
import { CreateAccount } from '../components/CreateAccount';
import { CreateTenant } from '../components/CreateTenant';

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ animation: 'fade', headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      <Stack.Screen name="CreateTenant" component={CreateTenant} />
    </Stack.Navigator>
  );
};
