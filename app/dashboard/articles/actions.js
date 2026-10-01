"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAdmin } from "@/lib/auth";

const BUCKET = "article-images";
const slugify = (s) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export async function saveArticle(formData) {
  const { supabase, isAdmin } = await getAdmin();
  if (!isAdmin) redirect("/dashboard/articles?error=" + encodeURIComponent("Hanya admin yang boleh mengubah artikel."));

  const id = formData.get("id");
  const back = id ? `/dashboard/articles/${id}/edit` : "/dashboard/articles/new";
  const fail = (m) => redirect(`${back}?error=${encodeURIComponent(m)}`);

  const title = String(formData.get("title") || "").trim();
  const category_id = Number(formData.get("category_id"));
  const content = String(formData.get("content") || "").trim();
  if (!title || !category_id || !content) fail("Judul, kategori, dan isi wajib diisi.");

  let image = formData.get("image_lama") || null;
  const file = formData.get("image");
  if (file && file.size > 0) {
    if (!file.type.startsWith("image/")) fail("File harus berupa gambar.");
    if (file.size > 4 * 1024 * 1024) fail("Ukuran gambar maksimal 4 MB.");
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type });
    if (error) fail("Upload gagal: " + error.message);
    image = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  }

  const row = { title, category_id, content, image, updated_at: new Date().toISOString() };
  const { error } = id
    ? await supabase.from("articles").update(row).eq("id", id)
    : await supabase.from("articles").insert({ ...row, slug: `${slugify(title)}-${Date.now().toString(36)}` });
  if (error) fail("Gagal menyimpan: " + error.message);

  revalidatePath("/", "layout");
  redirect("/dashboard/articles");
}

export async function deleteArticle(formData) {
  const { supabase, isAdmin } = await getAdmin();
  if (!isAdmin) redirect("/dashboard/articles?error=" + encodeURIComponent("Hanya admin yang boleh menghapus artikel."));
  const { error } = await supabase.from("articles").delete().eq("id", formData.get("id"));
  if (error) redirect("/dashboard/articles?error=" + encodeURIComponent("Gagal menghapus: " + error.message));
  revalidatePath("/", "layout");
  redirect("/dashboard/articles");
}
