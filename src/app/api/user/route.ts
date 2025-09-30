import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbconnect";
import { User } from "@/models/User";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const user = await User.create(body);
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { language, isNative, avatarUrl } = body;

    await connectToDatabase();

    const user = await User.findOne({ clerkId: clerkUser.id });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (isNative) {
      user.nativeLanguage = language;
    } else {
      if (!user.targetLanguages?.includes(language)) {
        user.targetLanguages?.push(language);
      }
    }

    if (avatarUrl) user.avatarUrl = avatarUrl;

    await user.save();

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
