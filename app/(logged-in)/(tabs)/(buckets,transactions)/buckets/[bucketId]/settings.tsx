import colors from "@/constants/colors";
import { useBucketQuery } from "@/db/queries";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function BucketSettingsScreen() {
  const [title, setTitle] = useState("");
  const { bucketId } = useLocalSearchParams();
  const [selectedColor, setSelectedColor] = useState(colors.bucketColorOptions[0]);
  const { bucket } = useBucketQuery(bucketId as string);
  const { updateBucket } = useUpdateBucketMutation();

  return (
    <>
      <Stack.Screen options={{ title: "New Bucket", headerShown: true }} />
      <View className="p-4 gap-y-4">
        <TextInput
          className="border border-gray-300 rounded p-2 mr-2"
          placeholder="New Bucket Title"
          value={title}
          onChangeText={setTitle}
          autoFocus={true}
        />
        <View className="flex-row mt-4 justify-between">
          {colors.bucketColorOptions.map((color, idx) => (
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
          className="bg-tint p-2 rounded-md justify-center items-center mt-4"
          onPress={myUpdateBucket}
        >
          <Text className="text-white">Save</Text>
        </Pressable>
      </View>
    </>
  );
}
