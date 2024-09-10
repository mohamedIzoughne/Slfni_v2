import React from 'react';
import { View, Text, Pressable,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Language({ setbar }) {
    const Uk = require("../../../assets/icons/Flag/download.png")
    return (
        <View className="flex-1 bg-white">
            <View className="">
                <Pressable onPress={() => setbar("")} className="mb-6 flex-row items-center">
                    <Ionicons name="arrow-back" size={20} color="#666" className="mr-2 p-1 bg-slate-100 rounded-md" />
                    <Text className="text-lg text-gray-500 font-semibold">Language</Text>
                </Pressable>
                <View className="m-4 mx-6">
                    <Pressable className="flex-row items-center">
                        <Image source={Uk} className="w-14 h-12 rounded-2xl mr-3" />
                        <Text className=" text-lg ">اللغة العربية</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}