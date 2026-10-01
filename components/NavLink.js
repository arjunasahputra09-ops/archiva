"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const path = usePathname();
  const active = href === "/" ? path === "/" : path === href || path.startsWith(href + "/");
  return (
    <Link href={href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>
      {children}
    </Link>
  );
}
