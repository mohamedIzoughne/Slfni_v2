import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Notifications({ setbar }) {
    return (
        <View className="flex-1 bg-white">
            <View className=" ">
                <Pressable onPress={() => setbar("")} className="mb-6">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
                <Text className="text-3xl font-bold mb-2">Notifications</Text>
                <Text className="text-lg text-gray-500 mb-8">Choose your preferred language</Text>
            </View>
        </View>
    )
}