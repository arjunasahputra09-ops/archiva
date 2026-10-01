import { getAdmin } from "@/lib/auth";
import { hapusPesan } from "./actions";
import DeleteButton from "@/components/DeleteButton";
export const metadata = { title: "Pesan Masuk - Archiva Digital Solutions" };
export default async function Pesan() {
  const { supabase } = await getAdmin();
  const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
  return (<>
    <h1>Pesan Masuk</h1>
    {error && <div className="alert alert-warning">Tabel pesan belum dibuat. Jalankan <code>update-pesan.sql</code> di Supabase SQL Editor.</div>}
    {!error && (data ?? []).length === 0 && <p>Belum ada pesan dari form Kontak.</p>}
    {(data ?? []).map((m) => (
      <div className="card mb-3" key={m.id}><div className="card-body">
        <div className="d-flex justify-content-between gap-2 flex-wrap">
          <div><strong>{m.name}</strong> <a href={`mailto:${m.email}`}>{m.email}</a></div>
          <small className="text-secondary">{new Date(m.created_at).toLocaleString("id-ID")}</small>
        </div>
        <p className="my-2" style={{ whiteSpace: "pre-line" }}>{m.message}</p>
        <form action={hapusPesan}><input type="hidden" name="id" value={m.id} /><DeleteButton /></form>
      </div></div>
    ))}
  </>);
}
