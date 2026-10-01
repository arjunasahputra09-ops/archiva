import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata = { title: "Dashboard - Archiva Digital Solutions" };

const tabel = [["articles", "Artikel"], ["services", "Produk"], ["events", "Event"], ["gallery", "Galeri"], ["clients", "Klien"]];

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  const { data: profil } = await supabase.from("profiles").select("full_name, role").eq("id", user.id).maybeSingle();
  const jumlah = await Promise.all(
    tabel.map(async ([t]) => {
      const { count } = await supabase.from(t).select("*", { count: "exact", head: true });
      return count ?? 0;
    })
  );
  const nama = profil?.full_name || user.email;

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h1 className="mb-0">Dashboard</h1>
          <p className="text-secondary mb-0">Selamat datang, {nama} ({profil?.role ?? "user"})</p>
        </div>
        {profil?.role === "admin" && <Link href="/dashboard/articles/new" className="btn btn-success">Tambah artikel</Link>}
      </div>
      <div className="row g-3">
        {tabel.map(([, label], i) => (
          <div className="col-6 col-lg-4" key={label}>
            <div className="card stat"><div className="card-body">
              <div className="text-secondary">{label}</div>
              <div className="num">{jumlah[i]}</div>
            </div></div>
          </div>
        ))}
      </div>
    </>
  );
}
