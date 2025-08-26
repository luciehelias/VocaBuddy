import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbconnect";
import { Flashcard } from "@/models/Flashcard";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    const flashcards = await Flashcard.find({});
    return NextResponse.json(flashcards);
  } catch (error) {
    console.error("Failed to fetch flashcards:", error);
    return NextResponse.json(
      { error: "Failed to fetch flashcards" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Not logged in");

  try {
    await connectToDatabase();
    // Find your MongoDB user by clerkId
    const dbUser = await User.findOne({ clerkId: clerkUser.id });
    if (!dbUser) throw new Error("User not found in DB");

    const body = await request.json();
    body.userId = dbUser._id;;
    const flashcard = await Flashcard.create(body);
    return NextResponse.json(flashcard);
  } catch (error) {
    console.error("Failed to create flashcard:", error);
    return NextResponse.json(
      { error: "Failed to create flashcard" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...updateData } = await request.json();
    await connectToDatabase();
    const flashcard = await Flashcard.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!flashcard) {
      return NextResponse.json(
        { error: "Flashcard not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(flashcard);
  } catch (error) {
    console.error("Failed to update flashcard:", error);
    return NextResponse.json(
      { error: "Failed to update flashcard" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await connectToDatabase();
    const result = await Flashcard.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Flashcard not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    console.error("Failed to delete flashcard:", error);
    return NextResponse.json(
      { error: "Failed to delete flashcard" },
      { status: 500 }
    );
  }
}
