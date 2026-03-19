import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Fa6 from 'react-native-vector-icons/FontAwesome6';
import { BASE_URL } from '../tools/apiUtils';

export const CreateAccount = () => {
  const navigation = useNavigation<any>();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const canCreate =
    formData.fullName &&
    formData.email &&
    formData.phone &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    formData.agree;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      ToastAndroid.show('Please enter your full name.', ToastAndroid.SHORT);
      return false;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      ToastAndroid.show('Please enter a valid email.', ToastAndroid.SHORT);
      return false;
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      ToastAndroid.show('Please enter a valid phone number.', ToastAndroid.SHORT);
      return false;
    }
    if (!formData.password.trim()) {
      ToastAndroid.show('Please enter a password.', ToastAndroid.SHORT);
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      ToastAndroid.show('Passwords do not match.', ToastAndroid.SHORT);
      return false;
    }
    return true;
  }

  const handleCreate = async () => {
    setIsLoading(true);
    
    if (canCreate) {
      const isValid = validateForm();
      if (!isValid) return;
    } else {
      ToastAndroid.show('Please fill all fields correctly and agree to the terms.', ToastAndroid.SHORT);
      return;
    }

    const payload = {
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      password: formData.password
    }
    console.log('Creating account with:', payload);
    const url = `${BASE_URL}api/owners/create`;

    try {
      const res: any = await fetch(url, {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        console.log('Response from server:', data);
        ToastAndroid.show('Account created successfully! Please log in.', ToastAndroid.SHORT);
        await AsyncStorage.setItem('ownerToken', data.data.accessToken);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          agree: false,
        })
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      ToastAndroid.show('Failed to create account. Please try again.', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
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
        <Text className="text-center text-3xl font-bold text-gray-900 mt-4">
          Create Account
        </Text>
        <Text style={{ fontSize: 14 }} className="text-center text-gray-500 mt-1">
          Sign up as an owner and manage students, teachers, and classes with ease.
        </Text>

        {/* Full Name */}
        <View className="mt-6">
          <Text className="font-semibold text-gray-700 mb-2">Full Name</Text>
          <View style={{ borderWidth: 1.5, borderColor: '#999' }} className="flex-row items-center bg-gray-100 rounded-lg px-3">
            <Fa6 name="user" size={16} color="#000" />
            <TextInput
              className="ml-3 flex-1 text-base text-gray-900"
              placeholder="Jane Doe"
              placeholderTextColor="#9ca3af"
              value={formData.fullName}
              onChangeText={(text) => handleInputChange('fullName', text)}
            />
          </View>
        </View>

        {/* Email */}
        <View className="mt-4">
          <Text className="font-semibold text-gray-700 mb-2">Email</Text>
          <View style={{ borderWidth: 1.5, borderColor: '#999' }} className="flex-row items-center bg-gray-100 rounded-lg px-3">
            <Fa6 name="envelope" size={16} color="#000" />
            <TextInput
              className="ml-3 flex-1 text-base text-gray-900"
              placeholder="jane@example.com"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />
          </View>
        </View>

        {/* Phone */}
        <View className="mt-4">
          <Text className="font-semibold text-gray-700 mb-2">Phone</Text>
          <View style={{ borderWidth: 1.5, borderColor: '#999' }} className="flex-row items-center bg-gray-100 rounded-lg px-3">
            <Fa6 name="phone" size={16} color="#000" />
            <TextInput
              className="ml-3 flex-1 text-base text-gray-900"
              placeholder="1234567890"
              placeholderTextColor="#9ca3af"
              keyboardType="number-pad"
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              maxLength={10}
            />
          </View>
        </View>

        {/* Password */}
        <View className="mt-4">
          <Text className="font-semibold text-gray-700 mb-2">Password</Text>
          <View style={{ borderWidth: 1.5, borderColor: '#999' }} className="flex-row items-center bg-gray-100 rounded-lg px-3">
            <Fa6 name="lock" size={16} color="#000" />
            <TextInput
              className="ml-3 flex-1 text-base text-gray-900"
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
            />
            <TouchableOpacity onPress={() => setShowPassword(v => !v)}>
              <Fa6
                name={showPassword ? 'eye' : 'eye-slash'}
                size={16}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View className="mt-4">
          <Text className="font-semibold text-gray-700 mb-2">Confirm Password</Text>
          <View style={{ borderWidth: 1.5, borderColor: '#999' }} className="flex-row items-center bg-gray-100 rounded-lg px-3">
            <Fa6 name="rotate-left" size={16} color="#000" />
            <TextInput
              className="ml-3 flex-1 text-base text-gray-900"
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showPassword}
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
            />
          </View>
        </View>

        {/* Terms checkbox */}
        <TouchableOpacity
          className="flex-row items-center mt-4"
          onPress={() => handleInputChange('agree', !formData.agree)}
          activeOpacity={0.8}
        >
          <View style={{ borderWidth: 1.5, borderColor: '#999' }} className="w-5 h-5 rounded-full border border-gray-300 items-center justify-center mr-3">
            {formData.agree ? <Fa6 name="check" size={12} color="#7c3aed" /> : null}
          </View>
          <Text className="text-sm text-gray-600">
            I agree to the{' '}
            <Text className="text-purple-600">Terms of Service</Text> and{' '}
            <Text className="text-purple-600">Privacy Policy</Text>.
          </Text>
        </TouchableOpacity>

        {/* Create Account Button */}
        <TouchableOpacity
          className={`mt-6 rounded-lg py-3 items-center ${
            canCreate ? 'bg-purple-600' : 'bg-purple-300'
          }`}
          activeOpacity={0.85}
          onPress={handleCreate}
          disabled={!canCreate && !isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-base font-semibold">
              Create Account →
            </Text>
          )}
        </TouchableOpacity>

        {/* Or sign up with */}
        <View className="flex-row items-center my-4">
          <View className="flex-1 h-px bg-gray-200 mr-3" />
          <Text className="text-sm text-gray-400">OR SIGN UP WITH</Text>
          <View className="flex-1 h-px bg-gray-200 ml-3" />
        </View>

        <View className="flex-row justify-between">
          <TouchableOpacity
            className="flex-1 mr-2 border border-gray-200 rounded-lg py-3 items-center flex-row justify-center"
            activeOpacity={0.85}
          >
            <Fa6 name="google" size={16} color="#1f2937" />
            <Text className="ml-2 text-sm text-gray-700">Google</Text>
          </TouchableOpacity>
        </View>

        {/* Already have account */}
        <View className="mt-6 items-center">
          <Text className="text-sm text-gray-600">
            Already have an account?{' '}
            <Text
              className="text-purple-600 font-medium"
              onPress={() => navigation.navigate('LoginScreen')}
            >
              Sign in here
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateAccount;
