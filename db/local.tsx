import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage, RESET } from "jotai/utils";

const storage = createJSONStorage(() => AsyncStorage);
const userProfile = atomWithStorage<any>("user-profile", undefined, storage);

export function useUserProfile() {
  const [profile, setProfile] = useAtom(userProfile);

  const saveProfile = (newProfile: any) => {
    setProfile(newProfile);
  };

  const clearProfile = () => {
    setProfile(RESET);
  };

  return {
    profile,
    saveProfile,
    clearProfile,
  };
}