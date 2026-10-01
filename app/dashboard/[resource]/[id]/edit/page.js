import { notFound } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import { RESOURCES } from "@/lib/resources";
import ResourceForm from "@/components/ResourceForm";
export default async function EditItem({ params, searchParams }) {
  const { resource, id } = await params;
  const cfg = RESOURCES[resource];
  if (!cfg) notFound();
  const { error } = await searchParams;
  const { supabase } = await getAdmin();
  const { data: item } = await supabase.from(cfg.table).select("*").eq("id", id).maybeSingle();
  if (!item) notFound();
  return (<><h1>Edit {cfg.label}</h1><ResourceForm resource={resource} cfg={cfg} item={item} error={error} /></>);
}
