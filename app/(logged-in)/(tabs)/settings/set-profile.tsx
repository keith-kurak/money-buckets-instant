import { ListItemSeparator } from "@/components/ListItemSeparator";
import colors from "@/constants/colors";
import { useProfilesQuery } from "@/db/queries";
import { useLocalContext } from "@/db/store";
import classNames from "classnames";
import { Stack } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

export default function SetProfileScreen() {
  const { data, isLoading, error } = useProfilesQuery();

  const { currentProfileId, setCurrentProfileId } = useLocalContext();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Profiles",
          headerStyle: { backgroundColor: colors.tint },
          headerShown: true,
        }}
      />
      <FlatList
        data={data?.profiles || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProfileItem
            profile={item}
            onPress={() => setCurrentProfileId(item.id)}
            isSelected={currentProfileId === item.id}
          />
        )}
        ItemSeparatorComponent={() => <ListItemSeparator />}
      />
    </>
  );
}

function ProfileItem(props: {
  profile: { id: string; name: string };
  onPress: () => void;
  isSelected?: boolean;
}) {
  return (
    <Pressable onPress={props.onPress}>
      <View
        className={classNames("p-4 flex-row justify-between items-center", {
          "bg-tint": props.isSelected,
        })}
      >
        <Text
          className={classNames("text-lg font-semibold", {
            "color-white": props.isSelected,
          })}
        >
          {props.profile.name}
        </Text>
      </View>
    </Pressable>
  );
}
