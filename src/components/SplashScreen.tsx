import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Fa6 from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from '@react-navigation/native';

export const SplashScreen = () => {
  const font = 'Poppins';
  const navigation: any = useNavigation();
  const progress = useRef(new Animated.Value(0)).current;
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const id = progress.addListener(({ value }) => {
      setPercent(Math.round(value));
    });

    // Use an ease-out easing so animation starts fast and slows toward the end
    Animated.timing(progress, {
      toValue: 100,
      duration: 3000,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start(() => {
      progress.removeAllListeners();
      navigation.navigate('LoginScreen');
    });

    return () => {
      progress.removeListener(id);
    };
  }, [navigation, progress]);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2563eb',
      }}
    >
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'#2563eb'}
      />
      <View
        style={{
          width: '100%',
          height: 'auto',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: "-20%",
        }}
      >
        {/* Logo */}
        <View
          style={{
            backgroundColor: '#3b82f6',
            borderRadius: 24,
            padding: 24,
            marginBottom: 32,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 8,
          }}
        >
          {/* Replace below with your logo image if available */}
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Fa6 name="graduation-cap" size={30} color="#2563eb" />
          </View>
        </View>

        {/* Title */}
        <Text
          style={{
            fontFamily: font,
            fontSize: 32,
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: 8,
          }}
        >
          EduManage
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            fontFamily: font,
            fontSize: 16,
            color: '#e0e7ef',
            marginBottom: 32,
            textAlign: 'center',
          }}
        >
          Smart Coaching Management for Students
        </Text>

        {/* Progress bar section */}
        <View style={{ width: '100%', alignItems: 'center', marginBottom: 32 }}>
          <Text
            style={{
              fontFamily: font,
              fontSize: 16,
              color: '#fff',
              marginBottom: 8,
            }}
          >
            Initializing student portal...
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <View
              style={{
                width: '75%',
                height: 8,
                backgroundColor: '#1e40af',
                borderRadius: 8,
                overflow: 'hidden',
                marginRight: 8,
              }}
            >
              <Animated.View
                style={{
                  width: widthInterpolated,
                  height: '100%',
                  backgroundColor: '#60a5fa',
                }}
              />
            </View>
            <Text style={{ fontFamily: font, fontSize: 16, color: '#fff' }}>
              {percent}%
            </Text>
          </View>
        </View>

        {/* Spacer */}
        <View style={{ flex: 1 }} />
      </View>
    </SafeAreaView>
  );
};
