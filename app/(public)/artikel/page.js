import { createClient } from "@/lib/supabase/server";
import ArtikelList from "@/components/ArtikelList";
export const metadata = { title: "Artikel - Archiva Digital Solutions" };
export default async function Artikel() {
  const supabase = await createClient();
  const { data } = await supabase.from("articles")
    .select("id,title,image,content,created_at,article_categories(name,slug)").order("created_at", { ascending: false });
  return <ArtikelList judul="Artikel" daftar={data ?? []} />;
}
