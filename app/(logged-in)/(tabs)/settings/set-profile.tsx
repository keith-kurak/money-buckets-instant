import { FormSubmitButton } from "@/components/forms/FormSubmitButton";
import { ListItemSeparator } from "@/components/ListItemSeparator";
import { LoadingWrapper } from "@/components/LoadingWrapper";
import colors from "@/constants/colors";
import { useProfilesQuery } from "@/db/queries";
import { useLocalContext } from "@/db/store";
import { AntDesign } from "@expo/vector-icons";
import classNames from "classnames";
import { Stack } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

export default function SetProfileScreen() {
  const { data, isLoading, error } = useProfilesQuery();

  const { currentProfileId, setCurrentProfileId, clearCurrentProfileId } =
    useLocalContext();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Profiles",
          headerStyle: { backgroundColor: colors.tint },
          headerShown: true,
        }}
      />
      <LoadingWrapper isLoading={isLoading} error={error}>
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
          ListHeaderComponent={() => (
            <View className="p-4">
              <Text className="text-sm text-gray-500">
                When a profile is set, all transactions will be recorded with that profile&apos;s name, and the user interface will adapt to whatever that profile is allowed to do.
              </Text>
            </View>
          )}
          ListFooterComponent={() =>
            currentProfileId ? (
              <FormSubmitButton
                className="m-4 w-auto"
                isLoading={false}
                title="Unset Profile"
                onPress={() => {
                  clearCurrentProfileId();
                }}
              />
            ) : null
          }
        />
      </LoadingWrapper>
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
      <View className={classNames("p-4 flex-row justify-between items-center")}>
        <Text className={classNames("text-lg font-semibold")}>
          {props.profile.name}
        </Text>
        {props.isSelected && (
          <AntDesign name="check" size={24} color={colors.tint} />
        )}
      </View>
    </Pressable>
  );
}
