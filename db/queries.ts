import { db } from "./index";

export function useBucketsQuery() {
  const { data, isLoading, error } = db.useQuery({
    buckets: {
      transactions: {},
    },
  });

  return { data, isLoading, error };
}
