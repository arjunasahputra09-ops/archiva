import { saveItem } from "@/app/dashboard/[resource]/actions";

export default function ResourceForm({ resource, cfg, item, error }) {
  return (
    <form action={saveItem}>
      <input type="hidden" name="resource" value={resource} />
      {item && <input type="hidden" name="id" value={item.id} />}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {cfg.fields.map((f) => (
        <div className="mb-3" key={f.name}>
          <label htmlFor={f.name} className="form-label">{f.label}{f.required ? " *" : ""}</label>
          {f.type === "textarea" ? (
            <textarea id={f.name} name={f.name} rows={5} className="form-control" defaultValue={item?.[f.name] ?? ""} />
          ) : f.type === "image" ? (
            <>
              {item?.[f.name] && (<>
                <div className="mb-2"><img src={item[f.name]} alt="" style={{ maxHeight: 120 }} className="rounded" /></div>
                <input type="hidden" name={f.name + "_lama"} value={item[f.name]} />
              </>)}
              <input id={f.name} name={f.name} type="file" accept="image/*" className="form-control" />
              <div className="form-text">Maksimal 4 MB.</div>
            </>
          ) : (
            <input id={f.name} name={f.name} type={f.type} className="form-control" defaultValue={item?.[f.name] ?? ""} required={f.required} />
          )}
        </div>
      ))}
      <button className="btn btn-success">Simpan</button>{" "}
      <a href={`/dashboard/${resource}`} className="btn btn-outline-secondary">Batal</a>
    </form>
  );
}
