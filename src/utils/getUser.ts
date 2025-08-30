import { connectToDatabase } from "@/lib/dbconnect";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@/models/User";
import { IUser } from "@/types/user";

export const getUser = async (): Promise<IUser | null> => {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  await connectToDatabase();
  const user = await User.findOne({ clerkId: clerkUser.id }).lean();
  if (!user) return null;

  const newUser = {
    ...user,
    id: user._id.toString(),
    createdAt: user.createdAt?.toISOString?.() ?? null,
  };
  return JSON.parse(JSON.stringify(newUser));
};
