"use client";

import { useState } from "react";
import { Gamepad2, Tags, Rocket, Star, LucideIcon } from "lucide-react";
import { Separator } from "@/src/components/ui/separator";
import { cn } from "@/src/lib/utils";

import GamesSection     from "./GamesSection";
import PublishersSection from "./PublishersSection";
import GenresSection    from "./GenresSection";
import ReviewsSection   from "./ReviewsSection";

/* ═══════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════ */
type NavItem = { id: string; label: string; icon: LucideIcon };
const NAV: NavItem[] = [
  { id: "games",      label: "Games",      icon: Gamepad2 },
  { id: "publishers", label: "Publishers", icon: Tags     },
  { id: "genres",     label: "Genres",     icon: Rocket   },
  { id: "reviews",    label: "Reviews",    icon: Star     },
];
type NavId = typeof NAV[number]["id"];

/* ═══════════════════════════════════════════════════
   ROOT SHELL
═══════════════════════════════════════════════════ */
export default function AdminPage() {
  const [page, setPage] = useState<NavId>("games");

  return (
    <div
      className="flex h-screen overflow-hidden text-[oklch(0.88_0.005_285)]"
      style={{
        background: "var(--app-bg)",
        ["--background" as string]: "var(--app-bg)",
        ["--card" as string]:       "var(--app-bg-secondary)",
        ["--muted" as string]:      "var(--compt-bg)",
        ["--accent" as string]:     "var(--compt-bg)",
        ["--border" as string]:     "oklch(0.28 0.008 285)",
        ["--foreground" as string]:           "oklch(0.88 0.005 285)",
        ["--muted-foreground" as string]:     "oklch(0.65 0.005 285)",
        ["--card-foreground" as string]:      "oklch(0.88 0.005 285)",
        ["--popover-foreground" as string]:   "oklch(0.88 0.005 285)",
        ["--secondary-foreground" as string]: "oklch(0.88 0.005 285)",
        ["--accent-foreground" as string]:    "oklch(0.88 0.005 285)",
        ["--primary" as string]:              "var(--btn-primary)",
        ["--primary-foreground" as string]:   "oklch(1 0 0)",
        ["--input" as string]:                "var(--compt-bg)",
        ["--ring" as string]:                 "var(--btn-primary)",
      }}
    >
      {/* SIDEBAR */}
      <aside className="w-[210px] flex-shrink-0 bg-[--app-bg-secondary] border-r flex flex-col">
        <div className="flex items-center gap-3 px-4 py-5 border-b">
          <div className="w-9 h-9 rounded-lg bg-[--btn-primary] flex items-center justify-center text-base text-white">
            🎮
          </div>
          <div>
            <p className="text-[16px] font-bold tracking-wide leading-none">GAMEVAULT</p>
            <p className="text-[9px] tracking-[3px] uppercase text-[--text-clr] mt-0.5">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 py-3">
          <p className="text-[9px] font-semibold tracking-[3px] uppercase text-[--text-clr] px-4 mb-2">
            Management
          </p>
          {NAV.map(n => {
            const Icon = n.icon;
            return (
              <button
                key={n.id}
                onClick={() => setPage(n.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium border-l-2 transition-all text-left",
                  page === n.id
                    ? "border-[--btn-primary] text-[--btn-primary] bg-[--btn-primary]/10"
                    : "border-transparent text-[--text-clr] hover:text-[--text-clr-light] hover:bg-[--compt-bg]"
                )}
              >
                <Icon size={18} />
                <span>{n.label}</span>
              </button>
            );
          })}
        </nav>

        <Separator />
        <div className="px-4 py-3 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[--btn-primary] flex items-center justify-center text-[11px] font-bold text-white">
            A
          </div>
          <div>
            <p className="text-[11px] font-semibold">Admin</p>
            <p className="text-[9px] text-[--text-clr]">admin@gamevault.com</p>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="h-[50px] flex-shrink-0 bg-[--app-bg-secondary] border-b flex items-center gap-2.5 px-6">
          <span className="text-lg font-bold capitalize">{page}</span>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-[10px] text-[--text-clr]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            All systems operational
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {page === "games"      && <GamesSection />}
          {page === "publishers" && <PublishersSection />}
          {page === "genres"     && <GenresSection />}
          {page === "reviews"    && <ReviewsSection />}
        </div>
      </div>
    </div>
  );
}