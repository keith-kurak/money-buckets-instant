import { db } from "@/db";
import { useCreateGroupMutation } from "@/db/mutations";
import { useLocalContext } from "@/db/store";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function ChooseGroup() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{ id: string; title: string }[]>([]);
  const [title, setTitle] = useState("");
  const { setCurrentGroupId } = useLocalContext();
  const { createGroup } = useCreateGroupMutation();

  useEffect(() => {
    (async function () {
      const { data } = await db.queryOnce({ groups: {} });
      setData(data.groups);
      if (data.groups.length >= 1) {
        setCurrentGroupId(data.groups[0].id);
      }
    })();
    setIsLoading(false);
  }, [setCurrentGroupId]);

  if (isLoading) {
    return null;
  }

  if (data.length < 1) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 gap-y-4">
        <Text className="px-4 text-4xl font-bold mb-4 text-gray-800">
          Name your group of buckets
        </Text>
        <Text className="text-lg text-gray-600 mb-8">
          What will you be tracking?
        </Text>
        <TextInput
          className="border border-gray-300 rounded p-2 w-3/4"
          placeholder="Family budget, kid's spending, etc."
          autoCapitalize="none"
          autoCorrect={false}
          value={title}
          onChangeText={setTitle}
        />
        <Pressable
          className="px-6 py-3 bg-tint rounded-lg shadow"
          onPress={async () => {
            createGroup(title);
          }}
        >
          <Text className="text-white text-lg">Start tracking</Text>
        </Pressable>
      </View>
    );
  }
  return null;
}
