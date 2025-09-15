import { observable } from '@legendapp/state';
import { observablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage';
import { use$ } from "@legendapp/state/react";
import { configureSynced, syncObservable } from '@legendapp/state/sync';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LocalContext {
  currentGroupId?: string;
  setCurrentGroupId: (groupId: string) => void;
  currentProfileId?: string;
  setCurrentProfileId?: (profileId: string) => void;
}

const localContext$ = observable<LocalContext>({
  currentGroupId: undefined,
  currentProfileId: undefined,
  setCurrentGroupId: (groupId: string)  =>{
    localContext$.currentGroupId.set(groupId);
  },
  setCurrentProfileId: (profileId: string) => {
    localContext$.currentProfileId.set(profileId);
  }
});

// Global configuration
const persistOptions = configureSynced({
    persist: {
        plugin: observablePersistAsyncStorage({
            AsyncStorage
        })
    },
});

syncObservable(
    localContext$,
    persistOptions({
        persist: {
            name: 'localContext',
        },
    }),
);

function useLocalContext() {
  return use$(localContext$);
}

export { localContext$, useLocalContext };
