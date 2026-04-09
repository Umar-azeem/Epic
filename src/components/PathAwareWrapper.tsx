"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";
import Topber from "./topber";

export default function PathAwareWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const hideFooter = pathname.startsWith("/developerForum");
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div>
      {!isAdmin && <Topber />}
      {children}
      {!hideFooter && !isAdmin && <Footer />}
    </div>
  );
}