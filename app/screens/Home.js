import React, { useEffect, useContext,useState } from "react"
import { View, Text, SafeAreaView, TouchableOpacity,Image } from "react-native"
import { Ionicons,FontAwesome,FontAwesome6  } from "@expo/vector-icons"
import Icon from "react-native-vector-icons/FontAwesome6"
import Hands from "../../assets/icons/hand-coin.svg"
import Hands2 from "../../assets/icons/hand-coin2.svg"
import Vector from "../../assets/Home/Vector.svg"
import useHttp from "../hooks/useHttp"
import { Context } from "../store"



const Home = ({ navigation }) => {
  const profileimage= require("../../assets/koro.png")
  const [financialData, setFinancialData] = useState({
    "totalLendings": null,
    "totalBorrowings": null,
    "totalLoans": null
  });
  const [totalMembershipPrice, setTotalMembershipPrice] = useState();

  const { sendData, isLoading } = useHttp()
  const { userConfiguration } = useContext(Context)
  useEffect(() => {
    sendData(
      `/events/total-membership-price`,
      {
        headers: {
          authorization: `Bearer ${userConfiguration.accessToken}`,
        },
      },
      (data) => {
        setTotalMembershipPrice(data.totalMembershipPrice)
      },
      (err) => {
        console.log(err)
      }
    )
    sendData(
      `/loans/total-loans`,
      {
        headers: {
          authorization: `Bearer ${userConfiguration.accessToken}`,
        },
      },
      (data) => {
        setFinancialData(data)
      },
      (err) => {
        console.log(err)
      }
    )
  }, [])
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <View className="flex-row justify-between items-center mb-10">
        <Image source={profileimage} className="w-14 h-14 rounded-full" />
        <View className="flex-row">
        <FontAwesome name="moon-o" size={24} color="black" />
                    <Ionicons className="ml-2.5" name="notifications" size={20} color="#666" />

        </View>
      </View>

      <View className="bg-[#E6F5FC] rounded-2xl p-5 mb-5 relative">
        <View className="absolute top-0 right-0">
            <Vector/>
        </View>
        <Text className="text-[#3C386B]/50 text-xl font-semibold">Total Balance</Text>
        <View className="flex-row my-[15px]">
          <Text className="text-[#3C386B] text-4xl font-bold">${financialData.totalLoans}.00 </Text>
          <Text className="text-[#777498] text-4xl font-bold">DH</Text>
        </View>
        <View className="flex-row items-center">
          <View className="p-1 bg-[#ffffff] rounded">
            <FontAwesome6 name="arrow-trend-up" size={16} color="#1C9D21" />
          </View>
          <Text className="text-[#1C9D21]"> +4.08% This Month</Text>
        </View>
      </View>

      <View className="flex-row justify-between mb-10">
        {["Lend", "Borrow", "Event"].map((action, index) => (
          <View key={index} className={`rounded-md  pl-4  py-3 w-[32%] ${
            index === 0
              ? "bg-[#FCEEEF]"
              : index === 1
              ? "bg-[#E6F5FC]"
              : "bg-[#E9F5E9]"
          }`}>
            <View
              className={`justify-center gap-2  `}
            >
              <Text className="text-2xl">
              {action === "Lend" ? <Hands width={30} height={30} color="blue" />: action === "Borrow" ? <Icon name="arrow-right-arrow-left" size={30} color="#009EE0" /> : <Icon name="wallet" size={25} color="#1C9D21" />}
              </Text>
              <Text className="text-[#777498] font-semibold">{action}</Text>
              {action === "Lend" ? <Text className="text-[#3C386B] text-xl font-bold">${financialData.totalLendings}.00</Text> : action === "Borrow" ? <Text className="text-[#3C386B] text-xl font-bold">${financialData.totalBorrowings}.00</Text> : <Text className="text-[#3C386B] text-xl font-bold">${totalMembershipPrice}.00</Text>}

            </View>
          </View>
        ))}
      </View>

      <View className="mb-5">
        <Text className="text-primary text-xl font-semibold mb-6">
          Loan Dashboard
        </Text>
        <View className="flex-row justify-between flex-wrap">
          {["My Loans", "Create lending", "Create lending"].map(
            (option, index) => (
              <TouchableOpacity
                key={index}
                className="bg-primary rounded-[30px] w-[110px] h-[110px] py-5 px-4 gap-2 "
              >
                <View className="rounded-md bg-background w-[35px] aspect-square justify-center items-center ">
                  <Hands2 color="#009EE0" width={30}  />
                </View>
                <Text className="text-white font-semibold">
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
            <Ionicons name={icon} size={24} color={index === 0 ? "#3B82F6" : "#666"} />
            <Text className={`text-xs mt-1.5 ${index === 0 ? "text-[#3B82F6]" : "text-gray-500"}`}>
              {["Accueil", "Friends", "Panier", "Setting"][index]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default Home