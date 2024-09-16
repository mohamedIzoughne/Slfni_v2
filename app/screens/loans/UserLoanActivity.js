import React from "react"
import { View, Text, FlatList } from "react-native"
import { useRoute } from "@react-navigation/native"

const LoanActivityScreen = () => {
  //   const route = useRoute()
  //   const { userId, loanId } = route.params
  const userId = 1

  const dummyActivities = [
    {
      id: 1,
      date: "2023-05-01",
      description: "Loan Disbursement",
      amount: "$5000.00",
    },
    {
      id: 2,
      date: "2023-06-01",
      description: "Payment Received",
      amount: "-$250.00",
    },
    {
      id: 3,
      date: "2023-07-01",
      description: "Payment Received",
      amount: "-$250.00",
    },
    {
      id: 4,
      date: "2023-08-01",
      description: "Payment Received",
      amount: "-$250.00",
    },
    { id: 5, date: "2023-09-01", description: "Late Fee", amount: "$25.00" },
  ]

  const renderActivityItem = ({ item }) => (
    <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
      <Text className="flex-1 text-sm text-gray-600">{item.date}</Text>
      <Text className="flex-2 text-base">{item.description}</Text>
      <Text className="flex-1 text-base font-bold text-right">
        {item.amount}
      </Text>
    </View>
  )

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Loan Activity</Text>
      <FlatList
        data={dummyActivities}
        renderItem={renderActivityItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text className="text-center mt-6 text-base text-gray-600">
            No activity found for this loan.
          </Text>
        }
      />
    </View>
  )
}
export default LoanActivityScreen
