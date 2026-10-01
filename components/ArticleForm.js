import { saveArticle } from "@/app/dashboard/articles/actions";

export default function ArticleForm({ kategori, artikel, error }) {
  return (
    <form action={saveArticle}>
      {artikel && <input type="hidden" name="id" value={artikel.id} />}
      {artikel?.image && <input type="hidden" name="image_lama" value={artikel.image} />}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div className="mb-3"><label htmlFor="title" className="form-label">Judul</label>
        <input id="title" name="title" className="form-control" defaultValue={artikel?.title} required /></div>
      <div className="mb-3"><label htmlFor="category_id" className="form-label">Kategori</label>
        <select id="category_id" name="category_id" className="form-select" defaultValue={artikel?.category_id ?? ""} required>
          <option value="" disabled>Pilih kategori</option>
          {kategori.map((k) => <option key={k.id} value={k.id}>{k.name}</option>)}
        </select></div>
      <div className="mb-3"><label htmlFor="image" className="form-label">Gambar (maks. 4 MB)</label>
        {artikel?.image && <div className="mb-2"><img src={artikel.image} alt="" style={{ maxHeight: 120 }} className="rounded" /></div>}
        <input id="image" name="image" type="file" accept="image/*" className="form-control" /></div>
      <div className="mb-3"><label htmlFor="content" className="form-label">Isi artikel</label>
        <textarea id="content" name="content" rows={8} className="form-control" defaultValue={artikel?.content} required /></div>
      <button className="btn btn-success">Publish</button>{" "}
      <a href="/dashboard/articles" className="btn btn-outline-secondary">Batal</a>
    </form>
  );
}
