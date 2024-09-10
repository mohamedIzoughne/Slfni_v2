import React from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/FontAwesome5"
import Icon6 from "react-native-vector-icons/FontAwesome6"
import { useState } from 'react';
import Language from './settings/Language';
import Notifications from './settings/Notifications';
import Theme from './settings/Theme';
import Qrcode from './settings/Qrcode';

export default function Setting({ navigation }) {
    const [bar, setbar] = useState("");

    const profileImage = require('../../assets/koro.png'); // Replace with actual path

    const SettingItem = ({ icon, icontype, title, value }) => (
        <Pressable onPress={() => setbar(title)} className="flex-row items-center justify-between py-2 px-4 rounded-2xl my-2 focus:bg-slate-400">
            <View className="flex-row items-center">
                <View className="mr-3 bg-gray-200 w-14 h-12 rounded-2xl items-center justify-center">
                    {icontype === "Icon6" ? <Icon6 name={icon} size={24} color="#666" /> : <Ionicons name={icon} size={24} color="#666" />}
                </View>
                <Text className="text-base text-[#666] font-bold">{title}</Text>
            </View>
            <View className="flex-row items-center">
                <Text className="text-sm text-gray-500 mr-2">{value}</Text>
                <Ionicons name="chevron-forward" size={20} color="#666" />
            </View>
        </Pressable>
    );

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="mt-10 mx-5">
                <View className="items-center mb-6 mt-14">
                    <Image source={profileImage} className="w-20 h-20 rounded-full" />
                    <View className="mt-3 items-center">
                        <View className="flex-row items-center">
                            <Text className="text-xl mr-2">Mouad Ahtchaou</Text>
                            <Icon name="edit" size={15} color="#37C8C3" />
                        </View>
                        <View className="flex-row items-center mt-1">
                            <Text className="text-gray-500 mr-2">@Admin</Text>
                            <Icon name="edit" size={15} color="#37C8C3" />
                        </View>
                    </View>
                </View>
                {bar === "Language" ? (
                    <Language setbar={setbar} />
                ) : bar === "Notifications" ? (
                    <Notifications setbar={setbar} />
                ) : bar === "Theme" ? (
                    <Theme setbar={setbar} />
                ) : bar === "Qr code" ? (
                    <Qrcode setbar={setbar} />
                ) : (
                    <View>

                        <Text className="text-lg text-gray-500 mb-3">Preferences</Text>

                        <SettingItem icon="language" title="Language" value="English" />
                        <SettingItem icon="notifications" title="Notifications" value="Enabled" />
                        <SettingItem icon="brush" icontype="Icon6" title="Theme" value="Light" />
                        <SettingItem icon="qr-code" title="Qr code" value="" />

                    </View>
                )}

            </View>
        </ScrollView>
    );
}

//ss