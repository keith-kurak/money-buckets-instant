import { db, id } from "@/db";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function Transactions() {
  const { bucketId } = useLocalSearchParams();

  const query = {
    buckets: {
      $: { where: { id: bucketId as string } },
      transactions: {},
    },
  };

  const { data, isLoading, error } = db.useQuery(query);

  console.log(data);

  const myData = data?.buckets?.[0]?.transactions || [];

  return (
    <>
      <Stack.Screen options={{ title: data?.buckets?.[0]?.title || "" }} />
      <FlatList
        data={myData}
        renderItem={({ item }) => <TransactionView transaction={item} />}
        ListFooterComponent={
          <TransactionEntryView
            onAdd={(title, amount) => {
              const newId = id();
              db.transact([
                db.tx.transactions[newId].create({
                  title,
                  amount,
                  date: new Date(),
                  createdAt: new Date(),
                }),
                db.tx.buckets[bucketId as string].link({ transactions: newId }),
              ]);
            }}
          />
        }
      />
    </>
  );
}

function TransactionView(props: {
  transaction: { title: string; amount: number };
}) {
  const { title, amount } = props.transaction;

  return (
    <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
      <Text className="text-lg">{title}</Text>
      <Text className="text-lg">{amount}</Text>
    </View>
  );
}

function TransactionEntryView(props: {
  onAdd: (title: string, amount: number) => void;
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <View className="p-4 border-t border-gray-200 flex-row justify-between items-center">
      <TextInput
        className="border border-gray-300 rounded p-2 flex-1 mr-2"
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className="border border-gray-300 rounded p-2 mr-2"
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button
        title="Add"
        onPress={() => {
          props.onAdd(title, parseFloat(amount));
          setTitle("");
          setAmount("");
        }}
      />
    </View>
  );
}
