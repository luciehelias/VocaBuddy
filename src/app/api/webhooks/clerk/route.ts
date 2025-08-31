import { User } from "@/models/User";
import { connectToDatabase } from "@/lib/dbconnect";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req, {
      signingSecret: process.env.CLERK_WEBHOOK_SIGNING_SECRET!,
    });
    const { id, username, profile_image_url } = event.data as any;

    if (event.type === "user.created") {
      await connectToDatabase();
      const newUser = await User.create({
        clerkId: id,
        username: username ?? `user_${id.slice(-6)}`,
        avatarUrl: profile_image_url,
      });
      console.log("✅ User created in DB:", newUser._id);
    }
    if (event.type === "user.updated") {
      await connectToDatabase();
      const updatedUser = await User.findOneAndUpdate(
        { clerkId: id },
        {
          username: username ?? `user_${id.slice(-6)}`,
          avatarUrl: profile_image_url,
        },
        { new: true }
      );
      console.log("✅ User updated in DB:", updatedUser?._id);
    }
    if (event.type === "user.deleted") {
      await connectToDatabase();
      await User.findOneAndDelete({ clerkId: id });
      console.log("✅ User deleted from DB:", id);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("❌ Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
