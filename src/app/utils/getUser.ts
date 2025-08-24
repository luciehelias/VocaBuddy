import { connectToDatabase } from "@/lib/dbconnect";
import { currentUser } from "@clerk/nextjs/server";
import { IUser, IUserDataResponse } from "@/types/user";
import { User } from "@/models/User";

const serializeUser = (user: IUserDataResponse): IUser => {
  const newUser = {
    ...user,
    id: user._id.toString(),
    createdAt: user.createdAt?.toISOString?.() ?? null,
  };
  return JSON.parse(JSON.stringify(newUser));
};

export const getUser = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;
  
  await connectToDatabase();
  const user = await User.findOne({ clerkId: clerkUser.id });
  if (!user) return null;

  return serializeUser(user as IUserDataResponse);
};
