import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { ImagePath } from '../../utils/ImagePath';
import { COLORS, FONT, SIZES } from '../../utils/theme';
import { TokenStorage } from '../../utils/apiUtils';

const slides = [
  {
    id: 1,
    image: ImagePath.Splash.main_one,
    title: 'Stay ',
    titleHighlight: 'Organized',
    description: 'Manage assignments, attendance,\nand schedules in one place',
  },
  {
    id: 2,
    image: ImagePath.Splash.main_two,
    title: 'Track Your ',
    titleHighlight: 'Progress',
    description: 'Monitor performance, attendance,\nand results effortlessly',
  },
  {
    id: 3,
    image: ImagePath.Splash.main_three,
    title: 'Simplify ',
    titleHighlight: 'Learning',
    description: 'Connect students and teachers in\none seamless platform',
  },
];

export const SplashScreen = ({ navigation }: any) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('dark-content');
  }, []);

  const goToNextSlide = async () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      await TokenStorage.setSplashView(true);
      const token = await TokenStorage.getToken();
      if (token) {
        navigation.replace('HomeScreen');
      } else {
        navigation.replace('LoginScreen');
      }
    }
  };

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <View className="flex-1 bg-[#FFFDF6]" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <Image 
        source={ImagePath.Splash.top_design} 
        className="absolute -top-8 -left-5 w-[80vw] h-[40vw]"
        resizeMode="contain"
      />
      <Image 
        source={ImagePath.Splash.bottom_design} 
        className="absolute -left-5 w-[120vw] h-[60vw]"
        style={{bottom: -63}}
        resizeMode="contain"
      />

      <View className="h-auto items-center justify-center mt-10 z-10">
        <View className="justify-center items-center w-full h-[55%] mb-6">
          <Image
            source={currentSlide.image}
            className="w-full h-[100%]"
            resizeMode="contain"
          />
        </View>

        <View className="items-center">
          <Text 
            className="text-[28px] font-bold text-gray-800 text-center mb-2" 
            style={{ fontFamily: FONT }}
          >
            {currentSlide.title}
            <Text className="text-[#FFB800]">{currentSlide.titleHighlight}</Text>
          </Text>
          <Text 
            className="text-[15px] text-gray-600 text-center leading-6" 
            style={{ fontFamily: FONT }}
          >
            {currentSlide.description}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center px-6 mt-10 h-[100px] z-20">
        <View className="flex-1 items-start">
          {currentSlideIndex > 0 && (
            <TouchableOpacity onPress={goToPrevSlide} style={{ backgroundColor: COLORS.secondaryButton }} className="rounded-lg flex-row items-center gap-2 px-6 py-3">
              <Feather name="arrow-left" size={20} color={COLORS.text} />
              <Text 
                className="font-semibold" 
                style={{ fontFamily: FONT, fontSize: SIZES.medium - 1, fontWeight: '700', color: COLORS.text }}
              >
                PREV
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="flex-row items-center justify-center flex-1 gap-2">
          {slides.map((_, index) => (
            <View 
              key={index} 
              className={`h-2 w-2 rounded-full mx-1 ${
                currentSlideIndex === index ? 'bg-[#FFB800]' : 'bg-gray-300'
              }`} 
            />
          ))}
        </View>

        <View className="flex-1 items-end">
          <TouchableOpacity 
            onPress={goToNextSlide} 
            className="rounded-lg flex-row items-center gap-2 px-6 py-3"
            style={{ backgroundColor: COLORS.primaryButton, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
          >
            <Text 
              className="font-semibold text-gray-800" 
              style={{ fontFamily: FONT, fontWeight: '700', fontSize: SIZES.medium - 1 }}
            >
              {currentSlideIndex === slides.length - 1 ? 'FINISH' : 'NEXT'}
            </Text>
            <Feather name={currentSlideIndex === slides.length - 1 ? 'check' : 'arrow-right'} size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
