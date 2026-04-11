"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const router = useRouter();

  const isValidEmail = (e: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  };

  const emailError = touched && email && !isValidEmail(email);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setTouched(true);

    if (!email || !isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter password");
      return;
    }

    setLoading(true);

    try {
      console.log("1. Sending login request to backend...");
      
      const res = await fetch(
        "https://epic-backend-fslq.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      console.log("2. Response status:", res.status);
      
      const data = await res.json();
      console.log("3. Response data:", data);

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ SAVE TOKEN in localStorage AND AuthContext
      if (data.token) {
        console.log("4. Token received, saving to localStorage");
        localStorage.setItem("token", data.token);
        
        // ✅ Extract user data from token or response
        let userData = data.user;
        
        // If backend doesn't send user object, decode from token
        if (!userData && data.token) {
          try {
            console.log("5. Decoding token to get user data");
            const base64Url = data.token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decoded = JSON.parse(atob(base64));
            userData = { id: decoded.id, email: decoded.email, role: decoded.role };
            console.log("6. Decoded user data:", userData);
          } catch (e) {
            console.error("Failed to decode token", e);
          }
        }
        
        console.log("7. Calling login() from AuthContext with:", { token: data.token.substring(0, 20) + "...", userData });
        
        // Store in context
        login(data.token, userData);
      } else {
        console.error("No token in response!");
        throw new Error("No token received from server");
      }

      console.log("Login success:", data);

      // ✅ CHECK FOR REDIRECT AFTER LOGIN (WISHLIST OR OTHER PAGE)
      const redirectTo = localStorage.getItem("redirectAfterLogin");
      console.log("8. Redirect to:", redirectTo || "default");
      
      // if (redirectTo) {
      //   // Remove the redirect item from localStorage
      //   localStorage.removeItem("redirectAfterLogin");
      //   // Redirect to the saved path (wishlist or any other page)
      //   router.push(redirectTo);
      // } else {
      //   // No saved redirect, use role-based redirect
      //   if (data.user?.role === "admin") {
      //     console.log("9. Redirecting to /admin");
      //     router.push("/admin");
      //   } else {
      //     console.log("9. Redirecting to /");
      //     router.push("/");
      //   }
      // }
      
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-app max-w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex-1  max-w-xl border p-4 md:p-10 border-text-clr rounded-xl"
      >
       <div className="flex flex-col space-y-4 justify-center items-center">
        <Image
          src="/assets/icons/lll.jpg"
          alt="Logo"
          width={100}
          height={100}
          className="w-[42px] h-[48px] bg-white rounded-xs"
        />
        <h1 className="text-2xl font-bold text-white">Sign in to Epic Games</h1>
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            className={`bg-slate-800 text-white min-w-sm  placeholder:text-slate-500 h-12 rounded-lg transition-colors ${
              emailError
                ? "border-2 border-red-500"
                : "border-slate-600 focus:border-cyan-500"
            }`}
          />
        </div>

        {/* PASSWORD */}
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-slate-800 text-white placeholder:text-slate-500 h-12 rounded-lg border-slate-600 focus:border-cyan-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          disabled={loading || emailError}
          className="w-full bg-btn-primary hover:bg-btn-primary/60 disabled:bg-slate-600 text-slate-900 font-semibold h-12 rounded-lg"
        >
          {loading ? "Logging in..." : "Continue"}
        </Button>
      </form>
    </div>
  );
}