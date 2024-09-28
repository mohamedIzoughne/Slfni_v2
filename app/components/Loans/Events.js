import React from "react"
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native"

const Event = ({ item }) => {
  return (
    <TouchableOpacity className="flex-row  p-2 pl-5 rounded-2xl bg-white">
      <View className="  mr-5">
        <Image
          source={require("../../../assets/event_image.jpg")}
          className="w-[79px] h-[92px] rounded-lg"
        />
      </View>
      <View className="flex-1">
        <View className="flex-row justify-between">
          <Text className="text-[#003566]">Wed, Apr 24</Text>
          <Text className="text-[#FE6381] font-medium">unsettled</Text>
        </View>
        <View>
          <Text className="text-xl  font-medium">Lkra</Text>
          <Text
            className="text-sm text-gray-500"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            John went to the local grocery store to buy some essentials. As he
            strolled through the aisles....
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Events = ({ className }) => {
  return (
    <FlatList
      data={[{ id: "Something" }]}
      className={"px-3 py-3 mb-3 " + className}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Event item={item} />}
    />
  )
}

export default Events
