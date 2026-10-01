import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container py-5 text-center" style={{ maxWidth: 560 }}>
      <h1 className="display-4">Halaman tidak ditemukan</h1>
      <p className="lead">Alamat yang kamu buka tidak ada atau sudah dipindahkan.</p>
      <Link href="/" className="btn btn-success">Kembali ke Home</Link>
    </div>
  );
}
