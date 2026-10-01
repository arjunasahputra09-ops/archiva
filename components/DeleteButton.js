"use client";
export default function DeleteButton() {
  return (
    <button className="btn btn-sm btn-outline-danger"
      onClick={(e) => { if (!confirm("Hapus data ini?")) e.preventDefault(); }}>Hapus</button>
  );
}
