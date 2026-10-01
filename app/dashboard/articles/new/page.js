import { getAdmin } from "@/lib/auth";
import ArticleForm from "@/components/ArticleForm";
export default async function NewArticle({ searchParams }) {
  const { error } = await searchParams;
  const { supabase } = await getAdmin();
  const { data: kategori } = await supabase.from("article_categories").select("id,name").order("id");
  return (<><h1>Tambah Artikel</h1><ArticleForm kategori={kategori ?? []} error={error} /></>);
}
