import type { InstantRules } from '@instantdb/react-native';

const rules = {
  "groups": {
    "allow": {
      "$default": "auth.id in data.ref('owner.id')",
      "create": "auth.id != null",
    },
  },
  "buckets": {
    "allow": {
      "$default": "auth.id in data.ref('group.owner.id')",
    },
  },
  "profiles": {
    "allow": {
      "$default": "auth.id in data.ref('group.owner.id')",
    },
  },
  "transactions": {
    "allow": {
      "$default": "auth.id in data.ref('bucket.group.owner.id')",
    },
  },
} satisfies InstantRules;

export default rules;