import { notFound } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import { RESOURCES } from "@/lib/resources";
import ResourceForm from "@/components/ResourceForm";
export default async function NewItem({ params, searchParams }) {
  const { resource } = await params;
  const cfg = RESOURCES[resource];
  if (!cfg) notFound();
  const { error } = await searchParams;
  await getAdmin();
  return (<><h1>Tambah {cfg.label}</h1><ResourceForm resource={resource} cfg={cfg} error={error} /></>);
}
