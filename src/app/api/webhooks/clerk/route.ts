import { User } from "@/app/models/User";
import { connectToDatabase } from "@/lib/dbconnect";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req, {
      signingSecret: process.env.CLERK_WEBHOOK_SIGNING_SECRET!,
    });
    const { id, username, profile_image_url } =
      evt.data as any;

    if (evt.type === "user.created") {
      await connectToDatabase();

      const newUser = await User.create({
        clerkId: id,
        username: username ?? `user_${id.slice(-6)}`,
        avatarUrl: profile_image_url,
        nativeLanguage: "FR",
      });

      console.log("✅ User created in DB:", newUser._id);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("❌ Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
