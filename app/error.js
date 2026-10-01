"use client";
export default function Error({ reset }) {
  return (
    <div className="container py-5 text-center" style={{ maxWidth: 560 }}>
      <h1 className="h2">Halaman belum bisa dimuat</h1>
      <p>Terjadi gangguan saat mengambil data. Coba muat ulang, atau kembali beberapa saat lagi.</p>
      <button onClick={() => reset()} className="btn btn-success">Coba lagi</button>
    </div>
  );
}
