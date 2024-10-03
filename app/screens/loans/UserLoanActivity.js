import React, { useContext, useEffect, useState } from "react"
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native"
import IconEntypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import useHttp from "../../hooks/useHttp"
import { Context } from "../../store"
import { formatDate } from "../../utils"

const TransactionItem = ({ loan }) => {
  return (
    <View className="bg-white mx-4 my-2 p-4 rounded-lg ">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="font-bold text-[#003566]">{loan.title}</Text>
        <Text className="text-[#979797] font-semibold text-xs">
          {formatDate(loan.createDate)}
        </Text>
      </View>
      <Text className="text-[#979797] mb-2 text-xs">{loan.description}</Text>
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
              loan.loanStatus === "borrowing"
                ? "text-red-500"
                : "text-[#1C9D21]"
            }`}
          >
            {loan.loanStatus}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-[#979797] text-sm font-medium mr-2">
            Amount
          </Text>
          <Text className="font-semibold text-sm">{loan.amount}Dh</Text>
        </View>
      </View>
    </View>
  )
}

const AddLoanButton = ({ navigation, name, userId, username }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {isOpen && (
        <View className="bg-white absolute bottom-[134px] right-12 rounded-md rounded-br-none">
          <TouchableOpacity
            className="py-2 pl-4 pr-8 text-xl"
            onPress={() =>
              navigation.navigate("CreateLoan", {
                userId,
                name,
                loanStatus: "Lending",
                username,
              })
            }
          >
            <Text>Lending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-2 pl-4 pr-8 text-xl"
            onPress={() =>
              navigation.navigate("CreateLoan", {
                userId,
                name: name,
                loanStatus: "Borrowing",
                username,
              })
            }
          >
            <Text>Borrowing</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={{ borderRadius: 9, backgroundColor: "#0F3B64" }}
        className={`absolute bottom-24 right-12 bg-[#0F3B64] p-3 ${
          isOpen ? "rounded-t-none" : ""
        } `}
      >
        <Ionicons
          name={isOpen ? "close-outline" : "add"}
          size={26}
          color="white"
        />
      </TouchableOpacity>
    </>
  )
}

const Options = ({ friendId, setIsSettled }) => {
  const [optionsVisible, setOptionsVisible] = useState(false)
  const { sendData, isLoading } = useHttp()
  const { userConfiguration } = useContext(Context)

  const sendRequest = () => {
    sendData(
      `/loans/settle-down-loans/${friendId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userConfiguration.accessToken}`,
        },
      },
      (data) => {
        setIsSettled((prev) => !prev)
      },
      (err) => {
        Alert.alert("Error", err, [{ text: "OK" }])
      }
    )
  }

  const settleDownLoansHandler = () => {
    setOptionsVisible(false)
    Alert.alert("Settle down loans", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: sendRequest,
      },
    ])
  }

  return (
    <>
      <View className="ml-auto relative bg-red-100  items-start ">
        <TouchableOpacity
          className="absolute right-0 -top-2"
          onPress={() => {
            setOptionsVisible((prev) => !prev)
          }}
        >
          <SimpleLineIcons name="options-vertical" size={15} color="#FFF" />
        </TouchableOpacity>
        {optionsVisible && (
          <View
            style={{
              elevation: 10,
            }}
            className="absolute right-4 top-3 bg-white rounded-md shadow-md z-10"
          >
            <TouchableOpacity
              onPress={settleDownLoansHandler}
              className="px-4 py-2 border-b border-gray-200"
            >
              <Text className="text-gray-800">Settle loans down</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  )
}

const UserProfileTransactions = ({ route, navigation }) => {
  const { sendData, isLoading } = useHttp()
  const [loans, setLoans] = React.useState([])
  const { friendId, name, username, imageUrl, lendingBalance, settled } =
    route.params
  const { userConfiguration } = useContext(Context)
  const [isSettled, setIsSettled] = useState(settled)

  useEffect(() => {
    sendData(
      "/loans/activity/" + friendId,
      {
        headers: {
          Authorization: `Bearer ${userConfiguration.accessToken}`,
        },
      },
      (data) => {
        setLoans(data.loans)
      },
      (error) => {
        Alert.alert("", error, [{ text: "OK" }])
      }
    )
  }, [])

  return (
    <View className="flex-1 bg-background-light">
      <View
        style={{ zIndex: 10 }}
        className="bg-primary px-4 py-5 flex-row items-center "
      >
        <TouchableOpacity
          className="bg-background-light w-[26px] h-[26px] justify-center items-center rounded-full"
          onPress={() => navigation.goBack()}
        >
          <IconEntypo name="chevron-thin-left" size={15} color="#000" />
        </TouchableOpacity>
        <View className="flex-row">
          <Image
            source={
              imageUrl
                ? { uri: imageUrl }
                : require("../../../assets/person.png")
            }
            className="w-12 h-12 rounded-full mr-2 ml-3"
          />
          <View>
            <Text className="text-white">{name}</Text>
            <Text className="text-[#BBD0E3]">@{username}</Text>
          </View>
        </View>
        {<Options setIsSettled={setIsSettled} friendId={friendId} />}
      </View>
      <View className="flex-row justify-between mx-6 mt-4">
        <Text className="font-semibold text-lg text-[#003566] overline">
          Total:
        </Text>
        <Text
          className={`font-semibold text-lg ${
            isSettled ? "line-through" : ""
          } ${lendingBalance >= 0 ? "text-[#1C9D21]" : "text-red-500"}`}
        >
          {parseFloat(lendingBalance).toFixed(2)}Dh
        </Text>
      </View>
      <FlatList
        data={loans}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: loan }) => <TransactionItem loan={loan} />}
        contentContainerStyle={{ paddingTop: 10 }}
      />

      <AddLoanButton
        navigation={navigation}
        name={name}
        userId={friendId}
        username={username}
      />
    </View>
  )
}

export default UserProfileTransactions
