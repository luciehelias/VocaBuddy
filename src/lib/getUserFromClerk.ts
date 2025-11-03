import { currentUser } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/dbconnect";
import { User } from "@/models/User";

export async function getUserFromClerk() {
  await connectToDatabase();

  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Not authenticated");

  const user = await User.findOne({ clerkId: clerkUser.id });
  if (!user) throw new Error("User not found");

  return user;
}
