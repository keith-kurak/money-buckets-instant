import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Welcome() {
  const [email, setEmail] = React.useState("");
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 gap-y-4">
      <Text className="px-4 text-4xl font-bold mb-4 text-gray-800">
        Login with a magic code
      </Text>
      <Text className="text-lg text-gray-600 mb-8">
        We will send a code to your email to login
      </Text>
      <TextInput className="border border-gray-300 rounded p-2 w-3/4"
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />
      <Pressable
        className="px-6 py-3 bg-tint rounded-lg shadow"
        onPress={() => {
          router.navigate("/login/enter-code");
        }}
      >
        <Text className="text-white text-lg">Send Code</Text>
      </Pressable>
    </View>
  );
}