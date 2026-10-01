import Link from "next/link";
export const metadata = { title: "About Us - Archiva Digital Solutions" };

const sejarah = [
  ["2020", "Berdiri di Palembang", "Sekelompok mahasiswa informatika membantu kantor kecil merapikan arsip surat yang menumpuk."],
  ["2021", "Proyek digitalisasi pertama", "Arsip surat masuk dan keluar sebuah instansi daerah dipindai dan diindeks."],
  ["2022", "Sistem informasi", "Layanan berkembang ke pembuatan aplikasi web untuk administrasi sekolah dan organisasi."],
  ["2023", "Web dan konsultasi IT", "Kami mulai membuat website profil dan mendampingi klien memilih teknologi."],
  ["2025", "Manajemen dokumen", "Alur persetujuan dan versi dokumen ditambahkan ke daftar layanan."],
];
const bidang = ["Digital Archive", "Web Development", "Information System", "Document Management", "IT Consultation"];
const nilai = [
  ["Teliti", "Setiap dokumen diperiksa sebelum masuk arsip."],
  ["Menjaga kerahasiaan", "Dokumen klien hanya diakses oleh orang yang berwenang."],
  ["Tepat janji", "Jadwal dan hasil kerja sesuai kesepakatan."],
];

export default function About() {
  return (
    <>
      <h1>About Us</h1>
      <p className="lead">Archiva Digital Solutions berdiri pada 2020 dari sekelompok mahasiswa informatika di Palembang yang membantu kantor kecil merapikan arsip surat. Permintaan terus bertambah, dan kami berkembang menjadi perusahaan teknologi informasi yang fokus pada digitalisasi arsip dan pengembangan sistem informasi.</p>

      <h2 className="section-title mt-4">Sejarah singkat</h2>
      <ol className="steps timeline">
        {sejarah.map(([th, j, d]) => (<li key={th}><strong>{th}</strong><span><b>{j}.</b> {d}</span></li>))}
      </ol>

      <h2 className="section-title mt-5">Bidang usaha</h2>
      <div className="chips">{bidang.map((b) => <span key={b}>{b}</span>)}</div>
      <p className="mt-3">Kami bekerja di bidang teknologi informasi dan digitalisasi arsip: dari memindai dokumen fisik, membangun sistem informasi, sampai mendampingi organisasi menerapkan teknologi yang sesuai.</p>

      <h2 className="section-title mt-5">Nilai yang kami pegang</h2>
      <div className="row g-3">
        {nilai.map(([j, d]) => (<div className="col-md-4" key={j}><div className="drawer"><h3>{j}</h3><p>{d}</p></div></div>))}
      </div>
      <p className="mt-4">Ingin tahu lebih jauh tentang pengalaman kami? Lihat <Link href="/profile">Profile</Link> atau <Link href="/produk">Produk Kami</Link>.</p>
    </>
  );
}
