import { BASE_URL } from '../tools/apiUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Fa6 from 'react-native-vector-icons/FontAwesome6';

export const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    if (!formData.email.trim()) {
      ToastAndroid.show('Please enter your email or phone number', ToastAndroid.SHORT);
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      ToastAndroid.show('Please enter a valid email address', ToastAndroid.SHORT);
      return false;
    }
    if (!formData.password.trim()) {
      ToastAndroid.show('Please enter your password', ToastAndroid.SHORT);
      return false;
    } else if (formData.password.length < 6) {
      ToastAndroid.show('Password must be at least 6 characters', ToastAndroid.SHORT);
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setLoading(true);
    const isValid = validateFields();
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const payload = {
        email: formData.email,
        password: formData.password
      }
      console.log('Logging in with:', payload);
      const url = `${BASE_URL}api/owners/login`;

      const res: any = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('Login response:', data);

      if (data.success) {
        ToastAndroid.show('Login successful', ToastAndroid.SHORT);
        await AsyncStorage.setItem('ownerToken', data.data.accessToken);
        setFormData({ email: '', password: '' });
        navigation.navigate('CreateTenant');
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('An error occurred during login', ToastAndroid.SHORT);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          paddingHorizontal: 20,
        }}
      >
        <View className="w-20 h-20 bg-blue-100 rounded-xl items-center justify-center self-center my-4">
          <Fa6 name="graduation-cap" size={28} color="#2563eb" />
        </View>

        <Text className="text-2xl font-bold text-gray-900 text-center">
          Welcome back
        </Text>
        <Text className="text-sm text-gray-500 text-center mt-2">
          Your education journey continues here
        </Text>

        {/* Email input */}
        <View className="mt-6">
          <Text className="font-semibold text-gray-700 mb-2">
            Email
          </Text>
          <View style={{ borderWidth: 1.5, borderColor: '#999' }} className="flex-row items-center bg-gray-100 rounded-lg px-3">
            <Fa6 name="envelope" size={18} color="#000" />
            <TextInput
              className="ml-3 flex-1 text-base text-gray-900"
              placeholder="name@email.com"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
          </View>
        </View>

        {/* Password input */}
        <View className="mt-4">
          <Text className="font-semibold text-gray-700 mb-2">
            Password
          </Text>
          <View style={{ borderWidth: 1.5, borderColor: '#999' }} className="flex-row items-center bg-gray-100 rounded-lg px-3">
            <Fa6 name="lock" size={18} color="#000" />
            <TextInput
              className="ml-3 flex-1 text-base text-gray-900"
              placeholder="Enter your password"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
            />
            <TouchableOpacity onPress={() => setShowPassword(v => !v)}>
              <Fa6
                name={showPassword ? 'eye' : 'eye-slash'}
                size={18}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Login button */}
        <TouchableOpacity
          className={`mt-6 rounded-lg py-4 items-center ${
            formData.email && formData.password ? 'bg-blue-600' : 'bg-gray-300'
          }`}
          activeOpacity={0.85}
          onPress={handleLogin}
          disabled={!formData.email || !formData.password}
        >
          <Text className="text-white text-base font-semibold">
            {loading 
              ? <ActivityIndicator size="small" color="#fff" />
              : 'Login'
            }
          </Text>
        </TouchableOpacity>

        {/* Or continue */}
        <View className="flex-row items-center my-4">
          <View className="flex-1 h-px bg-gray-200 mr-3" />
          <Text className="text-sm text-gray-400">Or continue with</Text>
          <View className="flex-1 h-px bg-gray-200 ml-3" />
        </View>

        {/* Google button */}
        <TouchableOpacity
          className="mt-2 border border-gray-200 rounded-lg py-3 items-center flex-row justify-center"
          activeOpacity={0.85}
        >
          <Fa6 name="google" size={18} color="#1f2937" />
          <Text className="ml-2 text-sm text-gray-700">
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="mt-6 items-center">
          <Text className="text-sm text-gray-500">
            Don't have an account?{' '}
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateAccount')}
            >
              <Text className="text-blue-600 font-medium">Create Account</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
