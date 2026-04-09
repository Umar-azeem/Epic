import SectionColumn from "./SectionColumn";

interface GamesListProps {
  data: any; 
  sectionkey: string[];
  bgColor?: string;
}

export default function GamesList({
  data,
  sectionkey,
  bgColor = "transparent",
}: GamesListProps) {

  const gamesArray = Array.isArray(data?.games) 
    ? data.games 
    : Array.isArray(data) && data[0]?.games
    ? data[0].games
    : [];
  
  if (!Array.isArray(gamesArray) || sectionkey.length === 0) return null;
   console.log("Games Array:", gamesArray);
  return (
    <div className="min-h-screen text-white" style={{ background: bgColor }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 divide-x divide-gray-700">
        {sectionkey.map((section) => {
          const sectionGames = gamesArray.filter((game) => {  
            const sectionMatch =
              game.sectionKey?.trim().toLowerCase() ===
              section.trim().toLowerCase();
           
            if (!sectionMatch) return false;
            if (section === "Top Sellers" || section === "New Releases" ) {
              return game.priceType === "paid";
            }
            if (section === "Top Free to Play" || section === "Top Player Rated") {
              return game.priceType === "free";
            }
            if (section === "Top Upcoming Wishlisted" || section === "Coming Soon") {
              return  game.priceType === "freemium" ;
            }
            return true;
          });
          
          if (sectionGames.length === 0) return null;
          return (
            <SectionColumn
              key={section}
              data={sectionGames}
              sectionkey={section}
            />
          );
        })}
      </div>
    </div>
  );
}