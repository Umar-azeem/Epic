"use client";

import { useEffect, useCallback, useState } from "react";
import { Star } from "lucide-react";
import { Button }   from "@/src/components/ui/button";
import { Input }    from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Switch }   from "@/src/components/ui/switch";
import { Badge }    from "@/src/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/src/components/ui/table";
import { cn } from "@/src/lib/utils";

import {
  API, Review, StarRating,
  Field, StarRatingInput,
  ListHeader, DeleteDialog, RowActions,
  EmptyState, LoadingState, ErrorBanner,
  BackBreadcrumb, SubmitBar,
} from "./shared";

/* ═══════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════ */
type ReviewFormState = Omit<Review, "_id">;

const reviewInit: ReviewFormState = {
  gameId:"", userId:"", rating:5, title:"", body:"",
  recommended:true, helpfulVotes:0, verifiedPurchase:false,
};

/* ═══════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════ */
export default function ReviewsSection() {
  const [view,       setView]       = useState<"list"|"form">("list");
  const [editId,     setEditId]     = useState<string|null>(null);
  const [f,          setF]          = useState<ReviewFormState>(reviewInit);
  const [loading,    setLoading]    = useState(false);
  const [fetching,   setFetching]   = useState(true);
  const [delLoading, setDelLoading] = useState(false);
  const [delId,      setDelId]      = useState<string|null>(null);
  const [search,     setSearch]     = useState("");
  const [reviews,    setReviews]    = useState<Review[]>([]);
  const [error,      setError]      = useState<string|null>(null);

  /* ── fetch ── */
  const fetchReviews = useCallback(async () => {
    setFetching(true); setError(null);
    try {
      const res  = await fetch(`${API}/reviews`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : data.reviews ?? []);
    } catch {
      setError("Failed to load reviews.");
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  /* ── helpers ── */
  const set = <K extends keyof ReviewFormState>(k: K, v: ReviewFormState[K]) =>
    setF(p => ({...p, [k]: v}));

  const openAdd = () => { setF(reviewInit); setEditId(null); setView("form"); };
  const openEdit = (r: Review) => {
    const { _id, ...rest } = r;
    setF(rest);
    setEditId(_id);
    setView("form");
  };
  const cancel = () => { setView("list"); setEditId(null); };

  /* ── save (reviews have no images — plain JSON) ── */
  const handleSave = async () => {
    if (!f.gameId.trim() || !f.userId.trim()) return;
    setLoading(true);
    try {
      const url    = editId ? `${API}/reviews/${editId}` : `${API}/reviews`;
      const method = editId ? "PUT" : "POST";
      const res    = await fetch(url, {
        method,
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(f),
      });
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      const saved  = await res.json();
      const review: Review = saved.review ?? saved;
      setReviews(prev =>
        editId ? prev.map(r => r._id === editId ? review : r) : [...prev, review]
      );
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
      const res = await fetch(`${API}/reviews/${delId}`, { method:"DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setReviews(prev => prev.filter(r => r._id !== delId));
      setDelId(null);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDelLoading(false);
    }
  };

  const filtered = reviews.filter(r =>
    r.gameId.toLowerCase().includes(search.toLowerCase()) ||
    (r.title ?? "").toLowerCase().includes(search.toLowerCase()) ||
    r.userId.toLowerCase().includes(search.toLowerCase())
  );
  const toDelete = delId ? reviews.find(r => r._id === delId) : null;

  /* ════════ FORM VIEW ════════ */
  if (view === "form") return (
    <div className="flex flex-col h-full min-h-0">
      <BackBreadcrumb section="Review" isEdit={!!editId} onBack={cancel} />

      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="px-6 py-4 space-y-4">

          {/* References */}
          <Card>
            <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="text-[11px] tracking-[2px] uppercase text-[--text-clr]">
                References
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Game ID" required hint="MongoDB ObjectId — ref: games">
                  <Input placeholder="67a1b2c3d4e5f6a7b8c9d0e1" value={f.gameId}
                    onChange={e => set("gameId", e.target.value)} className="font-mono" />
                </Field>
                <Field label="User ID" required hint="MongoDB ObjectId — ref: users">
                  <Input placeholder="67a1b2c3d4e5f6a7b8c9d0e2" value={f.userId}
                    onChange={e => set("userId", e.target.value)} className="font-mono" />
                </Field>
              </div>
            </CardContent>
          </Card>

          {/* Review Content */}
          <Card>
            <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="text-[11px] tracking-[2px] uppercase text-[--text-clr]">
                Review Content
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Rating (1–5)">
                  <StarRatingInput value={f.rating} onChange={v => set("rating", v as StarRating)} />
                  <p className="text-[10px] text-[--text-clr] mt-1">{f.rating} / 5 stars</p>
                </Field>
                <Field label="Recommended">
                  <div className="flex gap-2 mt-1">
                    <Button type="button" size="sm" className="flex-1"
                      variant={f.recommended ? "default" : "outline"}
                      onClick={() => set("recommended", true)}>👍 Yes</Button>
                    <Button type="button" size="sm" className="flex-1"
                      variant={!f.recommended ? "destructive" : "outline"}
                      onClick={() => set("recommended", false)}>👎 No</Button>
                  </div>
                </Field>
              </div>
              <Field label="Review Title">
                <Input placeholder="e.g., Amazing gameplay but lacks story" value={f.title ?? ""}
                  onChange={e => set("title", e.target.value)} />
              </Field>
              <Field label="Review Body">
                <Textarea placeholder="Write the full review here…"
                  className="min-h-[110px] resize-none"
                  value={f.body ?? ""} onChange={e => set("body", e.target.value)} />
              </Field>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="text-[11px] tracking-[2px] uppercase text-[--text-clr]">
                Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              <Field label="Helpful Votes" className="max-w-[180px]">
                <Input type="number" placeholder="0" value={f.helpfulVotes}
                  onChange={e => set("helpfulVotes", +e.target.value)} />
              </Field>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-[12px] font-semibold">Verified Purchase</p>
                  <p className="text-[10px] text-[--text-clr]">User has purchased this game</p>
                </div>
                <Switch checked={f.verifiedPurchase}
                  onCheckedChange={v => set("verifiedPurchase", v)} />
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      <SubmitBar
        label={editId ? "Update Review" : "Add Review"}
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
        title="Reviews" count={reviews.length}
        search={search} onSearch={setSearch} onAdd={openAdd}
      />
      {error && <ErrorBanner message={error} onRetry={fetchReviews} />}
      <DeleteDialog
        open={!!delId}
        name={toDelete?.title || `Review #${toDelete?._id?.slice(0,6) ?? ""}` || ""}
        loading={delLoading} onConfirm={handleDelete} onCancel={() => setDelId(null)}
      />

      {fetching ? <LoadingState label="reviews" /> : filtered.length === 0 ? (
        <EmptyState icon="⭐" label="reviews" onAdd={openAdd} />
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px] tracking-widest">Game ID</TableHead>
                <TableHead className="text-[10px] tracking-widest">User ID</TableHead>
                <TableHead className="text-[10px] tracking-widest">Rating</TableHead>
                <TableHead className="text-[10px] tracking-widest">Title</TableHead>
                <TableHead className="text-[10px] tracking-widest">Verdict</TableHead>
                <TableHead className="text-[10px] tracking-widest">Verified</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(review => (
                <TableRow key={review._id}>
                  <TableCell className="text-[10px] font-mono text-[--text-clr]">
                    {review.gameId.slice(0,12)}…
                  </TableCell>
                  <TableCell className="text-[10px] font-mono text-[--text-clr]">
                    {review.userId.slice(0,12)}…
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(n => (
                        <Star key={n} size={11} className={cn(
                          n <= review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-transparent text-[--text-clr]"
                        )} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-[12px] max-w-[150px] truncate">
                    {review.title || "—"}
                  </TableCell>
                  <TableCell className="text-[13px]">
                    {review.recommended ? "👍" : "👎"}
                  </TableCell>
                  <TableCell>
                    {review.verifiedPurchase
                      ? <Badge variant="outline" className="text-[10px] text-green-500 border-green-500/30">✓ Verified</Badge>
                      : <span className="text-[10px] text-[--text-clr]">—</span>}
                  </TableCell>
                  <TableCell>
                    <RowActions onEdit={() => openEdit(review)} onDelete={() => setDelId(review._id)} />
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