import { createClient } from "@/utils/supabase/server";
import ListPropertyForm from "./components/ListPropertyForm";
import { redirect } from "next/navigation";

export default async function ListPropertyPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold">List property</h1>
      <ListPropertyForm />
    </div>
  );
}
