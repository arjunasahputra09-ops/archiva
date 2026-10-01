"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAdmin } from "@/lib/auth";
export async function hapusPesan(formData) {
  const { supabase, isAdmin } = await getAdmin();
  if (!isAdmin) redirect("/");
  await supabase.from("messages").delete().eq("id", formData.get("id"));
  revalidatePath("/dashboard/pesan");
}
