import { IconHeaderButton } from "@/component/IconHeaderButton";
import { db } from "@/db";
import classNames from "classnames";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { sortBy } from "lodash";
import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function Transactions() {
  const { bucketId } = useLocalSearchParams();

  const query = {
    buckets: {
      $: {
        where: { id: bucketId as string },
      },
      transactions: {},
    },
  };

  const router = useRouter();

  const { data, isLoading, error } = db.useQuery(query);

  const myData = sortBy(
    data?.buckets?.[0]?.transactions || [],
    (t) => t.createdAt
  ).reverse();

  const bucketBalance = myData.reduce((sum, t) => sum + t.amount, 0);

  return (
    <>
      <Stack.Screen
        options={{
          title: data?.buckets?.[0]?.title || "",
          headerShown: true,
          headerRight: () => (
            <IconHeaderButton
              icon="plus"
              onPress={() => {
                router.navigate(`/${bucketId}/add`);
              }}
            />
          ),
        }}
      />
      <FlatList
        data={myData}
        renderItem={({ item }) => <TransactionView transaction={item} />}
        ListHeaderComponent={() => (
          <View className="py-8 px-4">
            <Text className="text-2xl font-bold">
              Balance: ${bucketBalance}
            </Text>
          </View>
        )}
      />
    </>
  );
}

function TransactionView(props: {
  transaction: { title: string; amount: number; date: string };
}) {
  const { title, amount, date } = props.transaction;

  return (
    <View className={classNames("p-4 border-b border-gray-200 flex-row justify-between items-center", amount < 0 ? "bg-red-100" : "bg-green-100")}>
      <View>
        <Text className="text-lg">{title}</Text>
        <Text className="text-gray-500">
          {new Date(date).toLocaleDateString()}
        </Text>
      </View>
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
