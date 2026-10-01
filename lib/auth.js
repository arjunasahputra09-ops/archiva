import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Mengambil user login beserta status admin. Redirect ke /signin jika belum login.
export async function getAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/signin");
  const { data: profil } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  return { supabase, user, isAdmin: profil?.role === "admin" };
}
