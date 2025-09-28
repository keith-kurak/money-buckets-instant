import colors from "@/constants/colors";
import { db } from "@/db";
import { formatCurrency } from "@/lib/utils";
import classNames from "classnames";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { sortBy } from "lodash";
import {
  FlatList,
  Pressable,
  Text,
  View
} from "react-native";

export default function Transactions() {
  const { bucketId } = useLocalSearchParams();

  const query = {
    transactions: {
      bucket: {},
    },
  };

  const router = useRouter();

  const { data, isLoading, error } = db.useQuery(query);

  const myData = sortBy(data?.transactions || [], (t) => t.createdAt).reverse();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Transactions",
          headerStyle: { backgroundColor: colors.tint },
          headerShown: false,
        }}
      />
      <FlatList
        data={myData}
        renderItem={({ item }) => <TransactionView transaction={item} />}
      />
    </>
  );
}

function TransactionView(props: {
  transaction: {
    title: string;
    amount: number;
    date: string | number;
    bucket: { color: string; title: string; id: string } | undefined;
  };
}) {
  const { title, amount, date, bucket } = props.transaction;

  return (
    <Link
      href={`/buckets/${bucket ? bucket.id : ""}`}
      asChild
    >
      <Pressable>
        <View
          className={classNames(
            "p-4 border-b border-gray-200 flex-row justify-between items-center"
          )}
        >
          <View>
            <Text className="text-lg">{title}</Text>
            <Text className="text-gray-500">
              {new Date(date).toLocaleDateString()}
            </Text>
            <Text className="text-sm" style={{ color: bucket?.color }}>
              {bucket?.title}
            </Text>
          </View>
          <Text className="text-2xl">{formatCurrency(amount)}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
