import { FormTextInput } from "@/components/forms/FormTextInput";
import { LoadingWrapper } from "@/components/LoadingWrapper";
import colors from "@/constants/colors";
import {
  MutationResult,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
} from "@/db/mutations";
import { useBucketQuery, useTransactionQuery } from "@/db/queries";
import { formatCurrency } from "@/lib/utils";
import classNames from "classnames";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function AddOrEditTransactionScreen() {
  const { transactionId } = useLocalSearchParams();

  const isEdit = transactionId !== "add";

  return isEdit ? (
    <EditTransactionScreen transactionId={transactionId as string} />
  ) : (
    <AddTransactionScreen />
  );
}

function AddTransactionScreen() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"expense" | "income">("expense");
  const [mutationResult, setMutationResult] = useState<MutationResult | null>(
    null
  );

  const { bucketId } = useLocalSearchParams();
  const router = useRouter();

  const { bucket, isLoading, error } = useBucketQuery(bucketId as string)

  const bucketColor = bucket?.color || colors.tint;

  const { createTransactionWithValidation } = useCreateTransactionMutation();

  const addTransaction = () => {
    const result = createTransactionWithValidation(
      title,
      amount,
      type,
      bucketId as string
    );
    setMutationResult(result);
    if (!result.success) {
      return;
    }

    setTitle("");
    setAmount("");

    router.back();
  };

  return (
    <LoadingWrapper isLoading={isLoading} error={error}>
      <View className="p-4 border-t border-gray-200, gap-y-4">
        <Stack.Screen
          options={{
            title: "Add Transaction",
            headerShown: true,
            headerStyle: { backgroundColor: bucketColor },
          }}
        />
        <ExpenseOrIncomeSelector selectedType={type} onSelect={setType} />
        <FormTextInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          label="Amount"
          autoFocus
          hasValidationError={mutationResult?.errorField === "amount"}
        />
        <FormTextInput
          placeholder="Description"
          value={title}
          onChangeText={setTitle}
          label="Description"
          hasValidationError={mutationResult?.errorField === "title"}
        />
        <Pressable
          className=" p-2 rounded-md justify-center items-center"
          style={{ backgroundColor: bucketColor }}
          onPress={addTransaction}
        >
          <Text className="text-white">Add</Text>
        </Pressable>
        <Text className="text-red-500">{mutationResult?.errorMessage}</Text>
      </View>
    </LoadingWrapper>
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

function EditTransactionScreen(props: { transactionId: string }) {
  const { transactionId } = props;
  const router = useRouter();

  const { transaction, isLoading, error } = useTransactionQuery(transactionId);

  const bucketColor = transaction?.bucket?.color || colors.tint;

  const { deleteTransaction } = useDeleteTransactionMutation();

  const onPressDelete = () => {
    deleteTransaction(transactionId);
    router.back();
  };

  return (
    <View className="p-4 border-t border-gray-200, gap-y-4">
      <Stack.Screen
        options={{
          title: "Transaction",
          headerShown: true,
          headerStyle: { backgroundColor: bucketColor },
        }}
      />
      <Text className="border border-gray-300 rounded p-2">
        {transaction?.title}
      </Text>
      <Text className="border border-gray-300 rounded p-2">
        {formatCurrency(transaction?.amount || 0)}
      </Text>
      <Pressable
        className=" p-2 rounded-md justify-center items-center bg-red-700"
        onPress={onPressDelete}
      >
        <Text className="text-white">Delete</Text>
      </Pressable>
    </View>
  );
}
