// Konfigurasi CRUD untuk Produk, Event, Galeri, dan Klien.
export const RESOURCES = {
  produk: {
    table: "services", label: "Produk", judul: "name",
    fields: [
      { name: "name", label: "Nama produk / jasa", type: "text", required: true },
      { name: "description", label: "Deskripsi", type: "textarea" },
      { name: "image", label: "Gambar", type: "image" },
    ],
  },
  event: {
    table: "events", label: "Event", judul: "title", tanggal: "event_date",
    fields: [
      { name: "title", label: "Judul event", type: "text", required: true },
      { name: "event_date", label: "Tanggal", type: "date" },
      { name: "description", label: "Deskripsi", type: "textarea" },
      { name: "image", label: "Gambar", type: "image" },
    ],
  },
  galeri: {
    table: "gallery", label: "Galeri", judul: "title",
    fields: [
      { name: "title", label: "Judul foto", type: "text" },
      { name: "image", label: "Foto", type: "image", required: true },
    ],
  },
  klien: {
    table: "clients", label: "Klien", judul: "name",
    fields: [
      { name: "name", label: "Nama klien", type: "text", required: true },
      { name: "logo", label: "Logo", type: "image" },
    ],
  },
};
export const gambarField = (cfg) => cfg.fields.find((f) => f.type === "image")?.name;
