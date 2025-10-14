import { IconHeaderButton } from "@/components/IconHeaderButton";
import { ListItemSeparator } from "@/components/ListItemSeparator";
import colors from "@/constants/colors";
import { useBucketQuery } from "@/db/queries";
import { amountsToBalance, formatCurrency } from "@/lib/utils";
import classNames from "classnames";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { sortBy } from "lodash";
import { FlatList, Pressable, Text, View } from "react-native";

export default function Transactions() {
  const { bucketId } = useLocalSearchParams();

  const router = useRouter();

  const { bucket, isLoading, error } = useBucketQuery(bucketId as string);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading bucket</Text>;

  const bucketColor = bucket?.color || colors.tint;

  const myData = sortBy(
    bucket?.transactions || [],
    (t) => t.createdAt
  ).reverse();

  const bucketBalance = amountsToBalance(myData);

  return (
    <>
      <Stack.Screen
        options={{
          title: bucket?.title || "",
          headerStyle: { backgroundColor: bucketColor },
          headerShown: true,
          headerRight: () => (
            <IconHeaderButton
              icon="plus"
              onPress={() => {
                router.navigate(`/buckets/${bucketId}/add`);
              }}
            />
          ),
        }}
      />
      <FlatList
        data={myData}
        contentContainerClassName=""
        renderItem={({ item }) => (
          <TransactionView transaction={item} bucketId={bucketId as string} />
        )}
        ItemSeparatorComponent={() => <ListItemSeparator />}
        ListHeaderComponent={() => (
          <View className="py-4 px-4 justify-center items-center">
            <Text
              className="text-5xl font-bold"
              style={{ color: bucketColor }}
            >
              {formatCurrency(bucketBalance)}
            </Text>
          </View>
        )}
      />
    </>
  );
}

function TransactionView(props: {
  transaction: {
    id: string;
    title: string;
    amount: number;
    date: string | number;
    profile?: { id: string; name: string } | undefined;
  };
  bucketId: string;
}) {
  const { title, amount, date, profile, id } = props.transaction;

  return (
    <Link href={`/buckets/${props.bucketId}/${id}`} asChild>
      <Pressable>
        <View
          className={classNames(
            "p-4 border-b border-gray-200 flex-row justify-between items-center",
          )}
        >
          <View>
            <Text className="text-lg">{title}</Text>
            <Text className="text-gray-500">
              {new Date(date).toLocaleDateString()}
            </Text>
            {profile && (
              <Text className="text-xs text-gray-500">{profile.name}</Text>
            )}
          </View>
          <Text className={classNames("text-2xl", {
            "text-red-500": amount < 0,
            "text-green-500": amount >= 0,
          })}>
            {formatCurrency(amount)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
