import { IconHeaderButton } from "@/components/IconHeaderButton";
import { ListItemSeparator } from "@/components/ListItemSeparator";
import { LoadingWrapper } from "@/components/LoadingWrapper";
import colors from "@/constants/colors";
import { useProfilesQuery } from "@/db/queries";
import { Link, Stack, useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

export default function ProfilesScreen() {
  const { data, isLoading, error } = useProfilesQuery();

  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Profiles",
          headerStyle: { backgroundColor: colors.tint },
          headerShown: true,
          headerRight: () => (
            <IconHeaderButton
              icon="plus"
              onPress={() => {
                router.navigate(`/(logged-in)/(tabs)/settings/profiles/add`);
              }}
            />
          ),
        }}
      />
      <LoadingWrapper isLoading={isLoading} error={error}>
        <FlatList
          data={data?.profiles || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProfileItem profile={item} />}
          ItemSeparatorComponent={() => <ListItemSeparator />}
          ListHeaderComponent={() => (
            <View className="p-4">
              <Text className="text-sm text-gray-500">
                Add profiles to customize the experience for different user
                views.
              </Text>
            </View>
          )}
        />
      </LoadingWrapper>
    </>
  );
}

function ProfileItem(props: { profile: { id: string; name: string } }) {
  return (
    <Link
      href={`/(logged-in)/(tabs)/settings/profiles/${props.profile.id}`}
      asChild
    >
      <Pressable>
        <View className="p-4">
          <Text className="text-lg font-semibold">{props.profile.name}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
