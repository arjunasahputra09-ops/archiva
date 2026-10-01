import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata = { title: "Archiva Digital Solutions", description: "Digital Archive & Technology Solutions" };

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
