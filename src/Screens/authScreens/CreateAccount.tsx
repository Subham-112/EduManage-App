import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Fa6 from 'react-native-vector-icons/FontAwesome6';
import { COLORS, SIZES, FONT } from '../../utils/theme';
import { Post } from '../../utils/apiUtils';
import { RoleSelector } from '../../components/RoleSelector';

export const CreateAccount = () => {
  const navigation = useNavigation<any>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<"owner" | "teacher" | "staff" | "student">("owner");

  const handleSignUp = async () => {
    if (!fullName.trim()) {
      ToastAndroid.show('Please enter your full name.', ToastAndroid.SHORT);
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      ToastAndroid.show('Please enter a valid email.', ToastAndroid.SHORT);
      return;
    }
    if (!phoneNumber.trim()) {
      ToastAndroid.show('Please enter your phone number.', ToastAndroid.SHORT);
      return;
    }
    if (password.length < 6) {
      ToastAndroid.show('Password must be at least 6 characters.', ToastAndroid.SHORT);
      return;
    }
    if (password !== confirmPassword) {
      ToastAndroid.show('Passwords do not match.', ToastAndroid.SHORT);
      return;
    }
    if (!agreeToTerms) {
      ToastAndroid.show('Please agree to the Terms and Conditions.', ToastAndroid.SHORT);
      return;
    }

    setIsLoading(true);
    try {
      const url = "api/students/create";
      const payload = {
        name: fullName,
        email: email,
        phone: phoneNumber,
        password: password,
        agreedToTerms: agreeToTerms,
      }
      const response: any = await Post(url, payload, 10000);
      if (response.success) {
        const message = response.message || response.data?.message || 'Account created successfully';
        ToastAndroid.show(message, ToastAndroid.SHORT);
        navigation.navigate('LoginScreen');
      } else {
        const message = response.message || response.data?.message || 'Sign up failed';
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }
    } catch (err) {
      ToastAndroid.show('Sign up failed.', ToastAndroid.SHORT);
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
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          <View className="flex-row justify-center items-center gap-2 mt-6">
            <Fa6 name="book-open-reader" size={32} color={COLORS.primary} />
            <Text
              style={{ letterSpacing: 1, fontFamily: FONT, fontSize: SIZES.xxl + 3 }}
              className="font-extrabold text-gray-900"
            >
              <Text style={{ color: COLORS.primary, fontFamily: FONT }}>
                Edu
              </Text>
              Manage
            </Text>
          </View>

          <View className="p-6 py-0 mt-2">
            <View className="items-center mb-4">
              <Text
                style={{ fontSize: SIZES.xxl, fontFamily: FONT }}
                className="font-bold text-gray-900 text-center"
              >
                Create Account
              </Text>
              <Text
                style={{ fontSize: SIZES.medium, fontFamily: FONT }}
                className="text-gray-400 text-center"
              >
                Sign up to get started with EduManage
              </Text>
            </View>

            <RoleSelector role={role} setRole={setRole} />

            {/* Full Name */}
            <View className="mt-2">
              <Text
                style={{ fontSize: SIZES.medium - 1, fontFamily: FONT }}
                className="font-bold text-gray-800 mb-2"
              >
                Full Name
              </Text>
              <View
                style={{ borderWidth: 1, borderColor: '#e5e7eb' }}
                className="flex-row items-center bg-white rounded-xl px-3 py-1"
              >
                <Fa6 name="user" size={18} color="#9ca3af" />
                <TextInput
                  style={{ fontFamily: FONT }}
                  className="ml-3 flex-1 text-base text-gray-900"
                  placeholder="Enter your full name"
                  placeholderTextColor="#9ca3af"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            </View>

            {/* Email Address */}
            <View className="mt-5">
              <Text
                style={{ fontSize: SIZES.medium - 1, fontFamily: FONT }}
                className="font-bold text-gray-800 mb-2"
              >
                Email Address
              </Text>
              <View
                style={{ borderWidth: 1, borderColor: '#e5e7eb' }}
                className="flex-row items-center bg-white rounded-xl px-3 py-1"
              >
                <Fa6 name="envelope" size={18} color="#9ca3af" />
                <TextInput
                  style={{ fontFamily: FONT }}
                  className="ml-3 flex-1 text-base text-gray-900"
                  placeholder="Enter your email"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Phone Number */}
            <View className="mt-5">
              <Text
                style={{ fontSize: SIZES.medium - 1, fontFamily: FONT }}
                className="font-bold text-gray-800 mb-2"
              >
                Phone Number
              </Text>
              <View
                style={{ borderWidth: 1, borderColor: '#e5e7eb' }}
                className="flex-row items-center bg-white rounded-xl px-3 py-1"
              >
                <Fa6 name="phone" size={18} color="#9ca3af" />
                <TextInput
                  style={{ fontFamily: FONT }}
                  className="ml-3 flex-1 text-base text-gray-900"
                  placeholder="Enter your phone number"
                  placeholderTextColor="#9ca3af"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>
            </View>

            {/* Password */}
            <View className="mt-5">
              <Text
                style={{ fontSize: SIZES.medium - 1, fontFamily: FONT }}
                className="font-bold text-gray-800 mb-2"
              >
                Password
              </Text>
              <View
                style={{ borderWidth: 1, borderColor: '#e5e7eb' }}
                className="flex-row items-center bg-white rounded-xl px-3 py-1"
              >
                <Fa6 name="lock" size={18} color="#9ca3af" />
                <TextInput
                  style={{ fontFamily: FONT }}
                  className="ml-3 flex-1 text-base text-gray-900"
                  placeholder="Enter your password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(v => !v)}>
                  <Fa6
                    name={showPassword ? 'eye' : 'eye-slash'}
                    size={18}
                    color="#9ca3af"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View className="mt-5">
              <Text
                style={{ fontSize: SIZES.medium - 1, fontFamily: FONT }}
                className="font-bold text-gray-800 mb-2"
              >
                Confirm Password
              </Text>
              <View
                style={{ borderWidth: 1, borderColor: '#e5e7eb' }}
                className="flex-row items-center bg-white rounded-xl px-3 py-1"
              >
                <Fa6 name="lock" size={18} color="#9ca3af" />
                <TextInput
                  style={{ fontFamily: FONT }}
                  className="ml-3 flex-1 text-base text-gray-900"
                  placeholder="Confirm your password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(v => !v)}>
                  <Fa6
                    name={showConfirmPassword ? 'eye' : 'eye-slash'}
                    size={18}
                    color="#9ca3af"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Agree to Terms */}
            <View className="mt-4 flex-row items-center">
              <TouchableOpacity
                onPress={() => setAgreeToTerms(!agreeToTerms)}
                className="flex-row items-center gap-2 mr-3"
              >
                <Fa6
                  name={agreeToTerms ? 'square-check' : 'square'}
                  size={22}
                  color={agreeToTerms ? COLORS.primary : '#FFB800'}
                />
                <Text style={{ fontFamily: FONT }} className="text-sm text-gray-500">
                  I agree to the{' '}
                  <Text style={{ fontFamily: FONT }} className="text-yellow-500">Terms of Service</Text>
                  {' '}and{' '}
                  <Text style={{ fontFamily: FONT }} className="text-yellow-500">Privacy Policy</Text>
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="mt-4 rounded-xl py-3 items-center"
              style={{ 
                backgroundColor: '#ffb400',
              }}
              activeOpacity={0.85}
              onPress={handleSignUp}
            >
              {isLoading ? (
                <ActivityIndicator color="#111827" />
              ) : (
                <Text style={{ fontFamily: FONT, fontSize: SIZES.medium - 1 }} className="text-black text-base font-semibold">Sign Up</Text>
              )}
            </TouchableOpacity>

            <View className="flex-row items-center my-3">
              <View className="flex-1 h-px bg-gray-200 mr-3" />
              <Text style={{ fontFamily: FONT }} className="text-sm text-gray-400">or</Text>
              <View className="flex-1 h-px bg-gray-200 ml-3" />
            </View>

            <TouchableOpacity
              className="border border-gray-200 rounded-xl py-4 items-center flex-row justify-center bg-white"
              style={{}}
              activeOpacity={0.85}
            >
              <Fa6 name="google" size={18} color="#1f2937" />
              <Text style={{ fontFamily: FONT }} className="ml-3 text-base text-gray-700">
                Continue with Google
              </Text>
            </TouchableOpacity>

            <View className="mt-4 items-center">
              <Text style={{ fontFamily: FONT }} className="text-sm text-gray-600">
                Already have an account?{' '}
                <Text
                  style={{ fontFamily: FONT }}
                  className="text-yellow-500 font-semibold"
                  onPress={() => navigation.navigate('LoginScreen')}
                >
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
