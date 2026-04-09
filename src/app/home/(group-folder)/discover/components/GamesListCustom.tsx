import SectionColumn from "./SectionColumn";

interface GamesListProps {
  data: any;
  sectionkey?: string[];
  bgColor?: string;
}

// Predefined sections jo ignore karne hain
const PREDEFINED_SECTIONS = [
  "Top Sellers",
  "New Releases",
  "Top Free to Play",
  "Top Player Rated",
  "Top Upcoming Wishlisted",
  "Coming Soon",
];

export default function GamesListCustom({
  data,
  sectionkey = [],
  bgColor = "transparent",
}: GamesListProps) {
  // Extract actual games array from response object
  const gamesArray = Array.isArray(data?.games)
    ? data.games
    : Array.isArray(data) && data[0]?.games
    ? data[0].games
    : Array.isArray(data)
    ? data
    : [];

  if (!Array.isArray(gamesArray) || gamesArray.length === 0) return null;

  // Check agar custom sections hain jo predefined nahi hain
  const customSections = (sectionkey || []).filter(
    (section) => !PREDEFINED_SECTIONS.includes(section)
  );

  let sectionsToDisplay: Array<{ label: string; priceTypes: string[] }> = [];

  if (customSections.length > 0) {
    // Agar custom (non-predefined) sections hain to unmhe use karo
    sectionsToDisplay = customSections.map((section) => ({
      label: section,
      priceTypes: getPriceTypesForSection(section),
    }));
  } else {
    // Warna default 3 columns by priceType
    sectionsToDisplay = [
      { label: "Paid Games", priceTypes: ["paid"] },
      { label: "Free to Play", priceTypes: ["free"] },
      { label: "Freemium", priceTypes: ["freemium"] },
    ];
  }

  return (
    <div className="min-h-screen text-white" style={{ background: bgColor }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 divide-x divide-gray-700">
        {sectionsToDisplay.map((section) => {
          let sectionGames;

          if (customSections.length > 0) {
            // Filter by both sectionKey AND priceType (custom mode)
            sectionGames = gamesArray.filter((game) => {
              const sectionMatch =
                game.sectionKey?.trim().toLowerCase() ===
                section.label.trim().toLowerCase();

              if (!sectionMatch) return false;
              return section.priceTypes.includes(game.priceType);
            });
          } else {
            // Filter only by priceType (auto 3-column mode)
            sectionGames = gamesArray.filter((game) =>
              section.priceTypes.includes(game.priceType)
            );
          }

          if (sectionGames.length === 0) return null;

          return (
            <SectionColumn
              key={section.label}
              data={sectionGames}
              sectionkey={section.label}
            />
          );
        })}
      </div>
    </div>
  );
}

// Helper function: Map section names to priceTypes
function getPriceTypesForSection(section: string): string[] {
  const section_lower = section.trim().toLowerCase();

  // Paid sections
  if (
    section_lower.includes("top seller") ||
    section_lower.includes("new release")
  ) {
    return ["paid"];
  }

  // Free sections
  if (
    section_lower.includes("top free") ||
    section_lower.includes("top player rated")
  ) {
    return ["free"];
  }

  // Freemium sections
  if (
    section_lower.includes("top upcoming") ||
    section_lower.includes("coming soon") ||
    section_lower.includes("freemium")
  ) {
    return ["freemium"];
  }

  // Default: try to match the section name as-is
  return [];
}