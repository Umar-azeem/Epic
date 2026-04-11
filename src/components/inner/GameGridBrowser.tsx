"use client";
import * as React from "react";
import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

type Game = {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  price?: number;
};

export default function GameGridBrowser({ gameArray }: { gameArray: Game[] }) {
  // ✅ Step 1: Filter state
  const [globalFilter, setGlobalFilter] = useState("");
  const [labelFilter, setLabelFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const containsFilter = (row: any, id: string, value: string) => {
    if (!value) return true;
    return String(row.getValue(id))
      ?.toLowerCase()
      .includes(value.toLowerCase());
  };
  const columns: ColumnDef<Game>[] = [
    {
      accessorKey: "label",
      filterFn: containsFilter,
    },
    {
      accessorKey: "sectionKey",
      filterFn: containsFilter,
    },
    {
      accessorKey: "status",
      filterFn: containsFilter,
    },
    {
      accessorKey: "priceType",
      filterFn: containsFilter,
    },
    {
      accessorKey: "genres",
      filterFn: (row, id, value) => {
        if (!value) return true;
        const genres = row.getValue(id) as string[];
        return genres?.some((g) =>
          g.toLowerCase().includes(value.toLowerCase()),
        );
      },
    },
    {
      accessorKey: "platforms",
      filterFn: (row, id, value) => {
        if (!value) return true;
        const platforms = row.getValue(id) as string[];
        return platforms?.some((p) =>
          p.toLowerCase().includes(value.toLowerCase()),
        );
      },
    },
    { accessorKey: "title" },
    { accessorKey: "subtitle" },
    { accessorKey: "slug" },
    { accessorKey: "category" },
    { accessorKey: "priceType" },
    { accessorKey: "status" },
    { accessorKey: "platforms" },
    { accessorKey: "genres" },
  ];

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
  const columnFilters = useMemo(() => {
    const filters: any[] = [];

    if (labelFilter) filters.push({ id: "label", value: labelFilter });
    if (sectionFilter) filters.push({ id: "sectionKey", value: sectionFilter });
    if (statusFilter) filters.push({ id: "status", value: statusFilter });
    if (priceFilter) filters.push({ id: "priceType", value: priceFilter });
    if (genreFilter) filters.push({ id: "genres", value: genreFilter });
    if (platformFilter)
      filters.push({ id: "platforms", value: platformFilter });

    return filters;
  }, [
    labelFilter,
    sectionFilter,
    statusFilter,
    priceFilter,
    genreFilter,
    platformFilter,
  ]);

  // ✅ Step 3: Create table instance
  const table = useReactTable({
    data: gameArray || [],
    columns,
    state: {
      globalFilter,
      columnFilters, // ✅ dynamic filters
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // ✅ Step 4: Get filtered rows
  const filteredGames = table.getRowModel().rows;

  type FilterSectionProps = {
    title: string;
    items: string[];
    selected: string;
    setSelected: (val: string) => void;
  };

  const FilterSection = ({
    title,
    items,
    selected,
    setSelected,
  }: FilterSectionProps) => {
    return (
      <AccordionItem value={title}>
        <AccordionTrigger className="text-sm font-medium text-white hover:no-underline">
          {title}
        </AccordionTrigger>

        <AccordionContent>
          <ul className="space-y-2 pt-2">
            {items.map((item) => {
              const isActive = selected === item;

              return (
                <li
                  key={item}
                  onClick={
                    () => setSelected(isActive ? "" : item) // toggle
                  }
                  className={`text-sm cursor-pointer transition-colors ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </AccordionContent>
      </AccordionItem>
    );
  };
  return (
    <div className="flex gap-4 ">
      <div>
        {/* 🔍 FILTER INPUT (your custom UI, not shadcn) */}
        <div className="flex  flex-row gap-3 mb-4">
          {/* 🔍 Search */}
          <input
            type="text"
            placeholder="Search games..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="p-2 text-xs md:text-md w-18  md:w-38 bg-primary text-white rounded-md outline-none"
          />

          {/* 🏷 Label Filter */}
          <select
            value={labelFilter}
            onChange={(e) => setLabelFilter(e.target.value)}
            className="p-1 w-24 outline-none text-sm bg-primary text-text-clr-light rounded-md"
          >
            <option value="">All Labels</option>
            {LabelOptions.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>

          {/* 📂 Section Filter */}
          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="p-1 w-24 outline-none text-sm bg-primary text-text-clr-light rounded-md"
          >
            <option value="" className="text-sm rounded-2xl">
              All Sections
            </option>
            {sectionOptions.map((sec) => (
              <option key={sec} value={sec} className="m-2">
                {sec}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGames.map((row) => {
            const game = row.original;

            return (
              <div
                key={game._id}
                className="rounded-lg overflow-hidden transition-all cursor-pointer group relative"
              >
                <div className="relative h-64">
                  <Image
                    height={300}
                    width={300}
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
 
                <div className="py-3 space-y-2">
                  {game.subtitle && (
                    <p className="text-[11px] font-semibold text-gray-400">
                      {game.subtitle}
                    </p>
                  )}

                  <h3 className="text-lg font-bold text-white">{game.title}</h3>

                  <h4 className="text-sm font-medium bg-primary text-text-clr-light py-0.5 w-24 text-center rounded-sm ">
                    now on epic
                  </h4>

                  <p className="text-sm text-white">$ {game.price ?? 6.99}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="w-64 text-white bg-primary p-4 rounded-xl border border-text-clr/30 hidden md:flex flex-col ">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Filters (2)</h2>
            <button
              onClick={() => {
                setGlobalFilter("");
                setLabelFilter("");
                setSectionFilter("");
                setStatusFilter("");
                setPriceFilter("");
                setGenreFilter("");
                setPlatformFilter("");
              }}
              className="text-blue-400 text-sm hover:text-blue-300"
            >
              reset
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={16}
            />
            <Input
              placeholder="Keywords"
              className="pl-9 bg-[#1b1b1f] border-[#2a2a2f] text-white placeholder:text-gray-500"
            />
          </div>

          {/* Filters */}
          <Accordion
            type="multiple"
            defaultValue={["Events"]}
            className="space-y-1"
          >
            <FilterSection
              title="Status"
              items={["active", "inactive", "coming_soon", "early_access"]}
              selected={statusFilter}
              setSelected={setStatusFilter}
            />

            <FilterSection
              title="Price"
              items={["paid", "free", "freemium"]}
              selected={priceFilter}
              setSelected={setPriceFilter}
            />

            <FilterSection
              title="Genre"
              items={["Action", "RPG", "Shooter", "Strategy", "Puzzle"]}
              selected={genreFilter}
              setSelected={setGenreFilter}
            />

            <FilterSection
              title="Platform"
              items={["PC", "PS", "Xbox", "Mobile", "Switch"]}
              selected={platformFilter}
              setSelected={setPlatformFilter}
            />
          </Accordion>
        </div>
      </div>
    </div>
  );
}
