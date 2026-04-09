"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { ItemMedia } from "@/src/components/ui/item";

interface Props {
  label: string;
  data: any;
  sectionType: "A" | "B" | "C" | "D";
  bgColor?: string;
}

export default function Fortnite({
  label,
  data,
  sectionType,
  bgColor,
}: Props) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();

  const getSectionSlice = (type: "A" | "B" | "C" | "D") => {
    const sliceMap = {
      A: { start: 0, end: 3 },   // Items 1, 2, 3
      B: { start: 3, end: 6 },   // Items 4, 5, 6
      C: { start: 6, end: 9 },   // Items 7, 8, 9
      D: { start: 9, end: 12 },  // Items 10, 11, 12
    };
    return sliceMap[type];
  };

  const gamesArray = Array.isArray(data?.games)
    ? data.games
        .filter((item: any) => {
          const hasButtonLink =
            item.button?.link && item.button.link.trim() !== "";

          const matchesLabel =
            item.label?.trim().toLowerCase() ===
            label?.trim().toLowerCase();

          const matchesSectionType = item.sectionType === sectionType;

          console.log("Filter:", {
            title: item.title,
            label: item.label,
            sectionType: item.sectionType,
            hasButtonLink,
            matchesLabel,
            matchesSectionType,
          });

          return hasButtonLink && matchesLabel && matchesSectionType;
        })
        .slice(
          getSectionSlice(sectionType).start,
          getSectionSlice(sectionType).end
        )
    : [];

  console.log(
    `Label: ${label}, Section: ${sectionType} - Found ${gamesArray.length} games`
  );

  return (
    <div className="text-white py-6" style={{ background: bgColor }}>
      <div className="flex justify-between items-center mb-6 px-4">
        <div>
          <h2 className="text-xl font-semibold">{label}</h2>
          <p className="text-xs text-gray-400 mt-1">Section {sectionType}</p>
        </div>
        {gamesArray[0]?.viewMore && (
          <Button variant="outline" className="bg-transparent text-sm px-4 py-2">
            View More
          </Button>
        )}
      </div>

      {gamesArray.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4">
          {gamesArray.map((item: any) => (
            <div
              key={item._id}
              className={`rounded-lg overflow-hidden transition-transform duration-200 ${
                hoveredItem === item._id ? "-translate-y-1" : ""
              }`}
              onMouseEnter={() => setHoveredItem(item._id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative h-48 w-full rounded-lg overflow-hidden">
                {item.image ? (
                  <Image
                     src={item.image}
                    alt={item.title}
                    width={100}
                    height={150}
                    className="object-cover h-full w-full"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              <div className="pt-3 pb-1 px-1">
                <h3 className="text-base font-bold mb-1">{item.title}</h3>

                {item.description && (
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    {item.description}
                  </p>
                )}

                {item.button?.link && (
                  <Button
                    className="mt-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border border-gray-600 cursor-pointer"
                    onClick={() => {
                      window.open(item.button.link, "_blank");
                    }}
                  >
                    {item.button.text || "Open"}
                    <ExternalLink size={14} className="ml-1" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          No games found for "{label}" - Section {sectionType}
        </div>
      )}
    </div>
  );
}