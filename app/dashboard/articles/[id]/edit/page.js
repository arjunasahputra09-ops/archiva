import { notFound } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import ArticleForm from "@/components/ArticleForm";
export default async function EditArticle({ params, searchParams }) {
  const { id } = await params;
  const { error } = await searchParams;
  const { supabase } = await getAdmin();
  const { data: artikel } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();
  if (!artikel) notFound();
  const { data: kategori } = await supabase.from("article_categories").select("id,name").order("id");
  return (<><h1>Edit Artikel</h1><ArticleForm kategori={kategori ?? []} artikel={artikel} error={error} /></>);
}
