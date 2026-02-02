import { DataStore } from "@aws-amplify/datastore";
import { LearningHistory, Dog } from "../models";

// 学習タスク完了時に呼ぶ関数
export async function saveLearningHistory(
  userId: string,
  taskId: string,
  correct: boolean,
  score: number,
  dogState: Record<string, any>
) {
  const record: LearningHistory = {
    userId,
    taskId,
    correct,
    score: String(score),
    timestamp: String(Date.now()),
    dogState: JSON.stringify(dogState),
  };

  // DataStore.save に plain object を渡す
  await DataStore.save(record as any);
}

// 犬の状態更新
export async function saveDogState(
  userId: string,
  dogInfo: Partial<Dog> // 必須フィールドは後で埋める
) {
  const record: Dog = {
    userId,
    breed: dogInfo.breed ?? "",
    size: dogInfo.size ?? "",
    color: dogInfo.color ?? "",
    state: dogInfo.state ?? "",
    skills: dogInfo.skills ?? "",
    decorations: dogInfo.decorations ?? "",
    lastUpdated: String(Date.now()),
  };

  await DataStore.save(record as any);
}

// 学習履歴を取得する関数
export async function fetchLearningHistory(userId: string) {
  const items = await DataStore.query(LearningHistory, (h: any) =>
    h.userId("eq", userId)
  );

  return (items ?? []).map((item: LearningHistory) => ({
    ...item,
    score: Number(item.score),
    timestamp: new Date(Number(item.timestamp)),
    dogState: JSON.parse(item.dogState),
  }));
}
