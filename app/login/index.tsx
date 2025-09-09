import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function Welcome() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <Text className="px-4 text-4xl font-bold mb-4 text-gray-800">
        Welcome to Money Buckets
      </Text>
      <Text className="text-lg text-gray-600 mb-8">
        Manage your finances instantly and securely.
      </Text>
      <Pressable
        className="px-6 py-3 bg-tint rounded-lg shadow"
        onPress={() => {
          router.navigate("/login/send-code");
        }}
      >
        <Text className="text-white text-lg">Log In</Text>
      </Pressable>
    </View>
  );
}