import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbconnect";
import { User } from "@/models/User";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

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
    const { targetLanguage, nativeLanguage, avatarUrl } = body;

    await connectToDatabase();

    const user = await User.findOne({ clerkId: clerkUser.id });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (targetLanguage && Array.isArray(targetLanguage)) {
      user.targetLanguage = Array.from(
        new Set([...(user.targetLanguage || []), ...targetLanguage])
      );
    }

    if (nativeLanguage) user.nativeLanguage = nativeLanguage;
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
