import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbconnect";
import { User } from "@/models/User"

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
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
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
