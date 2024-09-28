import React, { useState, useEffect, useContext } from "react"
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native"
import useHttp from "../../hooks/useHttp"
import { Context } from "../../store"
import { formatDateToLongMonthAndDay } from "../../utils"

const Relationship = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-background-light px-4 py-4"
    >
      <View
        style={{ borderRadius: 16 }}
        className="bg-primary mr-4 p-2 rounded-[16px]"
      >
        <Image
          source={require("../../../assets/person.png")}
          className="w-12 h-12 rounded-full "
        />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-[#003566] text-sm ">{item.name}</Text>
        <Text className="text-gray-600 ">@{item.username}</Text>
      </View>
      <View>
        <Text className="text-primary text-right text-xs">
          {item.updatedAt
            ? formatDateToLongMonthAndDay(item.updatedAt)
            : "No loan"}
        </Text>
        <View className="bg-primary py-1 px-1 justify-center items-center rounded-md mt-2">
          <Text
            className={`text-white font-bold text-xs ${
              item.settled ? "line-through" : ""
            }`}
          >
            {parseFloat(item.lendingBalance)
              .toFixed(2)
              .replace(/\.?0+$/, "")}
            Dh
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Relationships = ({ className }) => {
  const [relationships, setRelationships] = useState([])
  const { sendData } = useHttp()
  const { userConfiguration } = useContext(Context)
  useEffect(() => {
    sendData(
      "/friendship/v2",
      {
        headers: {
          Authorization: `Bearer ${userConfiguration.accessToken}`,
        },
      },
      (data) => {
        setRelationships(data.relationships)
      },
      (error) => {
        Alert.alert("Error", error, [{ text: "OK" }])
      }
    )
  }, [])

  return (
    <FlatList
      data={relationships}
      className={"px-3 py-3 mb-3 " + className}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Relationship
          onPress={() => {
            navigation.navigate("UserActivity", {
              imageUrl: item.imageUrl,
              friendId: item.id,
              name: item.name,
              username: item.username,
              lendingBalance: item.lendingBalance,
              settled: item.settled,
            })
          }}
          key={item.id}
          item={item}
        />
      )}
    />
  )
}

export default Relationships
