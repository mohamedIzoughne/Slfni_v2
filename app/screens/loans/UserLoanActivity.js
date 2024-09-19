import React from "react"
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native"
import IconEntypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"

const TransactionItem = ({ transaction }) => {
  return (
    <View className="bg-white mx-4 my-2 p-4 rounded-lg ">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="font-bold text-[#003566]">{transaction.title}</Text>
        <Text className="text-[#979797] font-semibold text-xs">
          {transaction.date}
        </Text>
      </View>
      <Text className="text-[#979797] mb-2 text-xs">
        {transaction.description}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View className="flex-row items-center">
          <Text className="text-[#979797] text-sm font-medium mr-2">
            Status
          </Text>
          <Text
            className={`font-semibold text-sm ${
              transaction.transactionStatus === "borrowing"
                ? "text-red-500"
                : "text-[#1C9D21]"
            }`}
          >
            {transaction.transactionStatus}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-[#979797] text-sm font-medium mr-2">
            Amount
          </Text>
          <Text className="font-semibold text-sm">{transaction.amount}Dh</Text>
        </View>
      </View>
    </View>
  )
}

const UserProfileTransactions = () => {
  const transactions = [
    {
      id: 1,
      title: "Milk and chocklate",
      date: "30/10/2019",
      description:
        "John went to the local grocery store to buy some essentials. As he strolled through the aisles, he picked up a gallon of milk, placed it in his basket, and headed to the checkout. After paying, he left the store with the milk in hand, satisfied that he had everything he needed for tomorrow's breakfast.",
      transactionStatus: "borrowing",
      amount: 480,
    },
    {
      id: 2,
      title: "Milk and chocklate",
      date: "30/10/2019",
      description:
        "John went to the local grocery store to buy some essentials. As he strolled through the aisles, he picked up a gallon of milk, placed it in his basket, and headed to the checkout. After paying, he left the store with the milk in hand, satisfied that he had everything he needed for tomorrow's breakfast.",
      transactionStatus: "lending",
      amount: 480,
    },
  ]

  return (
    <View className="flex-1 bg-background-light">
      {/* Header */}
      <View className="bg-primary px-4 py-5 flex-row items-center">
        <TouchableOpacity
          className="bg-background-light w-[26px] h-[26px] justify-center items-center rounded-full"
          onPress={() => navigation.navigate("Home")}
        >
          <IconEntypo name="chevron-thin-left" size={15} color="#000" />
        </TouchableOpacity>
        <View className="flex-row">
          <Image
            source={require("../../../assets/koro.png")}
            className="w-12 h-12 rounded-full mr-2 ml-3"
          />
          <View>
            <Text className="text-white">Mouad Ahtchaou</Text>
            <Text className="text-[#BBD0E3]">@Mouad</Text>
          </View>
        </View>
        <View className="ml-auto">
          <SimpleLineIcons name="options-vertical" size={15} color="#FFF" />
        </View>
      </View>
      {/* <View className="bg-white p-4 mx-4 -mt-4 rounded-lg shadow-md"> */}
      <View className="flex-row justify-between mx-6 mt-4">
        <Text className="font-semibold text-lg text-[#003566]">Total:</Text>
        <Text className="text-red-500 font-semibold text-lg ">-200Dh</Text>
      </View>
      {/* </View> */}
      {/* Transactions */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: transaction }) => (
          <TransactionItem transaction={transaction} />
        )}
        contentContainerStyle={{ paddingTop: 10 }}
      />
      {/* Add Button */}
      <TouchableOpacity
        style={{ borderRadius: 9, backgroundColor: "#0F3B64" }}
        className="absolute bottom-6 right-6 bg-[#0F3B64]  p-3"
      >
        <Ionicons name="add" size={26} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default UserProfileTransactions
