import { FormSubmitButton } from "@/components/forms/FormSubmitButton";
import { FormTextInput } from "@/components/forms/FormTextInput";
import { LoadingWrapper } from "@/components/LoadingWrapper";
import { useUpdateGroupMutation } from "@/db/mutations";
import { useCurrentGroupQuery } from "@/db/queries";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function EditCurrentGroupScreen() {
  const { group, isLoading, error } = useCurrentGroupQuery();

  const { updateGroup } = useUpdateGroupMutation();
  const router = useRouter();

  if (!group) {
    return null;
  }

  return (
    <GroupForm
      group={group || undefined}
      isLoading={isLoading}
      error={error}
      onSave={async (name) => {
        await updateGroup(group.id, name);
        router.back();
      }}
    />
  );
}

function GroupForm(props: {
  group?: { id: string; title: string } | undefined;
  isLoading: boolean;
  error?: { message: string } | undefined;
  onSave: (name: string) => void;
}) {
  const { group, isLoading, error } = props;

  const [title, setTitle] = useState(group ? group.title : "");

  return (
    <>
      <Stack.Screen
        options={{
          title: "Edit Budget",
          headerShown: true,
        }}
      />
      <LoadingWrapper isLoading={isLoading} error={error}>
        <View className="p-4 gap-y-4">
          <FormTextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            placeholder="Budget title"
            autoFocus
          />
          <FormSubmitButton
            title={"Update Budget"}
            isLoading={isLoading}
            onPress={() => props.onSave(title)}
          />
        </View>
      </LoadingWrapper>
    </>
  );
}
