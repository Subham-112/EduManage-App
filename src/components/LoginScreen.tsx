import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
  UIManager,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Fa6 from 'react-native-vector-icons/FontAwesome6';
import { ImagePath } from '../utils/ImagePath';
import { COLORS, SIZES } from '../utils/theme';

export const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'student' | 'teacher'>('student');

  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  // Animated sliding indicator for role toggle
  const TOGGLE_WIDTH = Dimensions.get('window').width * 0.9;
  const OPTION_WIDTH = TOGGLE_WIDTH / 2;
  const translate = useRef(
    new Animated.Value(role === 'student' ? 0 : OPTION_WIDTH),
  ).current;

  useEffect(() => {
    Animated.timing(translate, {
      toValue: role === 'student' ? 0 : OPTION_WIDTH,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [role]);

  const handleLogin = async () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      ToastAndroid.show('Please enter a valid email.', ToastAndroid.SHORT);
      return;
    }
    if (!password.trim()) {
      ToastAndroid.show('Please enter your password.', ToastAndroid.SHORT);
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual login API
      await new Promise((resolve: any) => setTimeout(resolve, 800));
      ToastAndroid.show('Logged in (mock).', ToastAndroid.SHORT);
    } catch (err) {
      ToastAndroid.show('Login failed.', ToastAndroid.SHORT);
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
        <View className="items-center mt-2">
          <Image
            source={ImagePath.LoginHeader}
            style={{ width: '100%', height: 180, resizeMode: 'contain' }}
          />
        </View>
        <View className="w-full flex-row justify-center items-center gap-2 mt-2">
          <Fa6 name="book-open-reader" size={32} color={COLORS.primary} />
          <Text
            style={{ letterSpacing: 1.5 }}
            className="text-4xl font-extrabold text-gray-900"
          >
            <Text style={{ color: COLORS.primary, letterSpacing: 1.5 }}>
              Edu
            </Text>
            Manage
          </Text>
        </View>

        <View className="p-6 py-0 mt-4">
          <View className="items-center">
            <Text
              style={{ fontSize: SIZES.extraLarge }}
              className="font-bold text-gray-900"
            >
              Welcome Back
            </Text>
            <Text
              style={{ fontSize: SIZES.medium - 2 }}
              className="text-gray-500"
            >
              Login to your account to continue
            </Text>
          </View>

          {/* Role toggle: Student / Teacher with sliding indicator */}
          <View className="mt-4 items-center">
            <View
              style={{
                width: TOGGLE_WIDTH,
                height: 52,
                borderRadius: 22,
                backgroundColor: '#eaebee',
                padding: 4,
                position: 'relative',
              }}
            >
              <Animated.View
                style={{
                  position: 'absolute',
                  left: 4,
                  top: 4,
                  width: role === 'student' ? OPTION_WIDTH : OPTION_WIDTH - 8,
                  height: 44,
                  borderRadius: 18,
                  backgroundColor: COLORS.primary,
                  transform: [{ translateX: translate }],
                }}
              />

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    if (role !== 'student') setRole('student');
                  }}
                  style={{
                    width: OPTION_WIDTH,
                    height: 44,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: SIZES.medium,
                      color: role === 'student' ? '#111' : '#6b7280',
                      fontWeight: '600',
                    }}
                  >
                    Student
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    if (role !== 'teacher') setRole('teacher');
                  }}
                  style={{
                    width: OPTION_WIDTH,
                    height: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: SIZES.medium,
                      color: role === 'teacher' ? '#111' : '#6b7280',
                      fontWeight: '600',
                    }}
                  >
                    Teacher
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="mt-6">
            <Text
              style={{ fontSize: SIZES.medium }}
              className="font-semibold text-gray-700 mb-2"
            >
              Email Address
            </Text>
            <View
              style={{ borderWidth: 1, borderColor: '#e5e7eb' }}
              className="flex-row items-center bg-white rounded-xl px-3 py-1"
            >
              <Fa6 name="envelope" size={18} color="#9ca3af" />
              <TextInput
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

          <View className="mt-4">
            <Text
              style={{ fontSize: SIZES.medium }}
              className="font-semibold text-gray-700 mb-2"
            >
              Password
            </Text>
            <View
              style={{ borderWidth: 1, borderColor: '#e5e7eb' }}
              className="flex-row items-center bg-white rounded-xl px-3 py-1"
            >
              <Fa6 name="lock" size={18} color="#9ca3af" />
              <TextInput
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
            <View className="items-end mt-2">
              <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <Text className="text-sm text-yellow-500 font-medium">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="mt-6 rounded-xl py-3 items-center"
            style={{ backgroundColor: '#ffb400' }}
            activeOpacity={0.85}
            onPress={handleLogin}
          >
            {isLoading ? (
              <ActivityIndicator color="#111827" />
            ) : (
              <Text className="text-black text-base font-semibold">Login</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row items-center my-4">
            <View className="flex-1 h-px bg-gray-200 mr-3" />
            <Text className="text-sm text-gray-400">or</Text>
            <View className="flex-1 h-px bg-gray-200 ml-3" />
          </View>

          <TouchableOpacity
            className="border border-gray-200 rounded-xl py-3 items-center flex-row justify-center"
            activeOpacity={0.85}
          >
            <Fa6 name="google" size={18} color="#1f2937" />
            <Text className="ml-3 text-base text-gray-700">
              Continue with Google
            </Text>
          </TouchableOpacity>

          <View className="mt-6 items-center">
            <Text className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Text
                className="text-yellow-500 font-semibold"
                onPress={() => navigation.navigate('CreateAccount')}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
