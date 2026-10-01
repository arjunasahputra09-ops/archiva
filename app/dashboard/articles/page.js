import Link from "next/link";
import { getAdmin } from "@/lib/auth";
import { deleteArticle } from "./actions";
import DeleteButton from "@/components/DeleteButton";

export const metadata = { title: "Kelola Artikel - Archiva Digital Solutions" };

export default async function ArticlesAdmin({ searchParams }) {
  const { error } = await searchParams;
  const { supabase, isAdmin } = await getAdmin();
  const { data: daftar } = await supabase
    .from("articles").select("id,title,created_at,article_categories(name)").order("created_at", { ascending: false });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Artikel</h1>
        {isAdmin && <Link href="/dashboard/articles/new" className="btn btn-success">Tambah artikel</Link>}
      </div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!isAdmin && <div className="alert alert-warning">Akunmu berperan user. Hanya admin yang bisa menambah, mengubah, atau menghapus artikel.</div>}
      <div className="table-responsive">
        <table className="table align-middle">
          <thead><tr><th>Judul</th><th>Kategori</th><th>Dibuat</th><th></th></tr></thead>
          <tbody>
            {(daftar ?? []).length === 0 && <tr><td colSpan={4} className="text-secondary">Belum ada artikel. Klik Tambah artikel untuk membuat yang pertama.</td></tr>}
            {(daftar ?? []).map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.article_categories?.name}</td>
                <td>{new Date(a.created_at).toLocaleDateString("id-ID")}</td>
                <td className="text-end text-nowrap">
                  {isAdmin && (<>
                    <Link href={`/dashboard/articles/${a.id}/edit`} className="btn btn-sm btn-outline-primary me-1">Edit</Link>
                    <form action={deleteArticle} className="d-inline"><input type="hidden" name="id" value={a.id} /><DeleteButton /></form>
                  </>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
