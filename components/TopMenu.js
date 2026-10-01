import NavLink from "./NavLink";
const m = [["/", "Home"], ["/profile", "Profile"], ["/visi-misi", "Visi & Misi"], ["/produk", "Produk Kami"], ["/kontak", "Kontak"], ["/about", "About Us"]];
export default function TopMenu() {
  return (
    <nav className="topnav" aria-label="Menu utama">
      {m.map(([h, t]) => <NavLink key={h} href={h}>{t}</NavLink>)}
    </nav>
  );
}
