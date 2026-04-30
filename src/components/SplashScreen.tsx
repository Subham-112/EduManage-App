import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImagePath } from '../utils/ImagePath';

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

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      // Navigation logic when finished
      // navigation.replace('Home');
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

      <View className="flex-1 items-center justify-center px-5 mt-[15vh] z-10">
        <View className="flex-[0.6] justify-center items-center w-full">
          <Image
            source={currentSlide.image}
            className="w-[90%] h-[90%]"
            resizeMode="contain"
          />
        </View>

        <View className="flex-[0.4] items-center">
          <Text 
            className="text-[28px] font-bold text-gray-800 text-center mb-4" 
            style={{ fontFamily: 'Poppins' }}
          >
            {currentSlide.title}
            <Text className="text-[#FFB800]">{currentSlide.titleHighlight}</Text>
          </Text>
          <Text 
            className="text-[15px] text-gray-600 text-center leading-6" 
            style={{ fontFamily: 'Poppins' }}
          >
            {currentSlide.description}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center px-6 pb-10 h-[100px] z-20">
        <View className="flex-1 items-start">
          {currentSlideIndex > 0 && (
            <TouchableOpacity onPress={goToPrevSlide} className="py-3 px-2">
              <Text 
                className="font-semibold text-[16px] text-gray-800" 
                style={{ fontFamily: 'Poppins' }}
              >
                ← Prev
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
            className="bg-[#FFB800] py-3 px-5 rounded-full shadow-sm min-w-[100px] items-center"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
          >
            <Text 
              className="font-semibold text-[16px] text-gray-800" 
              style={{ fontFamily: 'Poppins' }}
            >
              {currentSlideIndex === slides.length - 1 ? 'Finish ✓' : 'Next →'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
