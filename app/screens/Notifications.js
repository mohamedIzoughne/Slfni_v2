// import React from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native"
import { styled } from "nativewind"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import IconEntypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"

const notifications = [
  {
    id: "1",
    type: "event_initiated",
    message: "Your event has been initiated successfully.",
    action: "mark_as_read",
  },
  {
    id: "2",
    type: "borrowing_initiated",
    message: "Your borrowing has been initiated successfully.",
    action: "mark_as_read",
  },
  {
    id: "3",
    type: "event_canceled",
    message:
      "The event [Event Name] has been canceled. Please acknowledge this update.",
    action: "mark_as_read",
  },
  {
    id: "4",
    type: "payment_received",
    message:
      "A payment has been received for your loan to Mohamed Izourne. Please confirm receipt.",
    action: "confirm_refuse",
  },
  {
    id: "5",
    type: "loan_created",
    message:
      "A loan has been created by Mohamed izourne[100dh]. Do you accept this transaction?",
    action: "confirm_refuse",
  },
]

const getIcon = (type) => {
  switch (type) {
    case "event_canceled":
      return require("../../assets/icons/event_notification.png")
    default:
      return require("../../assets/icons/give_money.png")
  }
}

const NotificationItem = ({ item }) => (
  <View className="bg-gray-100 text-[#5A5A5A] pt-3 pb-2 pr-3 pl-2 mb-2 rounded-lg flex-row items-start">
    {/* <Icon
      name={getIcon(item.type)}
      size={24}
      color="#00B8B9"
      className="mr-3"
    /> */}
    <View className="w-9 h-9 p-2 bg-white rounded-full mr-2 overflow-hidden">
      <Image className="w-full h-full" source={getIcon(item.type)} />
    </View>
    <View className="flex-1">
      <Text className="text-gray-800 mb-1">{item.message}</Text>
      {item.action === "mark_as_read" ? (
        <TouchableOpacity className="flex-row justify-end mt-4">
          <Text className="text-primary">Mark as read</Text>
          <Ionicons
            className="ml-1 overflow-hidden relative -bottom-[2px]"
            name="checkmark-done-outline"
            size={15}
            color="#00B8B9"
          />
        </TouchableOpacity>
      ) : (
        <View className="flex-row justify-end  mt-4">
          <TouchableOpacity className="bg-gray-200 px-4 py-2 rounded mr-2">
            <Text>Refuse</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-primary px-4 py-2 rounded">
            <Text className="text-white">Confirm</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  </View>
)

const NotificationsScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-white mt-10">
      <View className="flex-row items-center p-4 ">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <IconEntypo name="chevron-thin-left" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      {notifications.length === 0 ? (
        <FlatList
          data={notifications}
          renderItem={({ item }) => <NotificationItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerClassName="p-4"
        />
      ) : (
        <View className="flex-1 justify-start items-center mt-16">
          <Image
            source={require("../../assets/icons/no-notifications.png")}
            style={{ width: 325, height: 325, marginBottom: 20 }}
          />
          <Text className="text-4xl text-[#757575] mt-4">
            Nothing New Here !
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default NotificationsScreen

// const NotificationsScreen = () => {
//   return (
//     <View>
//       <Text>Hello world</Text>
//     </View>
//   )
// }

// export default NotificationsScreen
