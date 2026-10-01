import Link from "next/link";
import NavLink from "./NavLink";
import { kategori } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/dashboard/actions";

export default async function Sidebar() {
  let user = null, isAdmin = false;
  try {
    const supabase = await createClient();
    ({ data: { user } } = await supabase.auth.getUser());
    if (user) {
      const { data: profil } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
      isAdmin = profil?.role === "admin";
    }
  } catch {}
  return (
    <aside className="sidebar">
      <input type="checkbox" id="side-toggle" className="side-check" aria-label="Buka menu samping" />
      <label htmlFor="side-toggle" className="side-btn">☰ Artikel, Event, Galeri, Login</label>
      <div className="side-body">
        <details open>
          <summary>Artikel ▾</summary>
          <NavLink href="/artikel">Semua artikel</NavLink>
          {kategori.map((k) => (
            <NavLink key={k.slug} href={`/artikel/${k.slug}`}>{k.nama}</NavLink>
          ))}
        </details>
        <NavLink href="/event">Event</NavLink>
        <NavLink href="/galeri">Galeri Foto</NavLink>
        <NavLink href="/klien">Klien Kami</NavLink>
        <hr className="border-secondary opacity-50" />
        {user ? (
          <>
            {isAdmin && <Link href="/dashboard">Buka Dashboard</Link>}
            <form action={signOut} className="px-2 mt-2"><button className="btn btn-outline-light btn-sm w-100">Logout</button></form>
          </>
        ) : (
          <details>
            <summary>Login ▾</summary>
            <NavLink href="/signin">Sign in</NavLink>
            <NavLink href="/signup">Sign up</NavLink>
          </details>
        )}
      </div>
    </aside>
  );
}
