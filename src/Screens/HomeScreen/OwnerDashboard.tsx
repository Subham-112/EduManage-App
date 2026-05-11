import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Fa6 from 'react-native-vector-icons/FontAwesome6';
import { COLORS, FONT } from '../../utils/theme';

const { width } = Dimensions.get('window');

const UrgentAttentionCard = ({ icon, title, subtitle, actionText, color }: any) => (
  <View 
    className="rounded-[30px] p-6 mr-4 relative overflow-hidden" 
    style={{ 
      backgroundColor: color, 
      width: width * 0.58,
      height: 190,
    }}
  >
    {/* Decorative Circle */}
    <View 
      className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10" 
      style={{ backgroundColor: '#000' }}
    />
    
    <View className="flex-row items-center gap-2 mb-4">
      <Fa6 name={icon} size={18} color="#A33B3B" />
      <Text style={{ fontFamily: FONT }} className="text-sm font-semibold text-[#A33B3B]">
        {title}
      </Text>
    </View>
    
    <Text style={{ fontFamily: FONT }} className="text-xl font-bold text-[#A33B3B] mb-5 leading-tight">
      {subtitle}
    </Text>
    
    <TouchableOpacity 
      className="bg-white self-start px-6 py-2.5 rounded-xl shadow-sm"
    >
      <Text style={{ fontFamily: FONT }} className="text-xs font-bold text-[#A33B3B]">
        {actionText}
      </Text>
    </TouchableOpacity>
  </View>
);

const QuickActionItem = ({ icon, label }: any) => (
  <TouchableOpacity 
    className="bg-white rounded-[32px] items-center justify-center py-7 mb-4"
    style={{ 
      width: '48%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.03,
      shadowRadius: 12,
      elevation: 2,
    }}
  >
    <View className="w-14 h-14 rounded-full bg-[#FDF8F0] items-center justify-center mb-4">
      <Fa6 name={icon} size={22} color="#A88B4B" />
    </View>
    <Text style={{ fontFamily: FONT }} className="text-[14px] font-bold text-gray-700">
      {label}
    </Text>
  </TouchableOpacity>
);

export const OwnerDashboard = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F1F4F9]">
      <StatusBar barStyle="dark-content" />
      
      {/* Header Section */}
      <View className="bg-white pt-8 pb-8 px-6 rounded-b-[45px] shadow-sm">
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text style={{ fontFamily: FONT }} className="text-[24px] font-bold text-[#8B6B3F]">
              Good Morning, Rahul 👋
            </Text>
            <Text style={{ fontFamily: FONT }} className="text-sm text-gray-400 mt-1">
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

        <TouchableOpacity className="flex-row items-center self-start bg-white border border-gray-100 px-5 py-2.5 rounded-full shadow-sm">
          <Text style={{ fontFamily: FONT }} className="text-[13px] font-bold text-gray-700 mr-3">
            Main Branch
          </Text>
          <Fa6 name="chevron-down" size={10} color="#8B6B3F" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Urgent Attention Section */}
        <View className="mt-9 px-6">
          <Text style={{ fontFamily: FONT }} className="text-lg font-bold text-gray-800 mb-5">
            Urgent Attention
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <UrgentAttentionCard 
              icon="wallet" 
              title="Fees" 
              subtitle="12 unpaid students" 
              actionText="View Details" 
              color="#FEE2E2" 
            />
            <UrgentAttentionCard 
              icon="user-slash" 
              title="Staff" 
              subtitle="1 teacher absent today" 
              actionText="Resolve" 
              color="#FEE2E2" 
            />
          </ScrollView>
        </View>

        {/* Quick Actions Section */}
        <View className="mt-9 px-6">
          <Text style={{ fontFamily: FONT }} className="text-lg font-bold text-gray-800 mb-5">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <QuickActionItem icon="user-plus" label="Add Student" />
            <QuickActionItem icon="wallet" label="Collect Fee" />
            <QuickActionItem icon="file-circle-plus" label="Create Batch" />
            <QuickActionItem icon="user-check" label="Attendance" />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View 
        className="absolute bottom-0 left-0 right-0 bg-white flex-row justify-around items-center pt-5 pb-8 rounded-t-[35px]"
        style={{ 
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -12 },
          shadowOpacity: 0.06,
          shadowRadius: 24,
          elevation: 25 
        }}
      >
        <TouchableOpacity className="items-center">
          <Fa6 name="table-cells-large" size={22} color="#A88B4B" />
          <Text style={{ fontFamily: FONT }} className="text-[11px] mt-1.5 text-[#A88B4B] font-bold">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Fa6 name="users" size={22} color="#9CA3AF" />
          <Text style={{ fontFamily: FONT }} className="text-[11px] mt-1.5 text-gray-400 font-bold">Students</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Fa6 name="chart-simple" size={22} color="#9CA3AF" />
          <Text style={{ fontFamily: FONT }} className="text-[11px] mt-1.5 text-gray-400 font-bold">Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Fa6 name="graduation-cap" size={22} color="#9CA3AF" />
          <Text style={{ fontFamily: FONT }} className="text-[11px] mt-1.5 text-gray-400 font-bold">Batches</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Fa6 name="user-large" size={22} color="#9CA3AF" />
          <Text style={{ fontFamily: FONT }} className="text-[11px] mt-1.5 text-gray-400 font-bold">Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
