import { FormSubmitButton } from "@/components/forms/FormSubmitButton";
import { FormTextInput } from "@/components/forms/FormTextInput";
import { LoadingWrapper } from "@/components/LoadingWrapper";
import {
  useCreateProfileMutation,
  useUpdateProfileMutation,
} from "@/db/mutations";
import { useProfileQuery } from "@/db/queries";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function AddorEditProfileScreen() {
  const { profileId } = useLocalSearchParams();

  const isEdit = profileId !== "add";

  return isEdit ? (
    <EditProfileScreen profileId={profileId as string} />
  ) : (
    <AddProfileScreen />
  );
}

function EditProfileScreen(props: { profileId: string }) {
  const { profile, isLoading, error } = useProfileQuery(props.profileId);

  const { updateProfile } = useUpdateProfileMutation();
  const router = useRouter();

  if (!profile) {
    return null;
  }

  return (
    <ProfileForm
      profile={profile || undefined}
      isLoading={isLoading}
      error={error}
      onSave={async (name) => {
        await updateProfile(props.profileId, name);
        router.back();
      }}
    />
  );
}

function AddProfileScreen() {
  const { createProfile } = useCreateProfileMutation();
  const router = useRouter();

  return (
    <ProfileForm
      isLoading={false}
      onSave={async (name) => {
        await createProfile(name);
        router.back();
      }}
    />
  );
}

function ProfileForm(props: {
  profile?: { id: string; name: string } | undefined;
  isLoading: boolean;
  error?: { message: string } | undefined;
  onSave: (name: string) => void;
}) {
  const { profile, isLoading, error } = props;

  const [name, setName] = useState(profile ? profile.name : "");

  return (
    <>
      <Stack.Screen
        options={{
          title: profile ? "Edit Profile" : "Add Profile",
          headerShown: true,
        }}
      />
      <LoadingWrapper isLoading={isLoading} error={error}>
        <View className="p-4 gap-y-4">
          <FormTextInput
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Profile name"
            autoFocus
          />
          <FormSubmitButton
            title={profile ? "Update Profile" : "Create Profile"}
            isLoading={isLoading}
            onPress={() => props.onSave(name)}
          />
        </View>
      </LoadingWrapper>
    </>
  );
}
