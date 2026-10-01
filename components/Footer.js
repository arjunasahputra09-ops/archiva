import Link from "next/link";
export default function Footer() {
  return (
    <footer className="site">
      <div className="row g-4">
        <div className="col-md-5">
          <h3 className="serif">Archiva Digital Solutions</h3>
          <p className="mb-0">Digital Archive &amp; Technology Solutions. Kami membantu organisasi mengubah dokumen menjadi sistem digital yang rapi dan aman.</p>
        </div>
        <div className="col-6 col-md-3">
          <h3 className="serif">Tautan</h3>
          <div className="d-grid gap-1">
            <Link href="/produk">Produk Kami</Link><Link href="/artikel">Artikel</Link><Link href="/event">Event</Link><Link href="/kontak">Kontak</Link>
          </div>
        </div>
        <div className="col-6 col-md-4">
          <h3 className="serif">Kontak</h3>
          <p className="mb-0">Jl. Sukabangun II No.24, Palembang<br />(0711) 109-970<br />info@archivadigital.solutions</p>
        </div>
      </div>
      <div className="bar d-flex flex-wrap justify-content-between gap-2">
        <span>© 2026 Archiva Digital Solutions</span>
        <span>Design by: Muhammad Arjuna Sahputra | Dibangun dengan <a href="https://getbootstrap.com">Bootstrap</a></span>
      </div>
    </footer>
  );
}
