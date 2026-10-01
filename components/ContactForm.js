"use client";
import { useActionState } from "react";
import { kirimPesan } from "@/app/(public)/kontak/actions";

export default function ContactForm() {
  const [state, action, pending] = useActionState(kirimPesan, null);
  return (
    <form action={action}>
      <div className="row g-3">
        <div className="col-md-6"><label htmlFor="nama" className="form-label">Nama</label>
          <input id="nama" name="nama" className="form-control" maxLength={100} required /></div>
        <div className="col-md-6"><label htmlFor="email" className="form-label">Email</label>
          <input id="email" name="email" type="email" className="form-control" maxLength={200} required /></div>
        <div className="col-12"><label htmlFor="pesan" className="form-label">Pesan</label>
          <textarea id="pesan" name="pesan" rows={5} className="form-control" maxLength={2000} required /></div>
      </div>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      <button className="btn btn-success mt-3" disabled={pending}>{pending ? "Mengirim..." : "Kirim pesan"}</button>
      {state && <div className={`alert ${state.ok ? "alert-success" : "alert-danger"} mt-3`} role={state.ok ? "status" : "alert"}>{state.pesan}</div>}
    </form>
  );
}
