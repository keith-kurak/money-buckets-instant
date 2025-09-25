import { IconHeaderButton } from "@/components/IconHeaderButton";
import colors from "@/constants/colors";
import { useProfilesQuery } from "@/db/queries";
import { Stack, useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";

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
      <FlatList
        data={data?.profiles || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProfileItem profile={item} />}
      />
    </>
  );
}

function ProfileItem(props: { profile: { id: string; name: string } }) {
  return (
    <View>
      <Text>{props.profile.name}</Text>
    </View>
  );
}
