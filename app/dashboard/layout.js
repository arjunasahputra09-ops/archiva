import Link from "next/link";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { getAdmin } from "@/lib/auth";
import { signOut } from "./actions";

export default async function AdminLayout({ children }) {
  const { isAdmin } = await getAdmin();
  if (!isAdmin) redirect("/"); // dashboard khusus admin
  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      <aside className="sidebar admin-side">
        <input type="checkbox" id="admin-toggle" className="side-check" aria-label="Buka menu admin" />
        <label htmlFor="admin-toggle" className="side-btn">☰ Menu admin</label>
        <div className="side-body">
        <div className="d-flex align-items-center gap-2 px-2 mb-3">
          <Logo size={44} />
          <div><div className="fw-bold">Archiva</div><div className="small text-secondary">Admin {isAdmin ? "" : "(user)"}</div></div>
        </div>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/articles">Artikel</Link>
        <Link href="/dashboard/produk">Produk</Link>
        <Link href="/dashboard/event">Event</Link>
        <Link href="/dashboard/galeri">Galeri</Link>
        <Link href="/dashboard/klien">Klien</Link>
        <Link href="/dashboard/pesan">Pesan</Link>
        <hr className="border-secondary" />
        <Link href="/">Lihat Website</Link>
        <form action={signOut} className="px-2 mt-2"><button className="btn btn-outline-light btn-sm w-100">Logout</button></form>
              </div>
      </aside>
      <main className="admin-main dash-main flex-grow-1 p-3 p-md-4">{children}</main>
    </div>
  );
}
