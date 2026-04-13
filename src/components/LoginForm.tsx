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
      // Use the login function from useAuth hook
      const result = await login(email, password);

      if (result.success) {
        console.log("Login successful!");

        // Check for redirect after login
        const redirectTo = localStorage.getItem("redirectAfterLogin");

        if (redirectTo) {
          // Remove the redirect item from localStorage
          localStorage.removeItem("redirectAfterLogin");
          // Redirect to the saved path (wishlist or any other page)
          router.push(redirectTo);
        } else {
          // Default redirect to home
          router.push("/");
        }
      } else {
        setError(result.message || "Login failed");
      }

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
          disabled={loading || !!emailError}
          className="w-full bg-btn-primary hover:bg-btn-primary/60 disabled:bg-slate-600 text-slate-900 font-semibold h-12 rounded-lg"
        >
          {loading ? "Logging in..." : "Continue"}
        </Button>
      </form>
    </div>
  );
}