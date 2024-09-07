import {
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native"
import { Link } from "@react-navigation/native"
import "../../../global.css"
function WelcomeText({ children }) {
  return <Text className="font-bold text-xl">{children}</Text>
}

const LabeledInput = ({ label, placeholder, isTextSecure = false }) => {
  return (
    <View>
      <Text className="text-sm">{label}</Text>
      <TextInput
        className="border border-[#C5C5C5] p-1 rounded w-[295px] h-[46px]"
        secureTextEntry={isTextSecure}
        placeholder={placeholder}
        placeholderTextColor="#757575"
      />
    </View>
  )
}

export default function Signup({ navigation }) {
  return (
    <View className="flex-1 px-5 bg-white justify-center">
      <ScrollView className="bg-black">
        <View className="mt-[50px] h-fit bg-blue-500">
          <WelcomeText>Hey, there</WelcomeText>
          <WelcomeText>
            Experience Hassle-Free Lending and Borrowing Today!
          </WelcomeText>
        </View>

        <Text className="text-[#969696] text-sm bg-violet-500">
          From here on out, you can now easily track your borrowers and lenders
          at any time.
        </Text>

        <View className="mt-5 ">
          <LabeledInput label="Full name" placeholder="Enter your full name" />
          <LabeledInput label="Email" placeholder="Enter your email" />
          <LabeledInput
            label="Password"
            isTextSecure={true}
            placeholder="Enter password"
          />
          <LabeledInput
            label="Confirm password"
            isTextSecure={true}
            placeholder="Confirm your entered password"
          />
        </View>
      </ScrollView>
      <View className="flex-1 bg-red-400 justify-between pb-3">
        <Pressable
          onPress={() => navigation.navigate("ConfirmEmail")}
          style={({ pressed }) => [pressed && { opacity: 0.75 }]}
          className="bg-primary rounded-md p-2.5 mt-5"
        >
          <Text className="text-white font-bold text-xl text-center">
            Sign up
          </Text>
        </Pressable>
        <Text className="text-center">
          You already have an account?{" "}
          <Link className="font-bold" to={{ screen: "login" }}>
            <Text>login</Text>
          </Link>
        </Text>
      </View>
    </View>
  )
}
