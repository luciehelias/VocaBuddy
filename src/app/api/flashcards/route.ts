import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbconnect";
import { Flashcard } from "@/models/Flashcard";
import { getUserFromClerk } from "@/lib/getUserFromClerk";

// Get flashcards related to the current user
export async function GET() {
  try {
    const user = await getUserFromClerk();
    const flashcards = await Flashcard.find({ userId: user._id });
    return NextResponse.json({ user: user, flashcards });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch flashcards" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUserFromClerk();

    const body = await request.json();
    body.userId = user._id;
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
