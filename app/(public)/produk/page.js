import { createClient } from "@/lib/supabase/server";
export const metadata = { title: "Produk Kami - Archiva Digital Solutions" };
export default async function Produk() {
  const supabase = await createClient();
  const { data } = await supabase.from("services").select("*").order("id");
  return (<><h1>Produk Kami</h1>
    {(data ?? []).length === 0 && <p>Belum ada produk.</p>}
    <div className="row g-3">
      {(data ?? []).map((p) => (
        <div className="col-sm-6 col-lg-4" key={p.id}><div className="card h-100">
          {p.image && <img loading="lazy" src={p.image} alt="" className="card-img-top" style={{ height: 160, objectFit: "cover" }} />}
          <div className="card-body"><h3 className="h5">{p.name}</h3><p className="mb-0">{p.description}</p></div>
        </div></div>
      ))}
    </div></>);
}
