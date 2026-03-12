import { useNavigation } from '@react-navigation/native';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SplashScreen = () => {
  const font = 'Inter';
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{ flex: 1, backgroundColor: '#000' }}
    >
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'#000'}
      />

      <View
        style={{
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          backgroundColor: 'green',
        }}
      >
        <Text style={{ fontFamily: font, fontSize: 16, color: '#fff' }}>
          Splash Screen
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderColor: '#FFF',
            borderRadius: 12,
            backgroundColor: '#4e4e4e',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={{ fontFamily: font, fontSize: 16, color: '#fff' }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
