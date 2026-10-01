export const metadata = { title: "Visi & Misi - Archiva Digital Solutions" };
const misi = [
  "Menyediakan solusi teknologi sesuai kebutuhan organisasi.",
  "Membantu transformasi dokumen konvensional menjadi digital.",
  "Mengembangkan sistem informasi yang mudah digunakan.",
  "Memberikan layanan teknologi yang profesional.",
];
export default function VisiMisi() {
  return (
    <>
      <h1>Visi &amp; Misi</h1>
      <h2 className="section-title">Visi</h2>
      <blockquote className="visi">Menjadi perusahaan teknologi terpercaya dalam menyediakan solusi digitalisasi informasi dan pengelolaan dokumen yang efektif, aman, dan inovatif.</blockquote>
      <h2 className="section-title mt-5">Misi</h2>
      <ol className="steps misi">
        {misi.map((m) => (<li key={m}><span>{m}</span></li>))}
      </ol>
    </>
  );
}
