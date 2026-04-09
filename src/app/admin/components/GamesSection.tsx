"use client";

import { useEffect, useCallback, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Switch } from "@/src/components/ui/switch";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { cn } from "@/src/lib/utils";

import {
  API,
  Game,
  GameButton,
  GameStatus,
  PriceType,
  SectionType,
  SysSpec,
  PLATFORMS,
  GENRES,
  SYS_FIELDS,
  slugify,
  Field,
  StatusBadge,
  StarRatingInput,
  UploadZone,
  ScreenshotGrid,
  ListHeader,
  DeleteDialog,
  RowActions,
  EmptyState,
  LoadingState,
  ErrorBanner,
  BackBreadcrumb,
  SubmitBar,
} from "./shared";
const LabelOptions = [
  "season sale spotlight",
  "top new releases",
  "discover something new",
  "Early Access",
  "Deals of the Week",
  "FreeGames",
  "Fortnite",
];
const sectionOptions = [
  "Top Sellers",
  "Top Free to Play",
  "Top Upcoming Wishlisted",
  "New Releases",
  "Top Player Rated",
  "Coming Soon",
];
/* ═══════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════ */
const emptySys: SysSpec = {
  os: "",
  cpu: "",
  ram: "",
  gpu: "",
  storage: "",
  directX: "",
  network: "",
};

const emptyButton: GameButton = {
  enabled: false,
  text: "",
  type: "",
  style: "",
  link: "",
};

type GameFormState = Omit<Game, "_id"> & {
  imageFile: File | null;
  coverImageFile: File | null;
  screenshotFiles: File[];
};

const gameInit: GameFormState = {
  title: "",
  slug: "",
  description: "",
  label: "",
  category: "",
  saleOfTheWeek: "",
  tag: "",
  priceText: "",
  price: 0,
  originalPrice: 0,
  currentPrice: 0,
  discount: 0,
  rating: 0,
  availableDate: "",
  releaseDate: "",
  sectionType: "A",
  sectionKey: "",
  priceType: "paid",
  status: "active",
  platforms: [],
  genres: [],
  viewMore: false,
  viewAll: false,
  featured: false,
  isFree: false,
  totalAvailable: false,
  // ✅ button object
  button: { ...emptyButton },
  image: "",
  mainImage: "",
  coverImage: "",
  screenshots: [],
  sysMin: { ...emptySys },
  sysRec: { ...emptySys },
  imageFile: null,
  coverImageFile: null,
  screenshotFiles: [],
};

/* ═══════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════ */
export default function GamesSection() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editId, setEditId] = useState<string | null>(null);
  const [f, setF] = useState<GameFormState>(gameInit);
  const [reqTab, setReqTab] = useState("sysMin");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [delLoading, setDelLoading] = useState(false);
  const [delId, setDelId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);

  /* ── fetch ── */
  const fetchGames = useCallback(async () => {
    setFetching(true);
    setError(null);
    try {
      const res = await fetch(`${API}/games`);
      const data = await res.json();
      setGames(
        Array.isArray(data.games)
          ? data.games
          : Array.isArray(data)
            ? data
            : [],
      );
    } catch {
      setError("Failed to load games. Check your connection.");
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  /* ── form helpers ── */
  const set = <K extends keyof GameFormState>(k: K, v: GameFormState[K]) =>
    setF((p) => ({ ...p, [k]: v }));

  // ✅ helper to update button fields
  const setBtn = (k: keyof GameButton, v: string | boolean) =>
    setF((p) => ({ ...p, button: { ...p.button, [k]: v } }));

  const toggleArr = (k: "platforms" | "genres", v: string) =>
    setF((p) => ({
      ...p,
      [k]: (p[k] as string[]).includes(v)
        ? (p[k] as string[]).filter((x) => x !== v)
        : [...(p[k] as string[]), v],
    }));

  const setSys = (side: "sysMin" | "sysRec", k: string, v: string) =>
    setF((p) => ({ ...p, [side]: { ...p[side], [k]: v } }));

  /* ── open / close ── */
  const openAdd = () => {
    setF(gameInit);
    setEditId(null);
    setView("form");
  };
  const openEdit = (g: Game) => {
    const { _id, ...rest } = g;
    setF({
      ...gameInit,
      ...rest,
      button: rest.button ?? { ...emptyButton },
      imageFile: null,
      coverImageFile: null,
      screenshotFiles: [],
    });
    setEditId(_id);
    setView("form");
  };
  const cancel = () => {
    setView("list");
    setEditId(null);
  };

  /* ── save via FormData (backend expects multipart with "data" field) ── */
  const handleSave = async () => {
    if (!f.title.trim()) return;
    setLoading(true);
    try {
      const { imageFile, coverImageFile, screenshotFiles, ...payload } = f;

      const fd = new FormData();

      // ✅ Send all non-file fields as JSON string in "data" field
      // Backend does: const body = req.body.data ? JSON.parse(req.body.data) : req.body
      fd.append("data", JSON.stringify(payload));

      // ✅ Attach image files only if user selected new ones
      if (imageFile) {
        fd.append("image", imageFile, imageFile.name);
      }
      if (coverImageFile) {
        fd.append("coverImage", coverImageFile, coverImageFile.name);
      }
      screenshotFiles.forEach((file) => {
        fd.append("screenshots", file, file.name);
      });

      const url = editId ? `${API}/games/${editId}` : `${API}/games`;
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: fd });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Save failed (${res.status}): ${txt}`);
      }

      const saved = await res.json();
      const game: Game = saved.game ?? saved;

      setGames((prev) =>
        editId
          ? prev.map((g) => (g._id === editId ? game : g))
          : [...prev, game],
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
      const res = await fetch(`${API}/games/${delId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setGames((prev) => prev.filter((g) => g._id !== delId));
      setDelId(null);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDelLoading(false);
    }
  };

  const filtered = games.filter(
    (g) =>
      (g.title ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (g.category ?? "").toLowerCase().includes(search.toLowerCase()),
  );
  const toDelete = delId ? games.find((g) => g._id === delId) : null;

  /* ════════ FORM VIEW ════════ */
  if (view === "form")
    return (
      <div className="flex flex-col h-full min-h-0">
        <BackBreadcrumb section="Game" isEdit={!!editId} onBack={cancel} />

        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="px-6 py-4 space-y-4">
            {/* Basic Info */}
            <Card>
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-[11px] tracking-[2px] uppercase text-[--text-clr]">
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Title" required>
                    <Input
                      placeholder="Game title"
                      value={f.title}
                      onChange={(e) => {
                        set("title", e.target.value);
                        set("slug", slugify(e.target.value));
                      }}
                    />
                  </Field>
                  <Field label="Slug" hint="Auto-generated">
                    <Input
                      placeholder="game-slug"
                      value={f.slug}
                      onChange={(e) => set("slug", e.target.value)}
                      className="font-mono"
                    />
                  </Field>
                </div>
                <Field label="Description">
                  <Textarea
                    placeholder="Game description…"
                    value={f.description}
                    onChange={(e) => set("description", e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                </Field>
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Label">
                    <div className="flex gap-2">
                      {/* Dropdown */}
                      <select
                        className="border px-2 py-2 rounded w-1/2 bg-app-secondary"
                        value={
                          LabelOptions.includes(f.label ?? "")
                            ? f.label
                            : "custom"
                        }
                        onChange={(e) => {
                          const value = e.target.value;
                          set("label", value === "custom" ? "" : value);
                        }}
                      >
                        <option value="" disabled>
                          Select an option
                        </option>

                        {LabelOptions.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}

                        <option value="custom">Custom</option>
                      </select>

                      {/* Custom Input - Show when "custom" is selected */}
                      {!LabelOptions.includes(f.label ?? "") && (
                        <Input
                          placeholder="Enter custom value"
                          value={f.label ?? ""}
                          onChange={(e) => set("label", e.target.value)}
                          className="w-1/2"
                        />
                      )}
                    </div>
                  </Field>

                  {/*<Field label="Label">
                    <Input
                      placeholder="e.g., Fortnite"
                      value={f.label ?? ""}
                      onChange={(e) => set("label", e.target.value)}
                    />
                  </Field> */}
                  <Field label="Category">
                    <Input
                      placeholder="e.g., Action"
                      value={f.category ?? ""}
                      onChange={(e) => set("category", e.target.value)}
                    />
                  </Field>
                  <Field label="Deals Of The Week">
                    <Input
                      placeholder="e.g., -30% , Deals Of The Week"
                      value={f.saleOfTheWeek ?? ""}
                      onChange={(e) => set("saleOfTheWeek", e.target.value)}
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Tag">
                    <Input
                      placeholder="e.g., Bestseller,Trial Available,Bese Game"
                      value={f.tag ?? ""}
                      onChange={(e) => set("tag", e.target.value)}
                    />
                  </Field>
                  <Field label="Price Text">
                    <Input
                      placeholder="e.g., $19.99"
                      value={f.priceText ?? ""}
                      onChange={(e) => set("priceText", e.target.value)}
                    />
                  </Field>
                </div>
              </CardContent>
            </Card>

            {/* Media */}
            <Card>
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-[11px] tracking-[2px] uppercase text-[--text-clr]">
                  Media Assets
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <Field label="Main Image" required>
                  <UploadZone
                    tall
                    label="Click to upload main image"
                    hint="Recommended 1920×1080 · PNG, JPG, WebP"
                    value={f.image || f.mainImage}
                    onChange={(file) => set("imageFile", file)}
                  />
                  {f.imageFile && (
                    <p className="text-[9px] text-green-500 mt-0.5">
                      ✓ {f.imageFile.name} (
                      {(f.imageFile.size / 1024).toFixed(0)} KB)
                    </p>
                  )}
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Cover Image">
                    <UploadZone
                      label="Upload cover"
                      hint="600×800 recommended"
                      value={f.coverImage}
                      onChange={(file) => set("coverImageFile", file)}
                    />
                  </Field>
                  <Field label="Screenshots (up to 5)">
                    <ScreenshotGrid
                      existingUrls={f.screenshots ?? []}
                      onChange={(files) => set("screenshotFiles", files)}
                    />
                  </Field>
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Dates */}
            <Card>
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-[11px] tracking-[2px] uppercase text-[--text-clr]">
                  Pricing & Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <div className="grid grid-cols-4 gap-3">
                  <Field label="Price ($)">
                    <Input
                      type="number"
                      placeholder="0"
                      value={f.price}
                      onChange={(e) => set("price", +e.target.value)}
                    />
                  </Field>
                  <Field label="Original ($)">
                    <Input
                      type="number"
                      placeholder="0"
                      value={f.originalPrice}
                      onChange={(e) => set("originalPrice", +e.target.value)}
                    />
                  </Field>
                  <Field label="Current ($)">
                    <Input
                      type="number"
                      placeholder="0"
                      value={f.currentPrice}
                      onChange={(e) => set("currentPrice", +e.target.value)}
                    />
                  </Field>
                  <Field label="Discount (%)">
                    <Input
                      type="number"
                      placeholder="0"
                      value={f.discount}
                      onChange={(e) => set("discount", +e.target.value)}
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Available Date">
                    <Input
                      type="date"
                      value={f.availableDate ?? ""}
                      onChange={(e) => set("availableDate", e.target.value)}
                    />
                  </Field>
                  <Field label="Release Date">
                    <Input
                      type="date"
                      value={f.releaseDate ?? ""}
                      onChange={(e) => set("releaseDate", e.target.value)}
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Section Type">
                    <div className="flex gap-1.5">
                      {(["A", "B", "C", "D"] as SectionType[]).map((s) => (
                        <Button
                          key={s}
                          type="button"
                          size="sm"
                          variant={f.sectionType === s ? "default" : "outline"}
                          className="flex-1 font-mono text-[11px]"
                          onClick={() => set("sectionType", s)}
                        >
                          {s}
                        </Button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Section Key">
                    <div className="flex gap-2">
                      {/* Dropdown */}
                      <select
                        className="border px-2 py-2 rounded w-1/2 bg-app-secondary "
                        value={
                          sectionOptions.includes(f.sectionKey ?? "")
                            ? f.sectionKey
                            : "custom"
                        }
                        onChange={(e) => {
                          const value = e.target.value;

                          if (value === "custom") {
                            set("sectionKey", ""); // clear for typing
                          } else {
                            set("sectionKey", value);
                          }
                        }}
                      >
                        <option
                          value=""
                          className="bg-app-secondary text-text-clr-light"
                        >
                          Select option
                        </option>

                        {sectionOptions.map((opt, i) => (
                          <option
                            key={i}
                            value={opt}
                            className="bg-app-secondary text-text-clr-light m-2 text-md"
                          >
                            {opt}
                          </option>
                        ))}

                        <option value="custom">Custom</option>
                      </select>

                      {/* Custom Input */}
                      {(!sectionOptions.includes(f.sectionKey ?? "") ||
                        !f.sectionKey) && (
                        <Input
                          placeholder="Enter custom value"
                          value={f.sectionKey ?? ""}
                          onChange={(e) => set("sectionKey", e.target.value)}
                        />
                      )}
                    </div>
                  </Field>
                  <Field label="Price Type">
                    <div className="flex gap-1.5">
                      {(["paid", "free", "freemium"] as PriceType[]).map(
                        (v) => (
                          <Button
                            key={v}
                            type="button"
                            size="sm"
                            variant={f.priceType === v ? "default" : "outline"}
                            className="flex-1 text-[11px] capitalize"
                            onClick={() => set("priceType", v)}
                          >
                            {v}
                          </Button>
                        ),
                      )}
                    </div>
                  </Field>
                </div>
                <Field label="Rating">
                  <StarRatingInput
                    value={f.rating}
                    onChange={(v) => set("rating", v)}
                  />
                </Field>
              </CardContent>
            </Card>

            {/* Status & Platforms */}
            <Card>
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-[11px] tracking-[2px] uppercase text-[--text-clr]">
                  Status & Platforms
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <Field label="Status">
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        "active",
                        "inactive",
                        "coming_soon",
                        "early_access",
                      ] as GameStatus[]
                    ).map((v) => (
                      <Button
                        key={v}
                        type="button"
                        size="sm"
                        variant={f.status === v ? "default" : "outline"}
                        className="text-[11px] capitalize"
                        onClick={() => set("status", v)}
                      >
                        {v.replace("_", " ")}
                      </Button>
                    ))}
                  </div>
                </Field>
                <Field label="Platforms">
                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map((p) => (
                      <Button
                        key={p}
                        type="button"
                        size="sm"
                        variant={
                          f.platforms.includes(p) ? "default" : "outline"
                        }
                        className="text-[11px]"
                        onClick={() => toggleArr("platforms", p)}
                      >
                        {p}
                      </Button>
                    ))}
                  </div>
                </Field>
                <Field label="Genres">
                  <div className="flex flex-wrap gap-2">
                    {GENRES.map((g) => (
                      <Button
                        key={g}
                        type="button"
                        size="sm"
                        variant={f.genres.includes(g) ? "default" : "outline"}
                        className="text-[11px]"
                        onClick={() => toggleArr("genres", g)}
                      >
                        {g}
                      </Button>
                    ))}
                  </div>
                </Field>
              </CardContent>
            </Card>

            {/* ✅ Button Configuration */}
            <Card>
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-[11px] tracking-[2px] uppercase text-[--text-clr]">
                  Button Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-[12px] font-semibold">Enable Button</p>
                    <p className="text-[10px] text-[--text-clr]">
                      Show action button on this game
                    </p>
                  </div>
                  <Switch
                    checked={!!f.button?.enabled}
                    onCheckedChange={(v) => setBtn("enabled", v)}
                  />
                </div>

                {f.button?.enabled && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Button Text">
                        <Input
                          placeholder="e.g., Buy Now, See In Shop"
                          value={f.button.text}
                          onChange={(e) => setBtn("text", e.target.value)}
                        />
                      </Field>
                      <Field label="Button Link">
                        <Input
                          placeholder="https://... or /games/slug"
                          value={f.button.link}
                          onChange={(e) => setBtn("link", e.target.value)}
                        />
                      </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Button Type">
                        <div className="flex gap-1.5 flex-wrap">
                          {["buy_now", "paid", "free", "wishlist"].map((t) => (
                            <Button
                              key={t}
                              type="button"
                              size="sm"
                              variant={
                                f.button.type === t ? "default" : "outline"
                              }
                              className="text-[11px]"
                              onClick={() => setBtn("type", t)}
                            >
                              {t}
                            </Button>
                          ))}
                        </div>
                      </Field>
                      <Field label="Button Style">
                        <div className="flex gap-1.5">
                          {["primary", "secondary"].map((s) => (
                            <Button
                              key={s}
                              type="button"
                              size="sm"
                              variant={
                                f.button.style === s ? "default" : "outline"
                              }
                              className="flex-1 text-[11px] capitalize"
                              onClick={() => setBtn("style", s)}
                            >
                              {s}
                            </Button>
                          ))}
                        </div>
                      </Field>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* System Requirements */}
            <Card>
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-[11px] tracking-[2px] uppercase text-[--text-clr]">
                  System Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Tabs value={reqTab} onValueChange={setReqTab} className="mb-4">
                  <TabsList className="bg-primary">
                    <TabsTrigger value="sysMin" className="text-[11px]">
                      Minimum
                    </TabsTrigger>
                    <TabsTrigger value="sysRec" className="text-[11px]">
                      Recommended
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="grid grid-cols-2 gap-3">
                  {SYS_FIELDS.map(([k, lbl, ph]) => (
                    <Field key={k} label={lbl}>
                      <Input
                        placeholder={ph}
                        value={f[reqTab as "sysMin" | "sysRec"][k] ?? ""}
                        onChange={(e) =>
                          setSys(
                            reqTab as "sysMin" | "sysRec",
                            k,
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Visibility */}
            <Card>
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-[11px] tracking-[2px] uppercase text-[--text-clr]">
                  Visibility & Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      ["viewMore", "View More", "Show 'View More' button"],
                      ["viewAll", "View All", "Show 'View All' button"],
                      ["featured", "Featured", "Show in featured section"],
                      ["isFree", "Is Free", "Mark as free game"],
                      [
                        "totalAvailable",
                        "Total Available",
                        "Include in totals count",
                      ],
                    ] as [keyof GameFormState, string, string][]
                  ).map(([k, lbl, desc]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div>
                        <p className="text-[12px] font-semibold">{lbl}</p>
                        <p className="text-[10px] text-[--text-clr]">{desc}</p>
                      </div>
                      <Switch
                        checked={!!f[k]}
                        onCheckedChange={(v) =>
                          set(k, v as GameFormState[typeof k])
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <SubmitBar
          label={editId ? "Update Game" : "Add Game"}
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
        title="Games"
        count={games.length}
        search={search}
        onSearch={setSearch}
        onAdd={openAdd}
      />
      {error && <ErrorBanner message={error} onRetry={fetchGames} />}
      <DeleteDialog
        open={!!delId}
        name={toDelete?.title ?? ""}
        loading={delLoading}
        onConfirm={handleDelete}
        onCancel={() => setDelId(null)}
      />

      {fetching ? (
        <LoadingState label="games" />
      ) : filtered.length === 0 ? (
        <EmptyState icon="🎮" label="games" onAdd={openAdd} />
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px] tracking-widest">
                  Title
                </TableHead>
                <TableHead className="text-[10px] tracking-widest">
                  Category
                </TableHead>
                <TableHead className="text-[10px] tracking-widest">
                  Price
                </TableHead>
                <TableHead className="text-[10px] tracking-widest">
                  Status
                </TableHead>
                <TableHead className="text-[10px] tracking-widest">
                  Platforms
                </TableHead>
                <TableHead className="text-[10px] tracking-widest">
                  Rating
                </TableHead>
                <TableHead className="text-[10px] tracking-widest">
                  Button
                </TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((g) => (
                <TableRow key={g._id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {(g.image || g.mainImage) && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={g.image || g.mainImage}
                          alt={g.title}
                          className="w-8 h-8 rounded object-cover flex-shrink-0 border border-border"
                        />
                      )}
                      <div>
                        <p className="text-[12px] font-semibold">
                          {g.title || "—"}
                        </p>
                        <p className="text-[10px] text-[--text-clr] font-mono">
                          {g.slug}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-[11px] text-[--text-clr]">
                    {g.category || "—"}
                  </TableCell>
                  <TableCell>
                    <p className="text-[12px] font-semibold">${g.price}</p>
                    {g.discount > 0 && (
                      <p className="text-[10px] text-green-500">
                        -{g.discount}%
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge label={g.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(g.platforms ?? []).slice(0, 3).map((p) => (
                        <Badge
                          key={p}
                          variant="outline"
                          className="text-[9px] px-1.5 py-0"
                        >
                          {p}
                        </Badge>
                      ))}
                      {(g.platforms ?? []).length > 3 && (
                        <span className="text-[9px] text-[--text-clr]">
                          +{g.platforms.length - 3}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          size={10}
                          className={cn(
                            n <= g.rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-transparent text-[--text-clr]",
                          )}
                        />
                      ))}
                    </div>
                  </TableCell>
                  {/* ✅ show button status in list */}
                  <TableCell>
                    {g.button?.enabled && g.button?.link ? (
                      <span className="text-[9px] text-green-500 font-medium">
                        ✓ Has Link
                      </span>
                    ) : (
                      <span className="text-[9px] text-[--text-clr]">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <RowActions
                      onEdit={() => openEdit(g)}
                      onDelete={() => setDelId(g._id)}
                    />
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
