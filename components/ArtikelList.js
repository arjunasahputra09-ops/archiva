import Link from "next/link";
export default function ArtikelList({ judul, daftar }) {
  return (<><h1>{judul}</h1>
    {daftar.length === 0 && <p>Belum ada artikel di kategori ini.</p>}
    {daftar.map((a) => {
      const ringkas = a.content.length > 220 ? a.content.slice(0, 220).trimEnd() + "..." : a.content;
      return (
        <article className="card mb-3" key={a.id}>
          {a.image && <img src={a.image} alt="" loading="lazy" className="card-img-top" style={{ maxHeight: 260, objectFit: "cover" }} />}
          <div className="card-body">
            <span className="badge text-bg-success">{a.article_categories?.name}</span>
            <h3 className="h5 mt-2">{a.title}</h3>
            <p className="text-secondary small">{new Date(a.created_at).toLocaleDateString("id-ID", { dateStyle: "long" })}</p>
            <p style={{ whiteSpace: "pre-line" }}>{ringkas}</p>
            <Link href={`/artikel/${a.article_categories?.slug ?? "semua"}/${a.id}`}>Baca selengkapnya</Link>
          </div>
        </article>
      );
    })}</>);
}
