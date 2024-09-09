// import React from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native"
import { styled } from "nativewind"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import IconEntypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"

const StyledView = View
const StyledText = Text
const StyledTouchableOpacity = TouchableOpacity
const StyledSafeAreaView = SafeAreaView

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
    case "event_initiated":
    case "borrowing_initiated":
    case "payment_received":
    case "loan_created":
      return "pencil"
    case "event_canceled":
      return "calendar"
    default:
      return "bell"
  }
}

const NotificationItem = ({ item }) => (
  <StyledView className="bg-gray-100 p-4 mb-2 rounded-lg flex-row items-start">
    <Icon
      name={getIcon(item.type)}
      size={24}
      color="#00B8B9"
      className="mr-3"
    />
    <StyledView className="flex-1">
      <StyledText className="text-gray-800 mb-1">{item.message}</StyledText>
      {item.action === "mark_as_read" ? (
        <StyledTouchableOpacity className="self-end justify-end">
          <StyledText className="text-primary">
            Mark as read
            <Ionicons
              style={{ marginBottom: -10 }}
              name="checkmark-done-outline"
              size={16}
              color="#00B8B9"
            />
          </StyledText>
        </StyledTouchableOpacity>
      ) : (
        <StyledView className="flex-row justify-end mt-2">
          <StyledTouchableOpacity className="bg-gray-200 px-4 py-2 rounded mr-2">
            <StyledText>Refuse</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity className="bg-primary px-4 py-2 rounded">
            <StyledText className="text-white">Confirm</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      )}
    </StyledView>
  </StyledView>
)

const NotificationsScreen = () => {
  return (
    <StyledSafeAreaView className="flex-1 bg-white mt-10">
      <StyledView className="flex-row items-center p-4 ">
        <TouchableOpacity>
          <IconEntypo name="chevron-thin-left" size={30} color="#000" />
        </TouchableOpacity>
      </StyledView>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
      />
      <StyledView className="flex-row justify-around py-2 border-t border-gray-200">
        <Icon name="home" size={24} color="#009688" />
        <Icon name="account" size={24} color="#757575" />
        <Icon name="file-document" size={24} color="#757575" />
        <Icon name="cog" size={24} color="#757575" />
      </StyledView>
    </StyledSafeAreaView>
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
