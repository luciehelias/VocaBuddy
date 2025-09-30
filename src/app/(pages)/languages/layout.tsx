import { getUser } from "@/utils/getUser";
import LanguagesPage from "./page";
import { redirect } from "next/navigation";

export default async function languagesLayout() {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  return <LanguagesPage user={user} />;
}
