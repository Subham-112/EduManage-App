import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Fa6 from 'react-native-vector-icons/FontAwesome6';
import { COLORS, FONT, SIZES } from '../utils/theme';

const { width } = Dimensions.get('window');

const SectionHeader = ({ icon, title, actionText, onPress }: any) => (
  <View className="flex-row justify-between items-center px-5 mb-4">
    <View className="flex-row items-center gap-2">
      <Fa6 name={icon} size={18} color={COLORS.primary} />
      <Text style={{ fontFamily: FONT }} className="text-lg font-bold text-gray-800">
        {title}
      </Text>
    </View>
    {actionText && (
      <TouchableOpacity onPress={onPress} className="flex-row items-center">
        <Text style={{ fontFamily: FONT }} className="text-xs text-yellow-500 font-semibold mr-1">
          {actionText}
        </Text>
        <Fa6 name="chevron-right" size={10} color={COLORS.primary} />
      </TouchableOpacity>
    )}
  </View>
);

const TaskCard = ({ title, dueDate, dueText, icon, color }: any) => (
  <TouchableOpacity 
    className="flex-row items-center bg-white mx-5 mb-3 p-4 rounded-2xl"
    style={{ elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 }}
  >
    <View className="w-12 h-12 rounded-xl items-center justify-center mr-4" style={{ backgroundColor: color + '15' }}>
      <Fa6 name={icon} size={20} color={color} />
    </View>
    <View className="flex-1">
      <Text style={{ fontFamily: FONT }} className="text-base font-bold text-gray-800">
        {title}
      </Text>
      <Text style={{ fontFamily: FONT }} className="text-xs text-gray-400 mt-1">
        {dueDate}
      </Text>
    </View>
    <View className="items-end">
      <View className="px-3 py-1 rounded-full mb-1" style={{ backgroundColor: '#FFF7E6' }}>
        <Text style={{ fontFamily: FONT }} className="text-[10px] text-yellow-600 font-bold">
          {dueText}
        </Text>
      </View>
      <Fa6 name="chevron-right" size={12} color="#D1D5DB" />
    </View>
  </TouchableOpacity>
);

const QuickAction = ({ icon, label, color }: any) => (
  <TouchableOpacity className="items-center justify-center w-[22%] mb-6">
    <View className="w-14 h-14 rounded-2xl items-center justify-center mb-2 bg-white" style={{ elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4 }}>
      <Fa6 name={icon} size={20} color={color} />
    </View>
    <Text style={{ fontFamily: FONT }} className="text-[11px] text-gray-600 font-semibold text-center">
      {label}
    </Text>
  </TouchableOpacity>
);

const StatCard = ({ label, value, subtext, color, progress }: any) => (
  <View 
    className="bg-white rounded-2xl p-4 items-center justify-center mr-3" 
    style={{ width: width * 0.28, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 }}
  >
    <View className="w-12 h-12 rounded-full border-4 items-center justify-center mb-2" style={{ borderColor: color + '20', borderTopColor: color }}>
      <Text style={{ fontFamily: FONT }} className="text-xs font-bold text-gray-800">
        {value}
      </Text>
    </View>
    <Text style={{ fontFamily: FONT }} className="text-[11px] font-bold text-gray-800 text-center">
      {label}
    </Text>
    <Text style={{ fontFamily: FONT }} className="text-[9px] text-gray-400 mt-1">
      {subtext}
    </Text>
  </View>
);

const NoticeItem = ({ title, desc, time, icon, color }: any) => (
  <TouchableOpacity className="flex-row items-center mx-5 mb-4">
    <View className="w-10 h-10 rounded-full items-center justify-center mr-4" style={{ backgroundColor: color + '15' }}>
      <Fa6 name={icon} size={16} color={color} />
    </View>
    <View className="flex-1 border-b border-gray-100 pb-4">
      <View className="flex-row justify-between items-start">
        <Text style={{ fontFamily: FONT }} className="text-[13px] font-bold text-gray-800 flex-1">
          {title}
        </Text>
        <Text style={{ fontFamily: FONT }} className="text-[10px] text-gray-400">
          {time}
        </Text>
      </View>
      <Text style={{ fontFamily: FONT }} className="text-[11px] text-gray-500 mt-1" numberOfLines={1}>
        {desc}
      </Text>
    </View>
    <Fa6 name="chevron-right" size={12} color="#D1D5DB" style={{ marginLeft: 10, paddingBottom: 15 }} />
  </TouchableOpacity>
);

export const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 pt-4 pb-2">
        <View>
          <Text style={{ fontFamily: FONT }} className="text-2xl font-bold text-gray-900">
            Hi, Subham 👋
          </Text>
          <Text style={{ fontFamily: FONT }} className="text-sm text-gray-500">
            Ready to learn something new today?
          </Text>
        </View>
        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm" style={{ elevation: 2 }}>
            <Fa6 name="bell" size={18} color="#4B5563" />
            <View className="absolute top-2 right-2 w-4 h-4 bg-yellow-500 rounded-full items-center justify-center border-2 border-white">
              <Text className="text-[8px] text-white font-bold">3</Text>
            </View>
          </TouchableOpacity>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Tasks Section */}
        <View className="mt-6">
          <SectionHeader icon="briefcase" title="Tasks" actionText="View all" />
          <TaskCard 
            title="Maths Assignment" 
            dueDate="Due tomorrow, 11:59 PM" 
            dueText="Due Tomorrow" 
            icon="file-lines" 
            color="#A88B4B" 
          />
          <TaskCard 
            title="Science Lab Report" 
            dueDate="Due in 2 days" 
            dueText="Due in 2 Days" 
            icon="file-code" 
            color="#F87171" 
          />
          <TaskCard 
            title="History Essay" 
            dueDate="Due in 5 days" 
            dueText="Due in 5 Days" 
            icon="book" 
            color="#818CF8" 
          />
        </View>

        {/* Quick Actions */}
        <View className="mt-6">
          <SectionHeader icon="bolt" title="Quick Actions" />
          <View className="flex-row flex-wrap justify-between px-5">
            <QuickAction icon="book-open" label="Assignments" color="#FFB800" />
            <QuickAction icon="calendar-days" label="My Timetable" color="#FF5C5C" />
            <QuickAction icon="user-check" label="Attendance" color="#FFB800" />
            <QuickAction icon="file-pdf" label="Study Material" color="#4FACFE" />
            <QuickAction icon="award" label="Grades" color="#FFB800" />
            <QuickAction icon="wallet" label="Fees" color="#FFB800" />
            <QuickAction icon="message" label="Messages" color="#FFB800" />
            <QuickAction icon="calendar-check" label="Events" color="#FFB800" />
          </View>
        </View>

        {/* Stats */}
        <View className="mt-2">
          <SectionHeader icon="chart-simple" title="Stats" actionText="View Details" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 20, paddingRight: 5 }}>
            <StatCard label="Attendance" value="92%" subtext="This Month" color="#10B981" progress={0.92} />
            <StatCard label="Average Grade" value="85%" subtext="This Semester" color="#3B82F6" progress={0.85} />
            <StatCard label="Completed Tasks" value="12" subtext="This Month" color="#8B5CF6" progress={0.7} />
          </ScrollView>
        </View>

        {/* Notices */}
        <View className="mt-8">
          <SectionHeader icon="bullhorn" title="Notices" actionText="View all" />
          <View className="bg-white mx-5 rounded-2xl p-4 shadow-sm" style={{ elevation: 2 }}>
            <NoticeItem 
              title="Annual Sports Day" 
              desc="Sports Day will be held on 25th May 2025." 
              time="2h ago" 
              icon="trophy" 
              color="#FBBF24" 
            />
            <NoticeItem 
              title="Library Book Return" 
              desc="Please return all borrowed books by 30th May." 
              time="1d ago" 
              icon="book" 
              color="#60A5FA" 
            />
            <NoticeItem 
              title="Exam Schedule Released" 
              desc="Final exam schedule is now available." 
              time="2d ago" 
              icon="calendar" 
              color="#10B981" 
            />
          </View>
        </View>

        {/* Today's Schedule */}
        <View className="mt-8">
          <SectionHeader icon="calendar" title="Today's Schedule" actionText="View full timetable" />
          <TouchableOpacity 
            className="flex-row bg-white mx-5 rounded-2xl overflow-hidden"
            style={{ elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}
          >
            <View className="w-24 bg-yellow-50 items-center justify-center py-4">
              <Text style={{ fontFamily: FONT }} className="text-xs font-bold text-gray-800">10:00 AM</Text>
              <View className="w-0.5 h-4 bg-gray-300 my-1" />
              <Text style={{ fontFamily: FONT }} className="text-xs font-bold text-gray-800">11:00 AM</Text>
            </View>
            <View className="flex-1 p-4 justify-center">
              <Text style={{ fontFamily: FONT }} className="text-base font-bold text-gray-800">Data Structures</Text>
              <Text style={{ fontFamily: FONT }} className="text-xs text-gray-500 mt-1">Room 204 • Prof. Sharma</Text>
            </View>
            <View className="justify-center pr-4">
              <View className="bg-yellow-100 px-3 py-1 rounded-full">
                <Text style={{ fontFamily: FONT }} className="text-[10px] text-yellow-700 font-bold">In 30 min</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Bottom Tab Bar */}
      <View 
        className="absolute bottom-0 left-0 right-0 bg-white flex-row justify-around items-center py-3 border-t border-gray-100"
        style={{ elevation: 20, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 10 }}
      >
        <TouchableOpacity className="items-center">
          <Fa6 name="house" size={20} color={COLORS.primary} />
          <Text style={{ fontFamily: FONT }} className="text-[10px] mt-1 text-yellow-500 font-bold">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Fa6 name="book" size={20} color="#9CA3AF" />
          <Text style={{ fontFamily: FONT }} className="text-[10px] mt-1 text-gray-400">My Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Fa6 name="calendar-days" size={20} color="#9CA3AF" />
          <Text style={{ fontFamily: FONT }} className="text-[10px] mt-1 text-gray-400">Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <View>
            <Fa6 name="comments" size={20} color="#9CA3AF" />
            <View className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-500 rounded-full items-center justify-center border-2 border-white">
              <Text className="text-[8px] text-white font-bold">2</Text>
            </View>
          </View>
          <Text style={{ fontFamily: FONT }} className="text-[10px] mt-1 text-gray-400">Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Fa6 name="user" size={20} color="#9CA3AF" />
          <Text style={{ fontFamily: FONT }} className="text-[10px] mt-1 text-gray-400">Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
