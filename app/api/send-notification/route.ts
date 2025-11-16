import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  deleteUserNotificationDetails,
  getUsersNotificationDetails,
} from "@/lib/kv";
import { APP_URL } from "@/lib/constants";

const requestSchema = z.object({
  title: z.string(),
  body: z.string(),
});

export async function POST(request: NextRequest) {
  const requestJson = await request.json();
  const requestBody = requestSchema.safeParse(requestJson);
  if (requestBody.success === false) {
    return NextResponse.json(
      { success: false, errors: requestBody.error.errors },
      { status: 400 } // Changed from 429
    );
  }

  const allKeys = await getUsersNotificationDetails();
  const BATCH_SIZE = 100;
  const notificationId = `broadcast-${Date.now()}`; // Single ID for all batches

  let totalSuccessful = 0;
  let totalInvalid = 0;
  let totalRateLimited = 0;

  for (let i = 0; i < allKeys.length; i += BATCH_SIZE) {
    const batch = allKeys.slice(i, i + BATCH_SIZE);
    const url = batch[0].url;
    const tokens = batch.map((u) => u.token);

    const payload = {
      notificationId,
      title: requestBody.data.title,
      body: requestBody.data.body,
      targetUrl: "https://base-spin.vercel.app", // Use your constant
      tokens,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 200) {
        const json = await res.json();
        // console.log(json);
        totalSuccessful += json.successfulTokens?.length || 0;
        totalInvalid += json.invalidTokens?.length || 0;
        totalRateLimited += json.rateLimitedTokens?.length || 0;

        if (json.invalidTokens?.length) {
          await deleteUserNotificationDetails(json.invalidTokens);
        }
      } else {
        console.error(`Batch ${i} error:`, await res.text());
      }
    } catch (error) {
      console.error(`Batch ${i} fetch error:`, error);
    }
  }

  console.log({
    successful: totalSuccessful,
    invalid: totalInvalid,
    rateLimited: totalRateLimited,
    totalBatches: Math.ceil(allKeys.length / BATCH_SIZE),
  });

  return NextResponse.json({
    success: true,
    results: {
      successful: totalSuccessful,
      invalid: totalInvalid,
      rateLimited: totalRateLimited,
      totalBatches: Math.ceil(allKeys.length / BATCH_SIZE),
    },
  });
}
