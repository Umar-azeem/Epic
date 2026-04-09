"use client";

import { useEffect, useCallback, useState } from "react";
import { Button }  from "@/src/components/ui/button";
import { Input }   from "@/src/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/src/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/src/components/ui/table";

import {
  API, Publisher, COUNTRIES,
  slugify, Field, UploadZone,
  ListHeader, DeleteDialog, RowActions,
  EmptyState, LoadingState, ErrorBanner,
  BackBreadcrumb, SubmitBar,
} from "./shared";

/* ═══════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════ */
type PubFormState = Omit<Publisher, "_id"> & {
  logoFile: File | null;
};

const pubInit: PubFormState = {
  name:"", slug:"", website:"", country:"", foundedYear: undefined,
  logoFile: null,
};

/* ═══════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════ */
export default function PublishersSection() {
  const [view,       setView]       = useState<"list"|"form">("list");
  const [editId,     setEditId]     = useState<string|null>(null);
  const [f,          setF]          = useState<PubFormState>(pubInit);
  const [loading,    setLoading]    = useState(false);
  const [fetching,   setFetching]   = useState(true);
  const [delLoading, setDelLoading] = useState(false);
  const [delId,      setDelId]      = useState<string|null>(null);
  const [search,     setSearch]     = useState("");
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [error,      setError]      = useState<string|null>(null);

  /* ── fetch ── */
  const fetchPublishers = useCallback(async () => {
    setFetching(true); setError(null);
    try {
      const res  = await fetch(`${API}/publishers`);
      const data = await res.json();
      setPublishers(Array.isArray(data) ? data : data.publishers ?? []);
    } catch {
      setError("Failed to load publishers.");
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => { fetchPublishers(); }, [fetchPublishers]);

  /* ── helpers ── */
  const set = <K extends keyof PubFormState>(k: K, v: PubFormState[K]) =>
    setF(p => ({...p, [k]: v}));

  const openAdd = () => { setF(pubInit); setEditId(null); setView("form"); };
  const openEdit = (p: Publisher) => {
    const { _id, ...rest } = p;
    setF({ ...pubInit, ...rest, logoFile: null });
    setEditId(_id);
    setView("form");
  };
  const cancel = () => { setView("list"); setEditId(null); };

  /* ── save via FormData ── */
  const handleSave = async () => {
    if (!f.name.trim()) return;
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name",  f.name);
      fd.append("slug",  f.slug);
      if (f.website)     fd.append("website", f.website);
      if (f.country)     fd.append("country", f.country);
      if (f.foundedYear) fd.append("foundedYear", String(f.foundedYear));
      if (f.logoFile)    fd.append("logo", f.logoFile, f.logoFile.name);

      const url    = editId ? `${API}/publishers/${editId}` : `${API}/publishers`;
      const method = editId ? "PUT" : "POST";
      const res    = await fetch(url, { method, body: fd });

      if (!res.ok) {
        // Fallback: some backends don't accept multipart for publishers — retry as JSON
        const jsonRes = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: f.name, slug: f.slug, website: f.website,
            country: f.country, foundedYear: f.foundedYear,
          }),
        });
        if (!jsonRes.ok) throw new Error(`Save failed (${jsonRes.status})`);
        const saved     = await jsonRes.json();
        const publisher: Publisher = saved.publisher ?? saved;
        setPublishers(prev =>
          editId ? prev.map(p => p._id === editId ? publisher : p) : [...prev, publisher]
        );
      } else {
        const saved     = await res.json();
        const publisher: Publisher = saved.publisher ?? saved;
        setPublishers(prev =>
          editId ? prev.map(p => p._id === editId ? publisher : p) : [...prev, publisher]
        );
      }

      setView("list"); setEditId(null);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ── delete ── */
  const handleDelete = async () => {
    if (!delId) return;
    setDelLoading(true);
    try {
      const res = await fetch(`${API}/publishers/${delId}`, { method:"DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setPublishers(prev => prev.filter(p => p._id !== delId));
      setDelId(null);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDelLoading(false);
    }
  };

  const filtered = publishers.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.country ?? "").toLowerCase().includes(search.toLowerCase())
  );
  const toDelete = delId ? publishers.find(p => p._id === delId) : null;

  /* ════════ FORM VIEW ════════ */
  if (view === "form") return (
    <div className="flex flex-col h-full min-h-0">
      <BackBreadcrumb section="Publisher" isEdit={!!editId} onBack={cancel} />

      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="px-6 py-4 space-y-4">

          {/* Publisher Details */}
          <Card>
            <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="text-[11px] tracking-[2px] uppercase text-[--text-clr]">
                Publisher Details
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Publisher Name" required>
                  <Input placeholder="e.g., Rockstar Games" value={f.name}
                    onChange={e => { set("name", e.target.value); set("slug", slugify(e.target.value)); }} />
                </Field>
                <Field label="Slug" hint="Auto-generated">
                  <Input placeholder="rockstar-games" value={f.slug}
                    onChange={e => set("slug", e.target.value)} className="font-mono" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Website">
                  <Input type="url" placeholder="https://example.com" value={f.website ?? ""}
                    onChange={e => set("website", e.target.value)} />
                </Field>
                <Field label="Country">
                  <Select value={f.country || ""} onValueChange={v => set("country", v)}>
                    <SelectTrigger className="h-9 text-[12px]">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map(c => (
                        <SelectItem key={c} value={c} className="text-[12px]">{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field label="Founded Year" className="max-w-[180px]">
                <Input type="number" placeholder="e.g., 1998" value={f.foundedYear ?? ""}
                  onChange={e => set("foundedYear", e.target.value ? +e.target.value : undefined)} />
              </Field>
            </CardContent>
          </Card>

          {/* Branding */}
          <Card>
            <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="text-[11px] tracking-[2px] uppercase text-[--text-clr]">
                Branding
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-2">
              <Field label="Publisher Logo">
                <UploadZone
                  tall
                  label="Upload logo"
                  hint="PNG or SVG · transparent background preferred"
                  onChange={file => set("logoFile", file)}
                />
              </Field>
              {f.logoFile && (
                <p className="text-[9px] text-green-500">
                  ✓ {f.logoFile.name} ({(f.logoFile.size / 1024).toFixed(0)} KB)
                </p>
              )}
            </CardContent>
          </Card>

          {/* Associated Developers placeholder */}
          <Card>
            <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="text-[11px] tracking-[2px] uppercase text-[--text-clr]">
                Associated Developers
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <p className="text-[11px] text-[--text-clr] mb-3">
                Developer studios are linked after publisher creation.
              </p>
              <div className="rounded-lg border-2 border-dashed p-4 text-center text-[11px] text-[--text-clr]">
                Developers will be linked after publisher is created
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      <SubmitBar
        label={editId ? "Update Publisher" : "Add Publisher"}
        loading={loading}
        onSubmit={handleSave}
        onCancel={cancel}
      />
    </div>
  );

  /* ════════ LIST VIEW ════════ */
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <ListHeader
        title="Publishers" count={publishers.length}
        search={search} onSearch={setSearch} onAdd={openAdd}
      />
      {error && <ErrorBanner message={error} onRetry={fetchPublishers} />}
      <DeleteDialog
        open={!!delId} name={toDelete?.name ?? ""}
        loading={delLoading} onConfirm={handleDelete} onCancel={() => setDelId(null)}
      />

      {fetching ? <LoadingState label="publishers" /> : filtered.length === 0 ? (
        <EmptyState icon="🏢" label="publishers" onAdd={openAdd} />
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px] tracking-widest">Name</TableHead>
                <TableHead className="text-[10px] tracking-widest">Website</TableHead>
                <TableHead className="text-[10px] tracking-widest">Country</TableHead>
                <TableHead className="text-[10px] tracking-widest">Founded</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p._id}>
                  <TableCell>
                    <p className="text-[12px] font-semibold">{p.name}</p>
                    <p className="text-[10px] text-[--text-clr] font-mono">{p.slug}</p>
                  </TableCell>
                  <TableCell className="text-[11px]">
                    {p.website
                      ? <a href={p.website} target="_blank" rel="noreferrer"
                          className="text-[--btn-primary] hover:underline">
                          {p.website.replace(/https?:\/\//,"")}
                        </a>
                      : "—"}
                  </TableCell>
                  <TableCell className="text-[11px] text-[--text-clr]">{p.country || "—"}</TableCell>
                  <TableCell className="text-[11px] text-[--text-clr]">{p.foundedYear || "—"}</TableCell>
                  <TableCell>
                    <RowActions onEdit={() => openEdit(p)} onDelete={() => setDelId(p._id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}