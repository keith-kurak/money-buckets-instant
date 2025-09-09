import colors from "@/constants/colors";
import { db, id } from "@/db";
import classNames from "classnames";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function AddTransactionScreen() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"expense" | "income">("expense");

  const { bucketId } = useLocalSearchParams();
  const router = useRouter();

  const query = {
    buckets: {
      $: { where: { id: bucketId as string } },
      transactions: {},
    },
  };

  const { data, isLoading, error } = db.useQuery(query);

  const bucketColor = data?.buckets?.[0]?.color || colors.tint;

  const addTransaction = () => {
    const newId = id();
    db.transact([
      db.tx.transactions[newId].create({
        title,
        amount: parseFloat(amount) * (type === "expense" ? -1 : 1),
        date: new Date(),
        createdAt: new Date(),
      }),
      db.tx.buckets[bucketId as string].link({ transactions: newId }),
    ]);

    setTitle("");
    setAmount("");

    router.back();
  };

  return (
    <View className="p-4 border-t border-gray-200, gap-y-4">
      <Stack.Screen options={{ title: "Add Transaction", headerShown: true, headerStyle: { backgroundColor: bucketColor } }} />
      <ExpenseOrIncomeSelector selectedType={type} onSelect={setType} />
      <TextInput
        className="border border-gray-300 rounded p-2"
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        autoFocus={true}
      />
      <TextInput
        className="border border-gray-300 rounded p-2"
        placeholder="Description"
        value={title}
        onChangeText={setTitle}
      />
      <Pressable
        className=" p-2 rounded-md justify-center items-center"
        style={{ backgroundColor: bucketColor }}
        onPress={addTransaction}
      >
        <Text className="text-white">Add</Text>
      </Pressable>
    </View>
  );
}

function ExpenseOrIncomeSelector(props: {
  selectedType: "expense" | "income";
  onSelect: (type: "expense" | "income") => void;
}) {
  return (
    <View className="flex-row justify-center space-x-4">
      <Pressable
        className={classNames("p-2 rounded-md", {
          "bg-red-500": props.selectedType === "expense",
        })}
        onPress={() => props.onSelect("expense")}
      >
        <Text
          className={
            props.selectedType === "expense" ? "text-white" : "text-gray-500"
          }
        >
          Expense
        </Text>
      </Pressable>
      <Pressable
        className={classNames("p-2 rounded-md", {
          "bg-green-500": props.selectedType === "income",
        })}
        onPress={() => props.onSelect("income")}
      >
        <Text
          className={
            props.selectedType === "income" ? "text-white" : "text-gray-500"
          }
        >
          Income
        </Text>
      </Pressable>
    </View>
  );
}
