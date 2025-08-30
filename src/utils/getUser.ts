import { connectToDatabase } from "@/lib/dbconnect";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@/models/User";
import { Flashcard } from "@/models/Flashcard";
import { IUser } from "@/types/user";

export const getUser = async (): Promise<IUser | null> => {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  await connectToDatabase();

  // lean is used to convert Mongoose documents to plain JavaScript objects
  const user = await User.findOne({ clerkId: clerkUser.id }).lean();
  if (!user) return null;

  const userFlashcards = await Flashcard.find({ userId: user._id }).lean();

  const newUser = {
    ...user,
    id: user._id.toString(),
    createdAt: user.createdAt?.toISOString?.() ?? null,
    flashcards: userFlashcards,
  };
  return JSON.parse(JSON.stringify(newUser));
};
