import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ArtikelList from "@/components/ArtikelList";
export default async function KategoriArtikel({ params }) {
  const { kategori: slug } = await params;
  const supabase = await createClient();
  const { data: k } = await supabase.from("article_categories").select("id,name").eq("slug", slug).maybeSingle();
  if (!k) notFound();
  const { data } = await supabase.from("articles")
    .select("id,title,image,content,created_at,article_categories(name,slug)").eq("category_id", k.id).order("created_at", { ascending: false });
  return <ArtikelList judul={`Artikel: ${k.name}`} daftar={data ?? []} />;
}
