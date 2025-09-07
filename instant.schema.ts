// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/react-native";

const _schema = i.schema({
  entities: {
    $users: i.entity({
      email: i.string().unique().indexed().optional(),
    }),
    buckets: i.entity({
      title: i.string(),
      color: i.string(),
      createdAt: i.date(),
    }),
    transactions: i.entity({
      title: i.string(),
      amount: i.number(),
      date: i.date(),
      createdAt: i.date(),
    }),
  },
  links: {
    transactionBucket: {
      forward: { on: 'transactions', has: 'one', label: 'bucket' },
      reverse: { on: 'buckets', has: 'many', label: 'transactions' },
    }
  }
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
