import Link from "next/link";

export const metadata = { title: "Profile - Archiva Digital Solutions" };

const identitas = [
  ["Nama perusahaan", "Archiva Digital Solutions"],
  ["Bidang usaha", "Digitalisasi arsip dan solusi teknologi informasi"],
  ["Berdiri", "2020"],
  ["Kantor", "Palembang, Sumatera Selatan"],
  ["Tim", "12 orang di bidang arsip, pengembangan sistem, dan dukungan pelanggan"],
  ["Wilayah layanan", "Sumatera Selatan dan sekitarnya, dengan dukungan jarak jauh"],
];

const proyek = [
  ["2021", "Digitalisasi arsip surat masuk dan keluar", "Instansi pemerintah daerah", "Sekitar 12.000 lembar dipindai dan bisa dicari berdasarkan nomor, tanggal, atau perihal."],
  ["2022", "Sistem informasi administrasi sekolah", "Yayasan pendidikan", "Data siswa, pegawai, dan surat menyurat terkumpul dalam satu aplikasi web."],
  ["2023", "Website profil dan portal informasi", "Koperasi dan usaha kecil", "Website tampil rapi di ponsel dan bisa dikelola sendiri oleh staf lewat halaman admin."],
  ["2025", "Manajemen dokumen internal", "Perusahaan logistik", "Alur persetujuan dan versi dokumen tercatat, dengan hak akses per divisi."],
];

const kelebihan = [
  ["Tim berpengalaman", "Gabungan tenaga arsip dan pengembang yang sudah menangani puluhan proyek."],
  ["Data aman", "Hak akses diatur per pengguna dan data disimpan dengan cadangan berkala."],
  ["Tepat waktu", "Jadwal disepakati di awal dan perkembangan pekerjaan dilaporkan rutin."],
  ["Dukungan purna jual", "Bantuan tersedia setelah serah terima, termasuk pelatihan untuk staf."],
  ["Sesuai kebutuhan", "Solusi disusun dari kebutuhan organisasi, bukan paket yang sama untuk semua."],
];

const alur = [
  ["Konsultasi", "Kami mendengar kebutuhan dan menentukan ruang lingkup pekerjaan."],
  ["Survei arsip", "Tim mengecek jumlah, kondisi, dan jenis dokumen yang akan diolah."],
  ["Pemindaian", "Dokumen dipindai dengan resolusi yang sesuai dan diperiksa kualitasnya."],
  ["Pengindeksan", "Setiap berkas diberi nama dan indeks yang seragam agar mudah dicari."],
  ["Serah terima dan pelatihan", "Hasil diserahkan bersama pelatihan singkat bagi staf yang akan memakainya."],
];

const teknologi = ["Next.js", "React", "Bootstrap", "Supabase", "PostgreSQL", "Vercel"];

const tim = [
  ["Tim Digitalisasi", "Pemindaian, pengindeksan, dan pengendalian mutu arsip."],
  ["Tim Pengembangan Sistem", "Perancangan dan pembuatan website serta sistem informasi."],
  ["Tim Konsultasi", "Pendampingan pemilihan teknologi dan perencanaan proyek."],
  ["Tim Dukungan Pelanggan", "Bantuan penggunaan dan perawatan setelah serah terima."],
];

export default function Profile() {
  return (
    <>
      <h1>Profile</h1>
      <p className="lead">Archiva Digital Solutions adalah perusahaan teknologi informasi yang membantu organisasi merapikan dokumen dan membangun sistem digital yang mudah dipakai.</p>

      <dl className="idtable">
        {identitas.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
      </dl>

      <h2 className="section-title mt-5">Pengalaman perusahaan</h2>
      <div className="projects">
        {proyek.map(([tahun, judul, klien, hasil]) => (
          <article key={judul}>
            <span className="year">{tahun}</span>
            <div><h3>{judul}</h3><div className="klien">{klien}</div><p>{hasil}</p></div>
          </article>
        ))}
      </div>
      <p className="text-secondary small">Nama klien dan angka proyek pada situs ini adalah data contoh.</p>

      <h2 className="section-title mt-5">Kelebihan kami</h2>
      <div className="row g-3">
        {kelebihan.map(([j, d]) => (
          <div className="col-md-6" key={j}><div className="drawer"><h3>{j}</h3><p>{d}</p></div></div>
        ))}
      </div>

      <h2 className="section-title mt-5">Alur kerja</h2>
      <ol className="steps">
        {alur.map(([j, d]) => (<li key={j}><strong>{j}</strong><span>{d}</span></li>))}
      </ol>

      <h2 className="section-title mt-5">Teknologi yang kami pakai</h2>
      <div className="chips">{teknologi.map((t) => <span key={t}>{t}</span>)}</div>

      <h2 className="section-title mt-5">Tim kami</h2>
      <div className="row g-3">
        {tim.map(([j, d]) => (
          <div className="col-md-6" key={j}><div className="drawer"><h3>{j}</h3><p>{d}</p></div></div>
        ))}
      </div>

      <section className="cta">
        <h2>Ingin membahas kebutuhan organisasi Anda?</h2>
        <Link href="/kontak" className="btn btn-lg">Minta konsultasi</Link>
      </section>
    </>
  );
}
