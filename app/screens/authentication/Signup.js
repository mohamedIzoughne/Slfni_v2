import {
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from "react-native"
import { Link } from "@react-navigation/native"
import "../../../global.css"

const LabeledInput = ({ label, placeholder, isTextSecure = false }) => {
  return (
    <View className="mb-4">
      <Text className="text-sm mb-1">{label}</Text>
      <TextInput
        className="border-2 border-[#C5C5C5] p-3 rounded-md focus:border-[#37C8C3]"
        secureTextEntry={isTextSecure}
        placeholder={placeholder}
        placeholderTextColor="#757575"
      />
    </View>
  )
}

export default function Signup({ navigation }) {
  return (
    <View className="flex-1 bg-white">
    <ScrollView className=" px-5 pt-3 bg-white">
      <View className="mt-10 mb-6">
        <Text className="font-bold text-2xl pb-1">Hey, there! 👋</Text>
        <Text className="font-bold text-2xl">Simplify lending borrowing with our app!</Text>
        <Text className="text-[#969696] text-sm mt-2">
          From here on out, you can now easily track your borrowers and lenders at any time.
        </Text>
      </View>

      <View className="flex-1 justify-between mx-7">
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
          placeholder="Confirm your password"
        />

<Pressable
        onPress={() => navigation.navigate("ConfirmEmail")}
        className="bg-[#40E0D0] rounded-md p-3 mt-6"
      >
        <Text className="text-white font-bold text-lg text-center">
          Sign up
        </Text>
      </Pressable>

      <Pressable className="border border-[#C5C5C5] rounded-md p-3 mt-4 flex-row justify-center items-center">
        <Image 
          source={require('../../../assets/google-icon.webp')} 
          style={{width: 20, height: 20, marginRight: 10}}
        />
        <Text className="text-black font-semibold">Continue with Google</Text>
      </Pressable>

      </View>
    </ScrollView>
    <View className="mb-2">
        <Text className="text-center">
          You already have an account?{" "}
          <Link className="font-bold text-primary" to={{ screen: "login" }}>
            <Text>login</Text>
          </Link>
        </Text>
      </View>
    </View>
  )
}