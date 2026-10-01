"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAdmin } from "@/lib/auth";
import { RESOURCES } from "@/lib/resources";

const BUCKET = "article-images";

export async function saveItem(formData) {
  const { supabase, isAdmin } = await getAdmin();
  const key = String(formData.get("resource"));
  const cfg = RESOURCES[key];
  if (!cfg) redirect("/dashboard");
  const base = `/dashboard/${key}`;
  if (!isAdmin) redirect(`${base}?error=${encodeURIComponent("Hanya admin yang boleh mengubah data.")}`);

  const id = formData.get("id");
  const back = id ? `${base}/${id}/edit` : `${base}/new`;
  const fail = (m) => redirect(`${back}?error=${encodeURIComponent(m)}`);

  const row = {};
  for (const f of cfg.fields) {
    if (f.type === "image") {
      let url = formData.get(f.name + "_lama") || null;
      const file = formData.get(f.name);
      if (file && file.size > 0) {
        if (!file.type.startsWith("image/")) fail("File harus berupa gambar.");
        if (file.size > 4 * 1024 * 1024) fail("Ukuran gambar maksimal 4 MB.");
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${key}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type });
        if (error) fail("Upload gagal: " + error.message);
        url = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
      }
      if (f.required && !url) fail(`${f.label} wajib diisi.`);
      row[f.name] = url;
    } else {
      const v = String(formData.get(f.name) || "").trim();
      if (f.required && !v) fail(`${f.label} wajib diisi.`);
      row[f.name] = v || null;
    }
  }

  const { error } = id
    ? await supabase.from(cfg.table).update(row).eq("id", id)
    : await supabase.from(cfg.table).insert(row);
  if (error) fail("Gagal menyimpan: " + error.message);

  revalidatePath("/", "layout");
  redirect(base);
}

export async function deleteItem(formData) {
  const { supabase, isAdmin } = await getAdmin();
  const key = String(formData.get("resource"));
  const cfg = RESOURCES[key];
  if (!cfg) redirect("/dashboard");
  const base = `/dashboard/${key}`;
  if (!isAdmin) redirect(`${base}?error=${encodeURIComponent("Hanya admin yang boleh menghapus data.")}`);
  const { error } = await supabase.from(cfg.table).delete().eq("id", formData.get("id"));
  if (error) redirect(`${base}?error=${encodeURIComponent("Gagal menghapus: " + error.message)}`);
  revalidatePath("/", "layout");
  redirect(base);
}
