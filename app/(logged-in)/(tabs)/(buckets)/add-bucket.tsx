import { useCreateBucketMutation } from "@/db/mutations";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function AddBucketScreen() {
  const [title, setTitle] = useState("");
  const [startingBalance, setStartingBalance] = useState("");
  const [selectedColor, setSelectedColor] = useState("#F44336");
  const { createBucket } = useCreateBucketMutation();

  const myCreateBucket = () => {
    createBucket(
      title,
      selectedColor,
      startingBalance ? parseFloat(startingBalance) : undefined
    );
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: "New Bucket", headerShown: true }} />
      <View className="p-4 gap-y-4">
        <TextInput
          className="border border-gray-300 rounded p-2 flex-1 mr-2"
          placeholder="New Bucket Title"
          value={title}
          onChangeText={setTitle}
          autoFocus={true}
        />
        <TextInput
          className="border border-gray-300 rounded p-2 flex-1 mr-2"
          placeholder="Starting Balance"
          value={startingBalance}
          onChangeText={setStartingBalance}
        />
        <View className="flex-row mt-4 justify-between">
          {[
            "#F44336",
            "#E91E63",
            "#9C27B0",
            "#3F51B5",
            "#2196F3",
            "#009688",
            "#4CAF50",
            "#b8ab3d", //yellow-ish
            "#FF9800",
            "#795548",
          ].map((color, idx) => (
            <Pressable key={color} onPress={() => setSelectedColor(color)}>
              <View
                key={color}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: color,
                  marginHorizontal: 2,
                  borderWidth: 4,
                  borderColor: selectedColor === color ? "#000" : "transparent",
                  elevation: 2,
                }}
              />
            </Pressable>
          ))}
        </View>
        <Pressable
          className="bg-blue-500 p-2 rounded-md justify-center items-center mt-4"
          onPress={myCreateBucket}
        >
          <Text className="text-white">Create Bucket</Text>
        </Pressable>
      </View>
    </>
  );
}
