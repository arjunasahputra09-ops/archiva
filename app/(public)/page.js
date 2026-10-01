import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: layanan } = await supabase.from("services").select("id,name,description").order("id");
  const { data: terbaru } = await supabase
    .from("articles").select("id,title,created_at,article_categories(name,slug)")
    .order("created_at", { ascending: false }).limit(3);

  return (
    <>
      <section className="hero">
        <div>
          <h1>Ubah tumpukan dokumen menjadi arsip digital yang rapi dan aman</h1>
          <p>Archiva Digital Solutions membantu instansi, sekolah, dan usaha memindai, mengelola, dan menemukan kembali dokumen dalam hitungan detik.</p>
          <div className="d-flex flex-wrap gap-2">
            <Link href="/produk" className="btn btn-success btn-lg">Lihat produk kami</Link>
            <Link href="/kontak" className="btn btn-outline-light btn-lg">Hubungi kami</Link>
          </div>
        </div>
        <div className="hero-cards" aria-hidden="true">
          <div className="idx idx-3" /><div className="idx idx-2" />
          <div className="idx idx-1">
            <div className="idx-title">Surat Keputusan No. 042/2019</div>
            <div className="idx-meta">Arsip fisik, lemari B rak 3</div>
            <span className="stamp">Terdigitalisasi</span>
          </div>
        </div>
      </section>

      <dl className="ledger">
        <div><dt>2020</dt><dd>Tahun berdiri, Palembang</dd></div>
        <div><dt>40+</dt><dd>Proyek digitalisasi dan sistem</dd></div>
        <div><dt>5</dt><dd>Layanan dari arsip sampai konsultasi</dd></div>
      </dl>

      <section className="mb-4">
        <h2 className="section-title">Kata Pengantar</h2>
        <p className="mb-2">Terima kasih telah mengunjungi profil Archiva Digital Solutions. Halaman ini memuat sejarah, visi, layanan, dan kegiatan kami. Seluruh nama klien dan data pada situs ini adalah data contoh.</p>
        <Link href="/about">Baca sejarah kami</Link>
      </section>

      <section>
        <h2 className="section-title">Layanan kami</h2>
        {(layanan ?? []).length === 0 && <p>Belum ada layanan. Tambahkan lewat dashboard admin.</p>}
        <div className="row g-3">
          {(layanan ?? []).map((p) => (
            <div className="col-sm-6 col-lg-4" key={p.id}>
              <div className="drawer"><h3>{p.name}</h3><p>{p.description}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="why">
        <div><h3>Tertata</h3><p>Setiap dokumen diberi indeks dan nama berkas yang seragam, sehingga mudah dicari.</p></div>
        <div><h3>Aman</h3><p>Hak akses diatur per pengguna dan data disimpan dengan cadangan.</p></div>
        <div><h3>Tepat waktu</h3><p>Pekerjaan dijadwalkan di awal dan dilaporkan sampai serah terima.</p></div>
      </section>

      {(terbaru ?? []).length > 0 && (
        <section>
          <h2 className="section-title">Artikel terbaru</h2>
          <div className="news">
            {terbaru.map((a) => (
              <Link key={a.id} href={`/artikel/${a.article_categories?.slug ?? ""}`}>
                <small>{new Date(a.created_at).toLocaleDateString("id-ID", { dateStyle: "medium" })}</small>
                <strong>{a.title}</strong>
                <small>{a.article_categories?.name}</small>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="cta">
        <h2>Punya tumpukan dokumen yang perlu dirapikan?</h2>
        <Link href="/kontak" className="btn btn-lg">Minta konsultasi</Link>
      </section>
    </>
  );
}
