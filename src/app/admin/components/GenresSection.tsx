"use client";

import { useEffect, useCallback, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";
// import ic1 from "../../../../public/icons/ic1.png";
import {
  API,
  Genre,
  GENRE_ICONS,
  slugify,
  Field,
  ListHeader,
  DeleteDialog,
  EmptyState,
  LoadingState,
  ErrorBanner,
  BackBreadcrumb,
  SubmitBar,
} from "./shared";
import Image from "next/image";

const GENRE_ICONSq = [
  "icons/ic0.png",
  "icons/ic1.png",
  "icons/ic2.png",
  "icons/ic3.png",
  "icons/ic4.png",
  "icons/ic5.png",
  "icons/ic6.png",
  "icons/ic7.png",
  "icons/ic8.png",
  "icons/ic9.png",
  "icons/i1.png",
  "icons/i2.png",
  "icons/i3.png",
  "icons/i4.gif",
  "icons/i5.gif",
  "icons/i6.gif",
  "icons/i7.gif",
  "icons/i8.gif",
  "icons/i9.gif",
  "icons/i0.gif",
  "icons/i11.gif",
  "icons/i12.gif",
];

/* ═══════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════ */
type GenreFormState = Omit<Genre, "_id">;

const genreInit: GenreFormState = { name: "", slug: "", icon: "" };

/* ═══════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════ */
export default function GenresSection() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editId, setEditId] = useState<string | null>(null);
  const [f, setF] = useState<GenreFormState>(genreInit);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [delLoading, setDelLoading] = useState(false);
  const [delId, setDelId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);

  /* ── fetch ── */
  const fetchGenres = useCallback(async () => {
    setFetching(true);
    setError(null);
    try {
      const res = await fetch(`${API}/genres`);
      const data = await res.json();
      setGenres(Array.isArray(data) ? data : (data.genres ?? []));
    } catch {
      setError("Failed to load genres.");
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  /* ── helpers ── */
  const openAdd = () => {
    setF(genreInit);
    setEditId(null);
    setView("form");
  };
  const openEdit = (g: Genre) => {
    const { _id, ...rest } = g;
    setF(rest);
    setEditId(_id);
    setView("form");
  };
  const cancel = () => {
    setView("list");
    setEditId(null);
  };

  /* ── save (genres have no image, so plain JSON is fine) ── */
  const handleSave = async () => {
    if (!f.name.trim()) return;
    setLoading(true);
    try {
      const url = editId ? `${API}/genres/${editId}` : `${API}/genres`;
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      const saved = await res.json();
      const genre: Genre = saved.genre ?? saved;
      setGenres((prev) =>
        editId
          ? prev.map((g) => (g._id === editId ? genre : g))
          : [...prev, genre],
      );
      setView("list");
      setEditId(null);
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
      const res = await fetch(`${API}/genres/${delId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setGenres((prev) => prev.filter((g) => g._id !== delId));
      setDelId(null);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDelLoading(false);
    }
  };

  const filtered = genres.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()),
  );
  const toDelete = delId ? genres.find((g) => g._id === delId) : null;
  const isEmoji = (ic: string) => GENRE_ICONS.includes(ic);

  /* ════════ FORM VIEW ════════ */
  if (view === "form")
    return (
      <div className="flex flex-col h-full min-h-0">
        <BackBreadcrumb section="Genre" isEdit={!!editId} onBack={cancel} />

        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="px-6 py-4 space-y-4">
            {/* Genre Details */}
            <Card>
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-[11px] tracking-[2px] uppercase text-[--text-clr]">
                  Genre Details
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Genre Name" required>
                    <Input
                      placeholder="e.g., Action"
                      value={f.name}
                      onChange={(e) =>
                        setF((p) => ({
                          ...p,
                          name: e.target.value,
                          slug: slugify(e.target.value),
                        }))
                      }
                    />
                  </Field>
                  <Field label="Slug" hint="Auto-generated">
                    <Input
                      placeholder="action"
                      value={f.slug}
                      onChange={(e) =>
                        setF((p) => ({ ...p, slug: e.target.value }))
                      }
                      className="font-mono"
                    />
                  </Field>
                </div>
              </CardContent>
            </Card>

            {/* Genre Icon */}
            <Card>
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-[11px] tracking-[2px] uppercase text-[--text-clr]">
                  Genre Icon
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <Field label="Select Emoji Icon">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {GENRE_ICONSq.map((ic) => (
                      <Button
                        key={ic}
                        type="button"
                        size="icon"
                        variant={f.icon === ic ? "default" : "outline"}
                        className={cn(
                          "w-12 h-12 flex items-center justify-center",
                          f.icon === ic && "scale-110",
                        )}
                        onClick={() => setF((p) => ({ ...p, icon: ic }))}
                      >
                        <Image
                          src={ic}
                          alt="icon"
                          width={100}
                          height={100}
                          className="object-contain w-full h-full"
                          priority
                        />
                      </Button>
                    ))}
                  </div>
                </Field>
                {f.icon && isEmoji(f.icon) && (
                  <div className="flex items-center gap-3 p-3 rounded-lg border bg-[--compt-bg]">
                    <span className="text-3xl">{f.icon}</span>
                    <div>
                      <p className="text-[12px] font-semibold">
                        {f.name || "Genre Name"}
                      </p>
                      <p className="text-[10px] text-[--text-clr]">Preview</p>
                    </div>
                  </div>
                )}

                <Field label="Or Custom Icon URL">
                  <Input
                    type="url"
                    placeholder="https://cdn.example.com/icon.svg"
                    value={isEmoji(f.icon ?? "") ? "" : (f.icon ?? "")}
                    onChange={(e) =>
                      setF((p) => ({ ...p, icon: e.target.value }))
                    }
                  />
                </Field>
              </CardContent>
            </Card>
          </div>
        </div>

        <SubmitBar
          label={editId ? "Update Genre" : "Add Genre"}
          loading={loading}
          onSubmit={handleSave}
          onCancel={cancel}
        />
      </div>
    );

  /* ════════ LIST VIEW (card grid) ════════ */

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <ListHeader
        title="Genres"
        count={genres.length}
        search={search}
        onSearch={setSearch}
        onAdd={openAdd}
      />
      {error && <ErrorBanner message={error} onRetry={fetchGenres} />}
      <DeleteDialog
        open={!!delId}
        name={toDelete?.name ?? ""}
        loading={delLoading}
        onConfirm={handleDelete}
        onCancel={() => setDelId(null)}
      />

      {fetching ? (
        <LoadingState label="genres" />
      ) : filtered.length === 0 ? (
        <EmptyState icon="🏷️" label="genres" onAdd={openAdd} />
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {filtered.map((g) => (
            <Card key={g._id} className="group overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Image
                    src={g.icon || "/default-icon.png"}
                    alt="icon"
                    width={24}
                    height={24}
                    onError={(e) => {
                      e.currentTarget.src = "/fallback-icon.png";
                    }}
                    priority
                  />

                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => openEdit(g)}
                    >
                      <Pencil size={9} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 hover:border-destructive hover:text-destructive"
                      onClick={() => setDelId(g._id)}
                    >
                      <Trash2 size={9} />
                    </Button>
                  </div>
                </div>
                <p className="text-[13px] font-bold">{g.name}</p>
                <p className="text-[10px] text-[--text-clr] font-mono mt-0.5">
                  {g.slug}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
