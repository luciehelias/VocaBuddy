import { getUser } from "@/utils/getUser";
import LanguagesPage from "./page";

export default async function languagesLayout() {
  const user = await getUser();

  if (!user) {
    // Handle the case where user is missing
    return <div>Error: User not found.</div>;
  }

  return <LanguagesPage user={user} />;
}
