import { createClient } from "@/lib/supabase/server";
export const metadata = { title: "Galeri Foto - Archiva Digital Solutions" };
export default async function Galeri() {
  const supabase = await createClient();
  const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
  return (<><h1>Galeri Foto</h1>
    {(data ?? []).length === 0 && <p>Belum ada foto.</p>}
    <div className="row g-3">
      {(data ?? []).map((g) => (
        <div className="col-6 col-lg-4" key={g.id}>
          <figure className="mb-0"><img loading="lazy" src={g.image} alt={g.title || "Foto kegiatan"} className="w-100 rounded" style={{ aspectRatio: "4/3", objectFit: "cover" }} />
            {g.title && <figcaption className="small text-secondary mt-1">{g.title}</figcaption>}</figure>
        </div>
      ))}
    </div></>);
}
