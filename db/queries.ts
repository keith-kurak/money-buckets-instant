import { db } from "./index";
import { useLocalContext } from "./store";

export function useBucketsQuery() {
  const { data, isLoading, error } = db.useQuery({
    buckets: {
      transactions: {},
    },
  });

  return { data, isLoading, error };
}

export function useBucketQuery(bucketId: string) {
  const { data, isLoading, error } = db.useQuery({
    buckets: {
      $: {
        where: { id: bucketId },
      },
      transactions: {
        profile: {},
      },
    },
  });

  const bucket = data?.buckets?.[0];

  return { isLoading, error, bucket };
}

export function useCurrentGroupQuery() {
  const currentGroupId = useLocalContext().currentGroupId;
  const { data, isLoading, error } = db.useQuery({
    groups: {
      $: {
        where: { id: currentGroupId || 'noid' },
      },
      profiles: {}
    },
  });

  const group = data?.groups?.[0];

  return { isLoading, error, group };
}

export function useCurrentProfileQuery() {
  const currentProfileId = useLocalContext().currentProfileId;
  console.log("Current profile ID:", currentProfileId);
  const { data, isLoading, error } = db.useQuery({
    profiles: {
      $: {
        where: { id: currentProfileId || 'noid' },
      },
    },
  });
  console.log("Profiles data:", data);

  const profile = data?.profiles?.[0];

  return { isLoading, error, profile };
}

export function useProfilesQuery() {
  const { data, isLoading, error } = db.useQuery({
    profiles: {},
  });

  return { data, isLoading, error };
}

export function useProfileQuery(profileId: string) {
  const { data, isLoading, error } = db.useQuery({
    profiles: {
      $: {
        where: { id: profileId },
      },
    },
  });

  const profile = data?.profiles?.[0];

  return { isLoading, error, profile };
}