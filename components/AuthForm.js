"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthForm({ mode }) {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);
  const signup = mode === "signup";

  async function onSubmit(e) {
    e.preventDefault();
    setErr(""); setInfo(""); setBusy(true);
    const f = new FormData(e.currentTarget);
    const email = f.get("email"), password = f.get("password");
    const supabase = createClient();
    const { data, error } = signup
      ? await supabase.auth.signUp({ email, password, options: { data: { full_name: f.get("nama") } } })
      : await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      setErr(signup ? `Pendaftaran gagal: ${error.message}` : "Login gagal. Periksa email dan password.");
      return;
    }
    if (signup && !data.session) {
      setInfo("Akun dibuat. Cek email untuk konfirmasi, lalu Sign in.");
      return;
    }
    // Admin diarahkan ke dashboard, user biasa ke halaman utama.
    let tujuan = "/";
    if (!signup && data.user) {
      const { data: profil } = await supabase.from("profiles").select("role").eq("id", data.user.id).maybeSingle();
      if (profil?.role === "admin") tujuan = "/dashboard";
    }
    router.push(tujuan);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit}>
      {signup && (
        <div className="mb-3"><label htmlFor="nama" className="form-label">Nama lengkap</label>
          <input id="nama" name="nama" className="form-control" required /></div>
      )}
      <div className="mb-3"><label htmlFor="email" className="form-label">Email</label>
        <input id="email" name="email" type="email" className="form-control" required /></div>
      <div className="mb-3"><label htmlFor="password" className="form-label">Password</label>
        <input id="password" name="password" type="password" minLength={6} className="form-control" required /></div>
      <button className="btn btn-success" disabled={busy}>{busy ? "Memproses..." : signup ? "Buat akun" : "Sign in"}</button>
      {err && <div className="alert alert-danger mt-3" role="alert">{err}</div>}
      {info && <div className="alert alert-success mt-3" role="status">{info}</div>}
    </form>
  );
}
