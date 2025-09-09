import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Welcome() {
  const [code, setCode] = React.useState("");
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 gap-y-4">
      <Text className="px-4 text-4xl font-bold mb-4 text-gray-800">
        Enter the magic code
      </Text>
      <Text className="text-lg text-gray-600 mb-8">
        Enter the code you got with your email
      </Text>
      <TextInput className="border border-gray-300 rounded p-2 w-3/4"
        placeholder="Enter Code"
        autoCapitalize="none"
        autoCorrect={false}
        value={code}
        onChangeText={setCode}
      />
      <Pressable
        className="px-6 py-3 bg-tint rounded-lg shadow"
        onPress={() => {
          router.navigate("/(logged-in)/index");
        }}
      >
        <Text className="text-white text-lg">Finish login</Text>
      </Pressable>
    </View>
  );
}