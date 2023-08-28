import { getUser } from "@/app/action";
import Feed from "@/components/Feed";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await getUser();
  if (!currentUser) {
    redirect("/auth/signin");
  }
  return (
    <div>
      <Feed currentUser={currentUser} />
    </div>
  );
}
