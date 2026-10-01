"use server";
import { createClient } from "@/lib/supabase/server";

export async function kirimPesan(_prev, formData) {
  if (formData.get("website")) return { ok: true, pesan: "Pesan terkirim." }; // kolom jebakan untuk bot
  const name = String(formData.get("nama") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("pesan") || "").trim();
  if (!name || !email || !message) return { ok: false, pesan: "Nama, email, dan pesan wajib diisi." };
  if (name.length > 100 || email.length > 200 || message.length > 2000)
    return { ok: false, pesan: "Isi terlalu panjang. Pesan maksimal 2000 karakter." };
  const supabase = await createClient();
  const { error } = await supabase.from("messages").insert({ name, email, message });
  if (error) return { ok: false, pesan: "Pesan belum terkirim. Coba lagi beberapa saat lagi." };
  return { ok: true, pesan: "Pesan terkirim. Kami akan membalas lewat email." };
}
