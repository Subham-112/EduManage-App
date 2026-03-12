import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Step = 'identifier' | 'otp';

export const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [step, setStep] = useState<Step>('identifier');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');

  const isEmail = identifier.includes('@');
  const identifierLabel = isEmail ? 'email' : 'mobile number';

  const handleContinue = () => {
    if (identifier.trim().length === 0) return;
    setStep('otp');
  };

  const handleVerify = () => {
    if (otp.trim().length < 4) return;
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className="flex-1 bg-blue-50"
    >
      <StatusBar translucent barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="bg-white p-5 py-4">
          <Text className="text-3xl font-bold text-gray-900 mb-1">
            Welcome Back
          </Text>
          <Text className="text-base text-gray-500">
            {step === 'identifier'
              ? 'Enter your email or mobile number to continue.'
              : `Enter the OTP sent to your ${identifierLabel}.`}
          </Text>
        </View>

        {step === 'identifier' ? (
          <View className="flex-1 px-4 mt-4">
            {/* Email / Mobile Input */}
            <Text className="text-lg font-medium text-gray-700 mb-2">
              Email or Mobile Number
            </Text>
            <TextInput
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900 bg-white"
              placeholder="e.g. john@example.com or 9876543210"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={identifier}
              onChangeText={setIdentifier}
            />

            {/* Continue Button */}
            <TouchableOpacity
              className={`mt-6 rounded-lg py-4 items-center ${
                identifier.trim().length > 0 ? 'bg-blue-600' : 'bg-gray-400'
              }`}
              activeOpacity={0.8}
              onPress={handleContinue}
              // disabled={identifier.trim().length === 0}/
              disabled={!identifier}
            >
              <Text
                className={`text-white text-base font-semibold ${
                  !identifier ? 'opacity-70' : ''
                }`}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-1 px-4 mt-4">
            {/* Identifier summary */}
            <View className="flex-row items-center mb-4">
              <Text className="text-sm text-gray-500">Sending OTP to </Text>
              <Text className="text-sm font-semibold text-gray-800">
                {identifier}
              </Text>
              <TouchableOpacity
                className="ml-2"
                onPress={() => {
                  setStep('identifier');
                  setOtp('');
                }}
              >
                <Text className="text-sm text-blue-600 font-medium">Edit</Text>
              </TouchableOpacity>
            </View>

            {/* OTP Input */}
            <Text className="text-lg font-medium text-gray-700 mb-2">
              One-Time Password
            </Text>
            <TextInput
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900 bg-white tracking-widest"
              placeholder="Enter OTP"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
            />

            {/* Verify Button */}
            <TouchableOpacity
              className={`mt-6 rounded-lg py-4 items-center ${
                otp.length === 6 ? 'bg-blue-600' : 'bg-gray-400'
              }`}
              activeOpacity={0.8}
              onPress={handleVerify}
            >
              <Text className="text-white text-base font-semibold">
                Verify & Continue
              </Text>
            </TouchableOpacity>

            {/* Resend */}
            <TouchableOpacity
              onPress={() => {
                setStep('identifier');
                setOtp('');
                setIdentifier('');
              }}
              className="mt-4 items-center"
            >
              <Text className="text-sm text-gray-500">
                Didn't receive it?{' '}
                <Text className="text-blue-600 font-medium">Resend OTP</Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
