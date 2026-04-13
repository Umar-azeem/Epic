// app/developerForum/layout.tsx
import SideBar from "./components/sideBar";
import { SidebarProvider } from "@/src/components/ui/sidebar";
import Footer from "@/src/components/footer";

export default function DeveloperForumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-primary flex overflow-hidden text-white">
      <SidebarProvider>
        <aside className=" md:w-84 h-screen overflow-y-auto sidebar-scroll ">
          {" "}
          <SideBar />{" "}
        </aside>{" "}
        {/* MAIN LAYOUT */}{" "}
        <main className="flex-1 h-screen overflow-y-auto bg-primary main-scroll">
          {" "}
          <div className="min-h-full"> {children} </div>{" "}
        </main>
      </SidebarProvider>
    </div>
  );
}
