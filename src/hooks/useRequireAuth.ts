// src/hooks/useRequireAuth.ts
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRequireAuth() {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push("/login?redirect=" + window.location.pathname);
    }
  }, [loading, token, router]);

  return { isAuthenticated: !!token, loading };
}