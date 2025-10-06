import colors from "@/constants/colors";
import { useBucketsQuery } from "@/db/queries";
import { amountsToBalance, formatCurrency } from "@/lib/utils";
import Entypo from "@expo/vector-icons/Entypo";
import { Link, Stack } from "expo-router";
import {
  FlatList,
  Pressable,
  Text,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { top } = useSafeAreaInsets();

  const { data, isLoading, error } = useBucketsQuery();

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
        <Link href="./buckets/add" asChild>
          <Pressable className="p-4">
            <Entypo name="plus" size={24} color={colors.tint} />
          </Pressable>
        </Link>
      </View>
      <FlatList
        data={data?.buckets || []}
        renderItem={({ item }) => <BucketView bucket={item} balance={amountsToBalance(item.transactions)} />}
      />
    </>
  );
}

function BucketView(props: {
  bucket: { title: string; color: string; id: string };
  balance: number;
}) {
  const { title, color } = props.bucket;

  return (
    <Link href={`/buckets/${props.bucket.id}`} asChild>
      <Pressable>
        <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
          <Text style={{ borderBottomWidth: 2, borderBottomColor: color }} className="text-xl">{title}</Text>
          <Text style={{ color }} className="text-2xl">{formatCurrency(props.balance)}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

