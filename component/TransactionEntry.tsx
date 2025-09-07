import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export function TransactionEntry( props: {
  onAdd: (title: string, amount: number) => void;
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [ ]

  return (
    <>
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
        <Pressable
          className="bg-blue-500 rounded p-2"
          onPress={() => {
            props.onAdd(title, parseFloat(amount));
            setTitle("");
            setAmount("");
          }}
        >
          <Text className="text-white">Add</Text>
        </Pressable>
      </View>
    </>
  );

}