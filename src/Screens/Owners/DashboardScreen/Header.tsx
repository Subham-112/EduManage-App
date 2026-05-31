import { Image, Text, TouchableOpacity, View } from "react-native";
import Fa6 from "react-native-vector-icons/FontAwesome6";
import { FONT } from "../../../utils/theme";

const DashboardHeader = () => {
  return (
    <View className="flex-row justify-between items-center mb-8">
      <View>
        <Text
          style={{ fontFamily: FONT }}
          className="text-[24px] font-bold text-[#8B6B3F]"
        >
          Good Morning, Rahul 👋
        </Text>
        <Text
          style={{ fontFamily: FONT }}
          className="text-sm text-gray-400 mt-1"
        >
          Here's your institute overview
        </Text>
      </View>
      <View className="flex-row items-center gap-4">
        <TouchableOpacity className="w-11 h-11 bg-white rounded-full items-center justify-center border border-gray-100">
          <Fa6 name="bell" size={20} color="#8B6B3F" />
          <View className="absolute top-0 right-0 w-4.5 h-4.5 bg-red-500 rounded-full items-center justify-center border-2 border-white">
            <Text className="text-[9px] text-white font-bold">3</Text>
          </View>
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
          className="w-11 h-11 rounded-full"
        />
      </View>
    </View>
  );
};
