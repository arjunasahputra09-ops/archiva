import ContactForm from "@/components/ContactForm";
export const metadata = { title: "Kontak - Archiva Digital Solutions" };

const info = [
  ["Alamat", "Jl. Sukabangun II No. 24, Palembang, Sumatera Selatan"],
  ["Telepon", "(0711) 109-970"],
  ["Fax", "(0711) 980-001"],
  ["Email", "info@archivadigital.solutions"],
  ["Jam kerja", "Senin sampai Jumat, 08.00 - 16.00 WIB"],
];

export default function Kontak() {
  return (
    <>
      <h1>Kontak Kami</h1>
      <p className="lead">Hubungi kami untuk informasi lebih lanjut tentang layanan arsip dan sistem informasi organisasi kami.</p>
      <div className="row g-4">
        <div className="col-lg-5">
          <dl className="idtable mb-0">
            {info.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
          </dl>
          <p className="text-secondary small mt-2">Harap dicatat bahwa informasi kontak di atas bersifat umum dan dapat berubah sewaktu-waktu.</p>
        </div>
        <div className="col-lg-7"><div className="card"><div className="card-body">
          <h2 className="h4">Kirim pesan</h2><ContactForm />
        </div></div></div>
      </div>
    </>
  );
}
