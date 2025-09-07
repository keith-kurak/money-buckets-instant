import { db, id } from "@/db";
import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function Index() {
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
    <FlatList
      data={data.buckets}
      renderItem={({ item }) => <BucketView bucket={item} />}
      ListHeaderComponent={
        <BucketEntryView
          onAdd={(title, color) => {
            db.transact(
              db.tx.buckets[id()].create({ title, color, createdAt: new Date() }),
            );
          }}
        />
      }
    />
  );
}

function BucketView(props: { bucket: { title: string; color: string } }) {
  const { title, color } = props.bucket;

  return (
    <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
      <Text className="text-lg">{title}</Text>
      <View
        className={`w-6 h-6 rounded-full`}
        style={{ backgroundColor: color }}
      />
    </View>
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
