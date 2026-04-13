"use client";

import { useIsAdmin } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = useIsAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      console.log("Not authenticated, redirecting to login...");
      localStorage.setItem("redirectAfterLogin", "/admin");
      router.push("/auth");
    }
  }, [isAdmin]);
  //
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-[#121212]">
  //       <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
  //     </div>
  //   );
  // }
  //
  // if (!isAuthenticated || !token) {
  //   return null;
  // }


  return (<>{children}</>)
}
