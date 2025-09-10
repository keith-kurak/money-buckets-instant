import type { InstantRules } from '@instantdb/react-native';

const rules = {
  "buckets": {
    "allow": {
      "$default": "auth.id in data.ref('owner.id')",
      "create": "auth.id != null",
    },
  },
  "transactions": {
    "allow": {
      "$default": "auth.id in data.ref('bucket.owner.id')",
    },
  },
} satisfies InstantRules;

export default rules;