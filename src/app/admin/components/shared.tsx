"use client";

import { useRef, useState, useEffect } from "react";
import {
  Check, Loader2, Pencil, Plus, Search,
  Trash2, Upload, X, AlertTriangle, ChevronLeft, Star,
} from "lucide-react";
import { Button }    from "@/src/components/ui/button";
import { Input }     from "@/src/components/ui/input";
import { Label }     from "@/src/components/ui/label";
import { Badge }     from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/src/components/ui/dialog";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { cn } from "@/src/lib/utils";

/* ═══════════════════════════════════════════════════
   API
═══════════════════════════════════════════════════ */
export const API = "https://epic-backend-fslq.vercel.app/api";

/* ═══════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════ */
export type Platform   = "PC" | "PS" | "Xbox" | "Mobile" | "Switch";
export type GameStatus = "active" | "inactive" | "coming_soon" | "early_access";
export type PriceType  = "paid" | "free" | "freemium";
export type SectionType= "A" | "B" | "C" | "D";
export type StarRating = 1 | 2 | 3 | 4 | 5;

export interface SysSpec {
  os: string; cpu: string; ram: string; gpu: string;
  storage: string; directX: string; network: string;
}

// ✅ Button object matching your JSON exactly
export interface GameButton {
  enabled: boolean;
  text: string;
  type: string;
  style: string;
  link: string;
}

export interface Game {
  _id: string; title: string; slug: string; description: string;
  label?: string; category?: string; saleOfTheWeek?: string; tag?: string;
  priceText?: string; price: number; originalPrice: number; currentPrice: number;
  discount: number; rating: number; availableDate?: string; releaseDate?: string;
  sectionType: SectionType; sectionKey?: string; priceType: PriceType;
  status: GameStatus; platforms: Platform[]; genres: string[];
  viewMore: boolean; viewAll: boolean; featured: boolean; isFree: boolean;
  totalAvailable: boolean;
  // ✅ button object replaces buttonConfiguration string
  button: GameButton;
  image?: string; mainImage?: string; coverImage?: string; screenshots?: string[];
  sysMin: SysSpec; sysRec: SysSpec;
}

export interface Publisher {
  _id: string; name: string; slug: string;
  website?: string; country?: string; foundedYear?: number;
}
export interface Genre { _id: string; name: string; slug: string; icon?: string; }
export interface Review {
  _id: string; gameId: string; userId: string; rating: StarRating;
  title?: string; body?: string; recommended: boolean;
  helpfulVotes: number; verifiedPurchase: boolean;
}

/* ═══════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════ */
export const PLATFORMS: Platform[] = ["PC","PS","Xbox","Mobile","Switch"];
export const GENRES = ["Action","RPG","Shooter","Strategy","Puzzle","Adventure","Sports","Racing","Horror","Simulation"];
export const COUNTRIES = ["United States","United Kingdom","Japan","South Korea","Canada","Germany","France","Poland","Sweden","Australia","China","Other"];
export const GENRE_ICONS = ["🎮","⚔️","🔫","🧩","🏎️","⚽","👾","🧟","🛸","🗡️","🏹","🎯","🃏","🎲","🌍","🏰"];
export const SYS_FIELDS: [keyof SysSpec, string, string][] = [
  ["os","OS","e.g., Windows 10 64-bit"],
  ["cpu","CPU","e.g., Intel Core i5-4460"],
  ["ram","RAM","e.g., 8 GB"],
  ["gpu","GPU","e.g., NVIDIA GTX 970"],
  ["storage","Storage","e.g., 50 GB SSD"],
  ["directX","DirectX","e.g., Version 11"],
  ["network","Network","e.g., Broadband Internet"],
];

/* ═══════════════════════════════════════════════════
   UTILS
═══════════════════════════════════════════════════ */
export function slugify(t: string) {
  return t.toLowerCase().trim()
    .replace(/[^\w\s-]/g,"")
    .replace(/[\s_-]+/g,"-")
    .replace(/^-+|-+$/g,"");
}

/* ═══════════════════════════════════════════════════
   UI PRIMITIVES
═══════════════════════════════════════════════════ */
export function Field({ label, required, hint, className, children }: {
  label?: string; required?: boolean; hint?: string;
  className?: string; children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[oklch(0.75_0.005_285)]">
          {label}
          {required && <span className="text-cyan-400 ml-0.5">*</span>}
          {hint && (
            <span className="text-[9px] font-normal tracking-normal text-[oklch(0.65_0.005_285)] ml-1.5 normal-case">
              — {hint}
            </span>
          )}
        </Label>
      )}
      {children}
    </div>
  );
}

const statusVariant: Record<string,"default"|"secondary"|"destructive"|"outline"> = {
  active:"default", inactive:"destructive", coming_soon:"secondary", early_access:"outline",
};
export function StatusBadge({ label }: { label: string }) {
  return (
    <Badge variant={statusVariant[label] ?? "secondary"} className="capitalize text-[10px]">
      {label.replace("_"," ")}
    </Badge>
  );
}

export function StarRatingInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(n => (
        <button key={n} type="button"
          onMouseEnter={() => setHovered(n)} onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
          className="p-0.5 transition-transform hover:scale-110">
          <Star size={16} className={cn("transition-colors",
            (hovered ? n <= hovered : n <= value)
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-[--text-clr]"
          )} />
        </button>
      ))}
    </div>
  );
}

/* ─── UploadZone ─────────────────────────────────── */
export function UploadZone({ label="Click to upload", hint, tall, value, onChange }: {
  label?: string; hint?: string; tall?: boolean;
  value?: string;
  onChange?: (file: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { setPreview(value || null); }, [value]);

  const handle = (file: File) => {
    const r = new FileReader();
    r.onload = e => setPreview(e.target?.result as string);
    r.readAsDataURL(file);
    onChange?.(file);
  };

  return (
    <div
      onClick={() => ref.current?.click()}
      onDragOver={e => e.preventDefault()}
      onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handle(f); }}
      className={cn(
        "relative cursor-pointer rounded-lg border-2 border-dashed border-border bg-[--compt-bg]",
        "flex items-center justify-center hover:border-[--btn-primary]/50 transition-colors",
        tall ? "h-[100px]" : "h-[72px]"
      )}>
      <input ref={ref} type="file" className="hidden" accept="image/*"
        onChange={e => { const f = e.target.files?.[0]; if (f) handle(f); }} />
      {preview ? (
        <div className="relative w-full h-full rounded overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="preview" className="w-full h-full object-cover" />
          <button type="button"
            onClick={e => { e.stopPropagation(); setPreview(null); onChange?.(null); }}
            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center">
            <X size={10} className="text-white" />
          </button>
        </div>
      ) : (
        <div className="text-center">
          <Upload size={16} className="mx-auto mb-1 text-[--text-clr]" />
          <p className="text-[11px] text-[--text-clr]">{label}</p>
          {hint && <p className="text-[9px] text-[--text-clr]/50 mt-0.5">{hint}</p>}
        </div>
      )}
    </div>
  );
}

/* ─── ScreenshotGrid ──────────────────────────────── */
export function ScreenshotGrid({ existingUrls=[], onChange }: {
  existingUrls?: string[];
  onChange?: (files: File[]) => void;
}) {
  const [slots, setSlots] = useState<(string|File)[]>(existingUrls);
  const ref = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setSlots(existingUrls); }, [existingUrls.join(",")]);

  const add = (file: File) => {
    if (slots.length >= 5) return;
    const next = [...slots, file];
    setSlots(next);
    onChange?.(next.filter((s): s is File => s instanceof File));
  };
  const remove = (i: number) => {
    const next = slots.filter((_,j) => j !== i);
    setSlots(next);
    onChange?.(next.filter((s): s is File => s instanceof File));
  };
  const getPreview = (slot: string|File) =>
    typeof slot === "string" ? slot : URL.createObjectURL(slot);

  return (
    <div className="grid grid-cols-3 gap-1.5">
      {slots.map((s,i) => (
        <div key={i} className="relative h-[60px] rounded overflow-hidden border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={getPreview(s)} alt={`shot-${i}`} className="w-full h-full object-cover" />
          <button type="button" onClick={() => remove(i)}
            className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/60 flex items-center justify-center">
            <X size={8} className="text-white" />
          </button>
        </div>
      ))}
      {slots.length < 5 && (
        <button type="button" onClick={() => ref.current?.click()}
          className="h-[60px] rounded border-2 border-dashed border-border bg-[--compt-bg] hover:border-[--btn-primary]/50 flex items-center justify-center text-[--text-clr] transition-colors">
          <input ref={ref} type="file" className="hidden" accept="image/*"
            onChange={e => { const f = e.target.files?.[0]; if (f) add(f); }} />
          <Upload size={12} />
        </button>
      )}
    </div>
  );
}

/* ─── List helpers ────────────────────────────────── */
export function ListHeader({ title, count, search, onSearch, onAdd }: {
  title: string; count: number; search: string;
  onSearch: (v: string) => void; onAdd: () => void;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-[10px] text-[--text-clr]">{count} record{count !== 1 ? "s" : ""} total</p>
      </div>
      <div className="flex-1" />
      <div className="relative">
        <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[--text-clr]" />
        <Input placeholder="Search…" value={search} onChange={e => onSearch(e.target.value)}
          className="pl-7 w-48 h-8 text-[12px]" />
      </div>
      <Button size="sm" onClick={onAdd} className="h-8 text-[12px]">
        <Plus size={13} className="mr-1" /> Add New
      </Button>
    </div>
  );
}

export function DeleteDialog({ open, name, onConfirm, onCancel, loading }: {
  open: boolean; name: string; onConfirm: () => void; onCancel: () => void; loading?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onCancel()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle size={18} /> Confirm Delete
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-[--text-clr] py-2">
          Delete <span className="font-semibold text-[--text-clr-light]">"{name}"</span>? This cannot be undone.
        </p>
        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={onCancel} className="text-[12px]" disabled={loading}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading} className="text-[12px] h-8">
            {loading
              ? <><Loader2 size={12} className="mr-1.5 animate-spin" />Deleting…</>
              : <><Trash2 size={12} className="mr-1.5" />Delete</>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function RowActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex gap-1.5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={onEdit}>
              <Pencil size={11} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon"
              className="h-7 w-7 hover:border-destructive hover:text-destructive" onClick={onDelete}>
              <Trash2 size={11} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export function EmptyState({ icon, label, onAdd }: { icon: string; label: string; onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-5xl mb-4 opacity-20">{icon}</div>
      <p className="text-sm text-[--text-clr] mb-4">No {label} added yet</p>
      <Button size="sm" onClick={onAdd}>
        <Plus size={12} className="mr-1.5" /> Add First {label.replace(/s$/,"")}
      </Button>
    </div>
  );
}

export function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <Loader2 size={32} className="animate-spin mb-3 text-[--btn-primary]" />
      <p className="text-sm text-[--text-clr]">Loading {label}…</p>
    </div>
  );
}

export function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 mb-4 text-[12px]">
      <AlertTriangle size={14} className="text-destructive flex-shrink-0" />
      <span className="text-[--text-clr] flex-1">{message}</span>
      <Button size="sm" variant="outline" className="h-7 text-[11px]" onClick={onRetry}>Retry</Button>
    </div>
  );
}

export function BackBreadcrumb({ section, isEdit, onBack }: {
  section: string; isEdit: boolean; onBack: () => void;
}) {
  return (
    <div className="flex-shrink-0 flex items-center gap-2 px-6 pt-4 pb-2 border-b">
      <button onClick={onBack}
        className="flex items-center gap-1.5 text-[11px] text-[--text-clr] hover:text-[--btn-primary] transition-colors">
        <ChevronLeft size={13} /> Back to list
      </button>
      <Separator orientation="vertical" className="h-3" />
      <span className="text-[12px] font-semibold">{isEdit ? `Edit ${section}` : `Add ${section}`}</span>
    </div>
  );
}

export function SubmitBar({ label, loading, onSubmit, onCancel }: {
  label: string; loading: boolean; onSubmit: () => void; onCancel?: () => void;
}) {
  return (
    <div className="flex-shrink-0 border-t bg-[--app-bg] px-6 py-3 flex items-center justify-between">
      <p className="text-[10px] text-[--text-clr]">
        Fields marked <span className="text-[--btn-primary]">*</span> are required
      </p>
      <div className="flex gap-2">
        {onCancel && (
          <Button variant="ghost" onClick={onCancel} className="h-8 px-4 text-[12px]" disabled={loading}>
            Cancel
          </Button>
        )}
        <Button onClick={onSubmit} disabled={loading} className="h-8 px-5 text-[12px]">
          {loading
            ? <><Loader2 size={12} className="mr-1.5 animate-spin" />Saving…</>
            : <><Check size={12} className="mr-1.5" />{label}</>}
        </Button>
      </div>
    </div>
  );
}