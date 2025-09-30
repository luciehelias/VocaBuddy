"use server";

import { connectToDatabase } from "@/lib/dbconnect";
import { User } from "@/models/User";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function updateUserLanguage(
  languageCode: string,
  isNative: boolean = false
) {
  if (!languageCode) return;
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findOne({ clerkId: clerkUser.id });
    if (!user) {
      return { error: "User not found" };
    }

    if (isNative) {
      user.nativeLanguage = languageCode;
    } else {
      if (!user.targetLanguages?.includes(languageCode)) {
        user.targetLanguages?.push(languageCode);
      }
    }

    await user.save();
    revalidatePath("/languages");
  } catch (error) {
    console.error(error);
    return { error: "Failed to update user" };
  }
}
