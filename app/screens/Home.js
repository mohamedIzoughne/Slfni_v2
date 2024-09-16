import React from "react"
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const Home = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-[#1F2937] p-5">
      <View className="flex-row justify-between items-center mb-5">
        <View className="w-10 h-10 rounded-full bg-[#3B82F6]" />
        <View className="flex-row">
          <TouchableOpacity className="w-[30px] h-[30px] rounded-full bg-[#4B5563] ml-2.5 justify-center items-center">
            <Ionicons name="moon" size={20} color="#fff" />
          </TouchableOpacity>
          <View className="w-[30px] h-[30px] rounded-full bg-[#4B5563] ml-2.5" />
        </View>
      </View>

      <View className="bg-[#2563EB] rounded-2xl p-5 mb-5">
        <Text className="text-[#E5E7EB] text-sm">Total Balance</Text>
        <Text className="text-white text-2xl font-bold my-1.5">$29,865.00</Text>
        <Text className="text-[#34D399] text-sm">+4.08% This Month</Text>
      </View>

      <View className="flex-row justify-between mb-5">
        {["Pay", "Transfer", "Bills"].map((action, index) => (
          <View key={index} className="items-center">
            <View
              className={`w-[50px] h-[50px] rounded-full justify-center items-center mb-1.5 ${
                index === 0
                  ? "bg-[#FF6B6B]"
                  : index === 1
                  ? "bg-[#4ECDC4]"
                  : "bg-[#45B649]"
              }`}
            >
              <Text className="text-white text-xl">
                {action === "Transfer" ? "⇄" : "$"}
              </Text>
            </View>

            <Text className="text-[#E5E7EB] text-xs">{action}</Text>
            <Text className="text-white text-sm font-bold">$204.00</Text>
          </View>
        ))}
      </View>

      <View className="mb-5">
        <Text className="text-white text-lg font-bold mb-2.5">
          Loan Dashboard
        </Text>
        <View className="flex-row justify-between">
          {["My Loans", "Create lending", "Create lending"].map(
            (option, index) => (
              <TouchableOpacity
                onPress={() => {
                  option === "My Loans"
                    ? navigation.navigate("UserActivity")
                    : null
                }}
                key={index}
                className="bg-[#1E3A8A] rounded-lg p-2.5 items-center w-[30%]"
              >
                <View className="w-[30px] h-[30px] rounded-md bg-[#2563EB] mb-1.5" />
                <Text className="text-[#E5E7EB] text-xs text-center">
                  {option}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
      <View className="flex-row justify-between mt-auto">
        {["home", "people", "chatbubble", "settings"].map((icon, index) => (
          <TouchableOpacity key={index} className="items-center">
            <Ionicons name={icon} size={24} color="#666" />
            <Text className="text-[#9CA3AF] text-xs mt-1.5">
              {["Account", "Friends", "Kotler", "Setting"][index]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default Home
