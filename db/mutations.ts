import { TransactionResult } from "@instantdb/core";
import { db, id } from "./index";
import { useLocalContext } from "./store";

export type MutationResult = {
  success: boolean;
  errorField?: string;
  errorMessage?: string;
  mutationResult?: TransactionResult | undefined; // TODO: maybe return transaction result, but it's async
}

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

export const useCreateTransactionMutation = () => {
  const { currentProfileId } = useLocalContext();

  const createTransactionWithValidation = (
    title: string,
    amount: string,
    type: "expense" | "income",
    bucketId: string
  ) : MutationResult => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      return { success: false, errorField: "amount", errorMessage: "Amount must be a valid number" }; 
    }
    if (title.trim() === "") {
      return { success: false, errorField: "title", errorMessage: "Title cannot be empty" };
    }
    createTransaction(title, parsedAmount * (type === "expense" ? -1 : 1), bucketId);
    return { success: true };
  }

  const createTransaction = (
    title: string,
    amount: number,
    bucketId: string
  ) => {
    const newId = id();
    const transactions = [
      db.tx.transactions[newId].create({
        title,
        amount,
        date: new Date(),
        createdAt: new Date(),
      }),
      db.tx.buckets[bucketId as string].link({ transactions: newId }),
    ];
    if (currentProfileId) {
      transactions.push(
        db.tx.transactions[newId].link({ profile: currentProfileId })
      );
    }
    db.transact(transactions);
  };  
  return { createTransaction, createTransactionWithValidation };
}

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

export const useUpdateGroupMutation = () => {
  const updateGroup = (groupId: string, title: string) => {
    db.transact([
      db.tx.groups[groupId].update({
        title,
      }),
    ]);
  };

  return { updateGroup };
}

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

export const useDeleteTransactionMutation = () => {
  const deleteTransaction = (transactionId: string) => {
    db.transact([db.tx.transactions[transactionId].delete()]);
  };

  return { deleteTransaction };
}