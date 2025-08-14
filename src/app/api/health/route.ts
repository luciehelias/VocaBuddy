import { NextResponse } from "next/server";
import { connectToDatabase, isDatabaseConnected } from "@/lib/dbconnect";

export async function GET() {
  try {
    await connectToDatabase();
    const connected = isDatabaseConnected();

    return NextResponse.json({
      status: connected ? "ok" : "error",
      message: connected
        ? "✅ Database is connected."
        : "❌ Database is NOT connected.",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "❌ Failed to connect to database.",
      error: (error as Error).message,
    });
  }
}
