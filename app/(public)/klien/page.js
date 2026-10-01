import { createClient } from "@/lib/supabase/server";
export const metadata = { title: "Klien Kami - Archiva Digital Solutions" };
export default async function Klien() {
  const supabase = await createClient();
  const { data } = await supabase.from("clients").select("*").order("name");
  return (<><h1>Klien Kami</h1>
    {(data ?? []).length === 0 && <p>Belum ada klien.</p>}
    <div className="row g-3">
      {(data ?? []).map((c) => (
        <div className="col-6 col-md-4 col-lg-3" key={c.id}>
          <div className="klien-card">
            <div className="klien-logo">
              {c.logo
                ? <img loading="lazy" src={c.logo} alt={`Logo ${c.name}`} />
                : <span aria-hidden="true">{c.name.charAt(0)}</span>}
            </div>
            <div className="klien-nama">{c.name}</div>
          </div>
        </div>
      ))}
    </div></>);
}