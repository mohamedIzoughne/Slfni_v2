import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import RNModal from "react-native-modal"

export const Modal = ({ isVisible = false, onPress, children, ...props }) => {
  return (
    <RNModal
      onBackdropPress={onPress}
      isVisible={isVisible}
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={400}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      {...props}
    >
      {children}
    </RNModal>
  )
}

const ModalContainer = ({ children }) => (
  <View className="bg-background dark:bg-background-dark rounded-lg border border-black py-3 px-2">
    {children}
  </View>
)

const ModalHeader = ({ title }) => (
  <View className="items-center justify-center">
    <Text className="pt-2.5 text-center text-2xl dark:text-background  font-bold">
      {title}
    </Text>
  </View>
)

const ModalBody = ({ children }) => (
  <View className="justify-center px-3.5 min-h-[100px]">{children}</View>
)

const ModalFooter = ({ children }) => (
  <View className="sjustify-end items-center p-2.5 flex-row">{children}</View>
)

Modal.Header = ModalHeader
Modal.Container = ModalContainer
Modal.Body = ModalBody
Modal.Footer = ModalFooter
