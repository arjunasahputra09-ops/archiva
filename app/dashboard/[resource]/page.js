import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import { RESOURCES, gambarField } from "@/lib/resources";
import { deleteItem } from "./actions";
import DeleteButton from "@/components/DeleteButton";

export default async function ResourceList({ params, searchParams }) {
  const { resource } = await params;
  const cfg = RESOURCES[resource];
  if (!cfg) notFound();
  const { error } = await searchParams;
  const { supabase, isAdmin } = await getAdmin();
  const { data } = await supabase.from(cfg.table).select("*").order("created_at", { ascending: false });
  const gambar = gambarField(cfg);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">{cfg.label}</h1>
        {isAdmin && <Link href={`/dashboard/${resource}/new`} className="btn btn-success">Tambah {cfg.label.toLowerCase()}</Link>}
      </div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!isAdmin && <div className="alert alert-warning">Akunmu berperan user. Hanya admin yang bisa menambah, mengubah, atau menghapus data.</div>}
      <div className="table-responsive">
        <table className="table align-middle bg-white">
          <thead><tr><th style={{ width: 90 }}></th><th>Nama</th>{cfg.tanggal && <th>Tanggal</th>}<th></th></tr></thead>
          <tbody>
            {(data ?? []).length === 0 && <tr><td colSpan={4} className="text-secondary">Belum ada data.</td></tr>}
            {(data ?? []).map((r) => (
              <tr key={r.id}>
                <td>{r[gambar] && <img src={r[gambar]} alt="" style={{ width: 64, height: 48, objectFit: "cover" }} className="rounded" />}</td>
                <td>{r[cfg.judul] || <span className="text-secondary">(tanpa judul)</span>}</td>
                {cfg.tanggal && <td>{r[cfg.tanggal] ? new Date(r[cfg.tanggal]).toLocaleDateString("id-ID") : "-"}</td>}
                <td className="text-end text-nowrap">
                  {isAdmin && (<>
                    <Link href={`/dashboard/${resource}/${r.id}/edit`} className="btn btn-sm btn-outline-primary me-1">Edit</Link>
                    <form action={deleteItem} className="d-inline">
                      <input type="hidden" name="resource" value={resource} /><input type="hidden" name="id" value={r.id} /><DeleteButton />
                    </form>
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
