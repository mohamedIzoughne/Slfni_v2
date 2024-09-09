import React from 'react';
import { Text, View, TextInput, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons

export default function PasswordRetrieve({navigation}) {
  return (
    <View className="flex-1 bg-white px-5 pt-14">
      <Pressable onPress={() => navigation.goBack()} className="mb-6">
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
      
      <Text className="text-3xl font-bold mb-2">Forget Password</Text>
      <Text className="text-lg text-gray-500 mb-8">Always keep your account secure and don't forget to update it</Text>
      
      <View className="mb-6">
        <Text className="text-lg mb-2">Your Email Account</Text>
        <View className="flex-row items-center rounded-lg relative">
          <Ionicons name="mail-outline" size={20} color="#888" className="mr-2 absolute left-2" />
          <TextInput
            className="text-lg flex-1  border-2 focus:border-[#37C8C3] px-1 py-2 pl-10 rounded-md"
            placeholder="ReyhanAji@gmail.com"
            placeholderTextColor="#888"
            keyboardType="email-address"
          />
        </View>
      </View>
      
      <Pressable 
  className="bg-[#5D5FEF] rounded-lg py-4 items-center"
  onPress={() => navigation.navigate('EmailVerification')}
>
  <Text className="text-white font-bold text-base">Submit</Text>
</Pressable>
    </View>
  );
}