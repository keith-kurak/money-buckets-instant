import { db, id } from "./index";
import { useLocalContext } from "./store";

export const useCreateBucketMutation = () => {
  const currentGroupId = useLocalContext().currentGroupId;

  const createBucket = (
    title: string,
    selectedColor: string,
    startingBalance: number | undefined
  ) => {
    const bucketId = id();
    const startingBalanceTransactionId = id();
    const transactions: any = [
      db.tx.buckets[bucketId]
        .create({
          title,
          color: selectedColor,
          createdAt: new Date(),
        })
        .link({ group: currentGroupId }),
    ];
    if (startingBalance && startingBalance !== 0) {
      transactions.push(
        db.tx.transactions[startingBalanceTransactionId].create({
          title: "Starting Balance",
          amount: startingBalance,
          date: new Date(),
          createdAt: new Date(),
        })
      );
      transactions.push(
        db.tx.buckets[bucketId].link({
          transactions: startingBalanceTransactionId,
        })
      );
    }
    db.transact(transactions);
  };

  return { createBucket };
};

export const useCreateGroupMutation = () => {
  const setCurrentGroupId = useLocalContext().setCurrentGroupId;
  const currentUser = db.useUser();

  const createGroup = (title: string) => {
    const groupId = id();
    db.transact([
      db.tx.groups[groupId].create({
        title,
      }),
      db.tx.groups[groupId].link({ owner: currentUser.id }),
    ]);
    setCurrentGroupId(groupId);
  };

  return { createGroup };
};

export const useCreateProfileMutation = () => {
  const currentGroupId = useLocalContext().currentGroupId;

  const createProfile = (name: string) => {
    const profileId = id();
    db.transact([
      db.tx.profiles[profileId].create({
        name,
      }),
      db.tx.profiles[profileId].link({ group: currentGroupId }),
    ]);
  };

  return { createProfile };
};

export const useUpdateProfileMutation = () => {
  const updateProfile = (profileId: string, name: string) => {
    db.transact([
      db.tx.profiles[profileId].update({
        name,
      }),
    ]);
  };

  return { updateProfile };
}