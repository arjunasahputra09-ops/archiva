import Logo from "@/components/Logo";
import TopMenu from "@/components/TopMenu";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="shell">
      <div className="row g-0">
        <div className="col-md-3 col-lg-2 logo-cell"><Logo /></div>
        <div className="col-md-9 col-lg-10">
          <div className="brand"><b>Archiva Digital Solutions</b><div className="tagline">Transforming Documents into Digital Solutions</div></div>
          <TopMenu />
        </div>
      </div>
      <div className="row g-0">
        <div className="col-md-3 col-lg-2"><Sidebar /></div>
        <main className="col-md-9 col-lg-10 p-3 p-md-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
