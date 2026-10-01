import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DetailArtikel({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: a } = await supabase.from("articles")
    .select("id,title,image,content,created_at,article_categories(name,slug)").eq("id", id).maybeSingle();
  if (!a) notFound();
  return (
    <article className="detail">
      <p className="mb-1"><Link href={`/artikel/${a.article_categories?.slug ?? ""}`}>&larr; {a.article_categories?.name ?? "Artikel"}</Link></p>
      <h1>{a.title}</h1>
      <p className="text-secondary">{new Date(a.created_at).toLocaleDateString("id-ID", { dateStyle: "long" })}</p>
      {a.image && <img src={a.image} alt="" className="w-100 rounded mb-3" style={{ maxHeight: 420, objectFit: "cover" }} />}
      <div style={{ whiteSpace: "pre-line" }}>{a.content}</div>
    </article>
  );
}
