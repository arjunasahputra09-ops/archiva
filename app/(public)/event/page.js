import { createClient } from "@/lib/supabase/server";
export const metadata = { title: "Event - Archiva Digital Solutions" };

export default async function Event() {
  const supabase = await createClient();
  const { data } = await supabase.from("events").select("*").order("event_date", { ascending: false });
  return (<><h1>Event</h1>
    {(data ?? []).length === 0 && <p>Belum ada event.</p>}
    {(data ?? []).map((e) => {
      const desc = e.description || "";
      const panjang = desc.length > 180;
      const ringkas = panjang ? desc.slice(0, 180).trimEnd() + "..." : desc;
      return (
        <article className={`event-card${e.image ? " has-img" : ""}`} key={e.id}>
          {e.image && <div className="event-img"><img loading="lazy" src={e.image} alt={e.title} /></div>}
          <div className="event-body">
            <h3 className="h5">{e.title}</h3>
            {e.event_date && <p className="text-secondary small">{new Date(e.event_date).toLocaleDateString("id-ID", { dateStyle: "long" })}</p>}
            {panjang ? (
              <details className="more">
                <summary><span className="short">{ringkas}</span><span className="btn-more" /></summary>
                <div className="full" style={{ whiteSpace: "pre-line" }}>{desc}</div>
              </details>
            ) : (
              <p className="mb-0" style={{ whiteSpace: "pre-line" }}>{desc}</p>
            )}
          </div>
        </article>
      );
    })}</>);
}