// src/app/admin/layout.tsx
// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <>{children}</>;
// }


// src/app/admin/layout.tsx
// src/app/admin/layout.tsx - Temporary fix
"use client";

import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || !token) {
        console.log("Not authenticated, redirecting to login...");
        localStorage.setItem("redirectAfterLogin", "/admin");
        router.push("/login");
      }
    }
  }, [loading, isAuthenticated, token, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !token) {
    return null;
  }

  return <>{children}</>;
}