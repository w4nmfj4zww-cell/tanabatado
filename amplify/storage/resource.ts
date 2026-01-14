import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'tanabatadoStorage',
  access: (allow) => ({
    'product-images/*': [
      allow.guest.to(['read', 'write', 'delete']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
  })
});
