import { MiniAppNotificationDetails } from "@farcaster/miniapp-sdk";
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

function getUserNotificationDetailsKey(fid: number): string {
  return `${fid}`;
}

export async function getUserNotificationDetails(
  fid: number
): Promise<MiniAppNotificationDetails | null> {
  return await redis.get<MiniAppNotificationDetails>(
    getUserNotificationDetailsKey(fid)
  );
}
export async function getUsersNotificationDetails(): Promise<
  MiniAppNotificationDetails[] | []
> {
  let cursor = "0";
  const allUsers: MiniAppNotificationDetails[] = [];

  do {
    const [newCursor, keys] = await redis.scan(cursor, {
      match: "*",
      count: 1000,
    });
    cursor = newCursor;

    for (const key of keys) {
      const details = await redis.get<MiniAppNotificationDetails>(key);
      if (details) {
        allUsers.push(details);
      }
    }
  } while (cursor !== "0");

  return allUsers;
}

export async function setUserNotificationDetails(
  fid: number,
  notificationDetails: MiniAppNotificationDetails
): Promise<void> {
  await redis.set(getUserNotificationDetailsKey(fid), notificationDetails);
}

export async function deleteUserNotificationDetails(
  fid: number
): Promise<void> {
  await redis.del(getUserNotificationDetailsKey(fid));
}
