import { db } from "@/db";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Welcome() {
  const [code, setCode] = React.useState("");
  const router = useRouter(); 
  const { email } = useLocalSearchParams()
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
        autoFocus
      />
      <Pressable
        className="px-6 py-3 bg-tint rounded-lg shadow"
        onPress={async () => {
          await db.auth.signInWithMagicCode({ email: email as string, code })
          // not sure why it stil wants this
          router.replace("/(logged-in)");
        }}
      >
        <Text className="text-white text-lg">Finish login</Text>
      </Pressable>
    </View>
  );
}