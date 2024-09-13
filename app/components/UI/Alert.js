import React from "react"
import { Modal, View, Text, Pressable } from "react-native"

const CustomAlert = ({ visible, title, message, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="m-5 bg-white rounded-3xl p-9 items-center shadow-lg">
          <Text className="mb-4 text-center font-bold text-lg">{title}</Text>
          <Text className="mb-4 text-center">{message}</Text>
          <Pressable
            className="rounded-full py-2 px-4 bg-primary"
            onPress={onClose}
          >
            <Text className="text-white font-bold text-center">Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

export default CustomAlert
