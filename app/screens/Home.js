import React, { useEffect, useContext, useState } from "react"
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome6"
import MaterialIcons from "react-native-vector-icons/SimpleLineIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import Hands from "../../assets/icons/hand-coin.svg"
import Vector from "../../assets/Home/Vector.svg"
import useHttp from "../hooks/useHttp"
import { Context } from "../store"
import LendingSVG from "../../assets/svgs/LendingSvg"
import BorrowingSVG from "../../assets/svgs/BorrowingSVG"
import { useColorScheme } from "react-native"

const QuickActionButton = ({ text, onPress, icon }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-primary dark:bg-background rounded-[30px] w-[32%] max-w-[110px] min-w-[90px] h-[110px] py-5 px-4 gap-2 "
    >
      <View className="rounded-md bg-background dark:bg-background-dark w-[35px] aspect-square justify-center items-center ">
        {icon}
        {/* <Hands2 color="#009EE0" width={30} /> */}
      </View>
      <Text className="text-white dark:text-background-dark font-semibold">
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const Home = ({ navigation }) => {
  const profileimage = require("../../assets/koro.png")
  const [financialData, setFinancialData] = useState({
    totalLendings: 0,
    totalBorrowings: 0,
    totalLoans: 0,
  })
  const [totalMembershipPrice, setTotalMembershipPrice] = useState(0)
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"

  const { sendData, isLoading } = useHttp()
  const { userConfiguration, notificationsHandler, notificationsData } =
    useContext(Context)
  const [notificationsButtonIsClicked, setNotificationsButtonIsClicked] =
    useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          authorization: `Bearer ${userConfiguration.accessToken}`,
        }

        await Promise.all([
          sendData("/events/total-membership-price", { headers }, (data) => {
            setTotalMembershipPrice(data.totalMembershipPrice)
          }),
          sendData("/loans/total-loans", { headers }, (data) => {
            setFinancialData(data)
          }),
          sendData("/notifications", { headers }, (data) => {
            notificationsHandler(data)
          }),
        ])
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  return (
    <SafeAreaView className="flex-1  dark:bg-background-dark p-5">
      <View className="flex-row justify-between items-center mb-10">
        <Image source={profileimage} className="w-14 h-14 rounded-full" />
        <View className="relative">
          <TouchableOpacity
            onPress={() => {
              setNotificationsButtonIsClicked(true)
              navigation.navigate("notification")
            }}
          >
            <Ionicons
              name="notifications-outline"
              size={28}
              color={isDarkMode ? "#F5F5F5" : "black"}
            />

            {!notificationsButtonIsClicked &&
              notificationsData.unSeenCount > 0 && (
                <View className="bg-primary absolute top-[2px] right-[1px] justify-center items-center w-[11px] h-[11px] rounded-full">
                  <Text className="text-[8px] text-white">
                    {notificationsData.unSeenCount}
                  </Text>
                </View>
              )}
          </TouchableOpacity>
        </View>
      </View>
      {/* <View className="relative">
        <TouchableOpacity onPress={() => navigation.navigate("notification")}>
          <Ionicons name="notifications-outline" size={28} color="black" />
        </TouchableOpacity>
        <View className="bg-primary absolute top-[2px] right-[1px] justify-center items-center w-[11px] h-[11px] rounded-full">
          <Text className="text-[8px] text-white">3</Text>
        </View>
      </View> */}

      <View className="bg-[#C5ECFF] rounded-2xl p-5 mb-5 relative overflow-hidden">
        <View className="absolute top-0 right-0">
          <Vector />
        </View>
        <Text className="text-[#3C386B]/50 text-xl font-semibold">
          Total Balance
        </Text>
        <View className="flex-row my-[15px]">
          <Text className="text-[#3C386B] text-4xl font-bold">
            {financialData.totalLoans.toFixed(2)}{" "}
          </Text>
          <Text className="text-[#777498] text-4xl font-bold">DH</Text>
        </View>
        {/* <View className="flex-row items-center">
          <View className="p-1 bg-[#ffffff] rounded">
            <FontAwesome6 name="arrow-trend-up" size={16} color="#1C9D21" />
          </View>
          <Text className="text-[#1C9D21]"> +4.08% This Month</Text>
        </View> */}
      </View>

      <View className="flex-row justify-between mb-6">
        <View className="rounded-md pl-4 py-3 w-[32%] bg-[#FFC9CD]">
          <View className="justify-center gap-2">
            <Text className="text-2xl">
              <Hands width={30} height={30} color="blue" />
            </Text>
            <Text className="text-[#777498] font-semibold">Lend</Text>
            <Text className="text-[#3C386B] text-xl font-bold">
              {financialData.totalLendings.toFixed(2)} Dh
            </Text>
          </View>
        </View>

        <View className="rounded-md pl-4 py-3 w-[32%] bg-[#C5ECFF]">
          <View className="justify-center gap-2">
            <Text className="text-2xl">
              <Icon name="arrow-right-arrow-left" size={30} color="#009EE0" />
            </Text>
            <Text className="text-[#777498] font-semibold">Borrow</Text>
            <Text className="text-[#3C386B] text-xl font-bold">
              {financialData.totalBorrowings.toFixed(2)} Dh
            </Text>
          </View>
        </View>

        <View className="rounded-md pl-4 py-3 w-[32%] bg-[#C8FAC8]">
          <View className="justify-center gap-2">
            <Text className="text-2xl">
              <Icon name="wallet" size={25} color="#1C9D21" />
            </Text>
            <Text className="text-[#777498] font-semibold">Event</Text>
            <Text className="text-[#3C386B] text-xl font-bold">
              {totalMembershipPrice?.toFixed(2)} Dh
            </Text>
          </View>
        </View>
      </View>

      <Text className="text-primary dark:text-background text-xl font-semibold mb-4">
        Loan Dashboard
      </Text>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 4,
        }}
        className="mb-"
      >
        <QuickActionButton
          text="Loans"
          icon={
            <Ionicons
              name="wallet-outline"
              size={25}
              color={isDarkMode ? "#FFF" : "#2F5B84"}
            />
          }
          onPress={() => navigation.navigate("Loans")}
        />
        <QuickActionButton
          text="Create lending"
          // icon={<Hands2 color="#009EE0" width={30} />}
          // icon={<Lend color="#009EE0" width={40} />}
          icon={<LendingSVG isDark={isDarkMode} width={40} color="#FFF" />}
          onPress={() =>
            navigation.navigate("CreateLoan", {
              loanStatus: "Lending",
            })
          }
        />
        <QuickActionButton
          text="Create borrowing"
          // icon={<Borrow width={40} />}
          icon={<BorrowingSVG isDark={isDarkMode} width={40} />}
          navigationScreen="CreateLoan"
          onPress={() =>
            navigation.navigate("CreateLoan", {
              loanStatus: "Borrowing",
            })
          }
        />
        <QuickActionButton
          // icon={<Borrow color="#009EE0" width={40} />}
          // icon={<MaterialIcons icon="event" size={25} color="#2F5B84" />}
          icon={
            <MaterialIcons
              name="event"
              size={25}
              color={isDarkMode ? "#FFF" : "#2F5B84"}
            />
          }
          text="Create Event"
          navigationScreen="CreateEvent"
          onPress={() => navigation.navigate("CreateEvent")}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
