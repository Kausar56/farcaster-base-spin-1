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
    return Response.json(
      { success: false, errors: requestBody.error.errors },
      { status: 429 }
    );
  }

  const allKeys = await getUsersNotificationDetails();

  const BATCH_SIZE = 100;

  for (let i = 0; i < allKeys.length; i += BATCH_SIZE) {
    const batch = allKeys.slice(i, i + BATCH_SIZE);
    const url = batch[0].url;
    const tokens = batch.map((u) => u.token);
    const notificationId = `broadcast-${Date.now()}`;

    const payload = {
      notificationId,
      title: requestBody.data.title,
      body: requestBody.data.body,
      targetUrl: `https://base-spin.vercel.app`,
      tokens,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 200) {
        const json = await res.json();
        console.log("Batch sent:", {
          successful: json.successfulTokens,
          invalid: json.invalidTokens,
          rateLimited: json.rateLimitedTokens,
        });
        // ৩. invalidTokens removed
        if (json.invalidTokens && json.invalidTokens.length) {
          await deleteUserNotificationDetails(json.invalidTokens);
        }
        return NextResponse.json({
          error: "Notification",
          success: true,
        });
      } else {
        console.error("Error sending batch:", await res.text());
        return NextResponse.json(
          {
            error: "Error sending batch:",
            success: false,
          },
          { status: 429 }
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return NextResponse.json(
        { error: "Notification not sent!", success: false },
        { status: 500 }
      );
    }
  }
}
