import colors from "@/constants/colors";
import { db } from "@/db";
import Entypo from "@expo/vector-icons/Entypo";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { top } = useSafeAreaInsets();

  const { data, isLoading, error } = db.useQuery({
    buckets: {},
  });
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Buckets" }} />
      <View
        style={{
          height: 64,
          paddingTop: top,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Link href="/add-bucket" asChild>
          <Pressable className="p-4">
            <Entypo name="plus" size={24} color={colors.tint} />
          </Pressable>
        </Link>
      </View>
      <FlatList
        data={data.buckets}
        renderItem={({ item }) => <BucketView bucket={item} />}
      />
    </>
  );
}

function BucketView(props: {
  bucket: { title: string; color: string; id: string };
}) {
  const { title, color } = props.bucket;

  return (
    <Link href={`/${props.bucket.id}`} asChild>
      <Pressable>
        <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
          <Text className="text-lg">{title}</Text>
          <View
            className={`w-6 h-6 rounded-full`}
            style={{ backgroundColor: color }}
          />
        </View>
      </Pressable>
    </Link>
  );
}

function BucketEntryView(props: {
  onAdd: (title: string, color: string) => void;
}) {
  const [title, setTitle] = useState("");

  return (
    <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
      <TextInput
        className="border border-gray-300 rounded p-2 flex-1 mr-2"
        placeholder="New Bucket Title"
        value={title}
        onChangeText={setTitle}
      />
      <Button
        title="Add"
        onPress={() => {
          props.onAdd(title, "#ff0000");
          setTitle("");
        }}
      />
    </View>
  );
}
