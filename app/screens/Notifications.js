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
import useHttp from "../hooks/useHttp"
import { useContext, useEffect, useState } from "react"
import { Context } from "../store/index"

const notis = [
  {
    amount: "50",
    contexttype: "event",
    date: "2024-09-15T12:00:00.000Z",
    id: 1001,
    imageurl: null,
    name: "John Doe",
    priority: 2,
    title: "Event Canceled",
    type: "eventCanceled",
    withOpinion: false,
  },
  {
    amount: "30",
    contexttype: "loan",
    date: "2024-09-14T11:00:00.000Z",
    id: 1002,
    imageurl: null,
    name: "Jane Smith",
    priority: 3,
    title: "Payment Received",
    type: "paymentReceived",
    withOpinion: true,
  },
  {
    amount: "70",
    contexttype: "event",
    date: "2024-09-13T10:00:00.000Z",
    id: 1003,
    imageurl: null,
    name: "Alice Johnson",
    priority: 3,
    title: "Event Invitation",
    type: "eventInvitation",
    withOpinion: false,
  },
  {
    amount: "100",
    contexttype: "loan",
    date: "2024-09-12T09:00:00.000Z",
    id: 1004,
    imageurl: null,
    name: "Bob White",
    priority: 4,
    title: "Lending Initiated",
    type: "lendingInitiated",
    withOpinion: true,
  },
  {
    amount: "60",
    contexttype: "loan",
    date: "2024-09-11T08:00:00.000Z",
    id: 1005,
    imageurl: null,
    name: "Charles Green",
    priority: 1,
    title: "Successfully Paid",
    type: "successfullyPaid",
    withOpinion: true,
  },
  {
    amount: "80",
    contexttype: "loan",
    date: "2024-09-10T07:00:00.000Z",
    id: 1006,
    imageurl: null,
    name: "David Black",
    priority: 3,
    title: "Borrowing Initiated",
    type: "borrowingInitiated",
    withOpinion: false,
  },
  {
    amount: "25",
    contexttype: "loan",
    date: "2024-09-09T06:00:00.000Z",
    id: 1007,
    imageurl: null,
    name: "Eve Brown",
    priority: 4,
    title: "Refused Payment",
    type: "refusedPayment",
    withOpinion: true,
  },
  {
    amount: "45",
    contexttype: "event",
    date: "2024-09-08T05:00:00.000Z",
    id: 1008,
    imageurl: null,
    name: "Frank Yellow",
    priority: 4,
    title: "Member Refused",
    type: "memberRefused",
    withOpinion: false,
  },
  {
    amount: "55",
    contexttype: "event",
    date: "2024-09-07T04:00:00.000Z",
    id: 1009,
    imageurl: null,
    name: "George Blue",
    priority: 2,
    title: "Event Updated",
    type: "eventUpdated",
    withOpinion: true,
  },
  {
    amount: "90",
    contexttype: "loan",
    date: "2024-09-06T03:00:00.000Z",
    id: 1010,
    imageurl: null,
    name: "Hannah Red",
    priority: 4,
    title: "Refuse Lending",
    type: "refuseLending",
    withOpinion: false,
  },
  {
    amount: "75",
    contexttype: "event",
    date: "2024-09-05T02:00:00.000Z",
    id: 1011,
    imageurl: null,
    name: "Ivy Pink",
    priority: 3,
    title: "User Paid Event",
    type: "userPaidEvent",
    withOpinion: true,
  },
  {
    amount: "85",
    contexttype: "loan",
    date: "2024-09-04T01:00:00.000Z",
    id: 1012,
    imageurl: null,
    name: "Jack Purple",
    priority: 4,
    title: "Admin Declined Paying",
    type: "adminDeclinedPaying",
    withOpinion: true,
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

const makeMessage = (senderName, type, title, amount = "") => {
  const messages = {
    eventCanceled: `The event "${title}" has been canceled. Please acknowledge this update.`,
    paymentReceived: `A payment has been received for your loan to ${senderName}. Please confirm receipt.`,
    eventInvitation: `You have been invited to the event "${title}" created by ${senderName} with an amount of ${amount}. Do you accept this invitation?`,
    lendingInitiated: `A loan request of ${amount} has been created by ${senderName}. Do you accept this transaction?`,
    successfullyPaid: `${senderName} has confirmed that the loan "${title}" has been fully paid. The transaction is now closed.`,
    borrowingInitiated: `${senderName} has declared that you have lent them money.`,
    refusedPayment: `${senderName} has refused your payment declaration for the loan "${title}". They state that the debt has not been fully cleared. Please resolve this disagreement.`,

    memberRefused: `${senderName} has declined the invitation to join the event as a member. Your participation has been canceled.`,
    eventUpdated: `The event "${title}" has been updated. Please review the changes and confirm your participation.`,
    refuseLending: `Your lending declaration was refused by ${senderName}. The transaction has not been accepted.`,
    userPaidEvent: `${senderName} has declared that the payment for the event has been completed.`,
    adminDeclinedPaying: `The admin (${senderName}) has declined your payment declaration for the event "${title}". Please review and update the payment details.`,
  }

  return messages[type]
}
const NotificationItem = ({ item }) => {
  // actually not all of them it's just 4 I guess
  const confirmHandler = () => {
    switch (item.type) {
      case "eventCanceled":
        // Handle event canceled
        break
      case "paymentReceived":
        // Handle payment received
        break
      case "eventInvitation":
        // Handle event invitation
        break
      case "lendingInitiated":
        // Handle lending initiated
        break
      case "successfullyPaid":
        // Handle successfully paid
        break
      case "borrowingInitiated":
        // Handle borrowing initiated
        break
      case "refusedPayment":
        // Handle refused payment
        break
      case "memberRefused":
        // Handle member refused
        break
      case "eventUpdated":
        // Handle event updated
        break
      case "refuseLending":
        // Handle refuse lending
        break
      case "userPaidEvent":
        // Handle user paid event
        break
      case "adminDeclinedPaying":
        // Handle admin declined paying
        break
      default:
        // Handle default case
        break
    }
  }
  const refuseHandler = () => {
    switch (item.type) {
      case "eventCanceled":
        // Handle event canceled
        break
      case "paymentReceived":
        // Handle payment received
        break
      case "eventInvitation":
        // Handle event invitation
        break
      case "lendingInitiated":
        // Handle lending initiated
        break
      case "successfullyPaid":
        // Handle successfully paid
        break
      case "borrowingInitiated":
        // Handle borrowing initiated
        break
      case "refusedPayment":
        // Handle refused payment
        break
      case "memberRefused":
        // Handle member refused
        break
      case "eventUpdated":
        // Handle event updated
        break
      case "refuseLending":
        // Handle refuse lending
        break
      case "userPaidEvent":
        // Handle user paid event
        break
      case "adminDeclinedPaying":
        // Handle admin declined paying
        break
      default:
        // Handle default case
        break
    }
  }

  return (
    <View className="bg-gray-100 text-[#5A5A5A] pt-3 pb-2 pr-3 pl-2 mb-2 rounded-lg flex-row items-start">
      <View className="w-9 h-9 p-2 bg-white rounded-full mr-2 overflow-hidden">
        <Image className="w-full h-full" source={getIcon(item.type)} />
      </View>
      <View className="flex-1">
        <Text className="text-gray-800 mb-1">
          {makeMessage(item.senderName, item.type, item.title, item.amount)}
        </Text>
        {item.withOpinion ? (
          <View className="flex-row justify-end  mt-4">
            <TouchableOpacity
              onPress={refuseHandler}
              className="bg-gray-200 px-4 py-2 rounded mr-2"
            >
              <Text>Refuse</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmHandler}
              className="bg-primary px-4 py-2 rounded"
            >
              <Text className="text-white">Confirm</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity className="flex-row justify-end mt-4">
            <Text className="text-primary">Mark as read</Text>
            <Ionicons
              className="ml-1 overflow-hidden relative -bottom-[2px]"
              name="checkmark-done-outline"
              size={15}
              color="#00B8B9"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const NotificationsScreen = ({ navigation }) => {
  const { sendData, isLoading } = useHttp()
  const { userConfiguration } = useContext(Context)
  const [notifications, setNotifications] = useState([])
  useEffect(() => {
    sendData(
      "/notifications",
      {
        headers: {
          authorization: `Bearer ${userConfiguration.accessToken}`,
        },
      },
      (data) => {
        setNotifications(notis)
        // setNotifications(data.notifications)
        console.log(data)
      },
      (err) => {
        console.log(err)
      }
    )
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-white mt-10">
      <View className="flex-row items-center p-4 ">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <IconEntypo name="chevron-thin-left" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      {notifications.length !== 0 ? (
        <FlatList
          data={notis}
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
