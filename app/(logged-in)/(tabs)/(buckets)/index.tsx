import { IconHeaderButton } from "@/components/IconHeaderButton";
import { ListItemSeparator } from "@/components/ListItemSeparator";
import { LoadingWrapper } from "@/components/LoadingWrapper";
import { useBucketsQuery, useCurrentGroupQuery } from "@/db/queries";
import { amountsToBalance, formatCurrency } from "@/lib/utils";
import { Link, Stack, useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { top } = useSafeAreaInsets();

  const { group } = useCurrentGroupQuery();

  const { data, isLoading, error } = useBucketsQuery();

  const router = useRouter();

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
      <Stack.Screen
        options={{
          title: group?.title || "Buckets",
          headerRight: () => (
            <IconHeaderButton
              icon="plus"
              onPress={() => {
                router.navigate(`/buckets/add`);
              }}
            />
          ),
        }}
      />
      <LoadingWrapper isLoading={isLoading} error={error}>
        <FlatList
          data={data?.buckets || []}
          renderItem={({ item }) => (
            <BucketView
              bucket={item}
              balance={amountsToBalance(item.transactions)}
            />
          )}
          ItemSeparatorComponent={() => <ListItemSeparator />}
        />
      </LoadingWrapper>
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
        <View className="p-4 flex-row justify-between items-center">
          <View className="flex-row items-center justify-start">
            <View
              style={{ backgroundColor: color }}
              className="w-3 h-3 rounded-full mr-4"
            />
            <Text style={{ color: color }} className="text-xl">
              {title}
            </Text>
          </View>
          <Text className="text-2xl color-black">
            {formatCurrency(props.balance)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
