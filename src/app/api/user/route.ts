import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbconnect";
import { User } from "@/models/User";
import { getUserFromClerk } from "@/lib/getUserFromClerk";

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
    const user = await getUserFromClerk();

    const body = await request.json();
    const { language, isNative, avatarUrl } = body;

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
  } catch (error: any) {
    if (error.message === "Not authenticated") {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (error.message === "User not found") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
