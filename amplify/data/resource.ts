import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  // 既存 Product
  Product: a
    .model({
      name: a.string(),
      description: a.string(),
      imageKey: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // 学習履歴
  LearningHistory: a
    .model({
      userId: a.string(),
      taskId: a.string(),
      correct: a.boolean(),
      score: a.string(),      // number の代わりに string にして保存
      timestamp: a.string(),  // number の代わりに string に
      dogState: a.string(),   // map の代わりに JSON.stringify して保存
    })
    .authorization((allow) => [allow.owner()]),

  // 犬テーブル
  Dog: a
    .model({
      userId: a.string(),
      breed: a.string(),
      size: a.string(),
      color: a.string(),
      state: a.string(),
      skills: a.string(),      // list の代わりに JSON.stringify した文字列
      decorations: a.string(), // list の代わりに JSON.stringify
      lastUpdated: a.string(), // number の代わりに string
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
