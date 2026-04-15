"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    name:false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup } = useAuth();
  const router = useRouter();

  const isValidEmail = (e: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  };

  const isValidPassword = (p: string) => p.length >= 8;
  const passwordsMatch = formData.password === formData.confirmPassword;

  const emailError =
    touched.email && formData.email && !isValidEmail(formData.email);
  const passwordError =
    touched.password &&
    formData.password &&
    !isValidPassword(formData.password);
  const confirmPasswordError =
    touched.confirmPassword && formData.confirmPassword && !passwordsMatch;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setTouched({
      name:true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    // Fix the name validation logic
    if (!formData.name || formData.name.trim() === "") {
      setError("Please enter a name");
      return;
    }

    if (!formData.email || !isValidEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!formData.password || !isValidPassword(formData.password)) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Use the signup function from useAuth hook
      const result = await signup(formData.name, formData.email, formData.password);

      if (result.success) {
        console.log("Signup successful!");

        // Redirect to home page after successful signup
        router.push("/");
      } else {
        setError(result.message || "Signup failed");
      }

    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-app max-w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex-1 justify-center items-center max-w-xl border p-4 md:p-10 border-text-clr rounded-xl"
      >
         <div className="flex flex-col space-y-4 justify-center items-center">
                <Image
                  src="/assets/icons/lll.jpg"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="w-[42px] h-[48px] bg-white rounded-xs"
                />
                <h1 className="text-2xl font-bold text-white">Create Epic Games Account</h1>
                </div>
        {/* EMAIL */}
         <Input
          type="name"
          name="name"
          placeholder="User name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className="bg-primary outline-none border-text-clr-light text-white h-12"
        />
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="bg-primary outline-none border-text-clr-light text-white h-12"
        />

        {/* PASSWORD */}
        <Input
          type="password"
          name="password"
          placeholder="Password (min 8 chars)"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className="bg-primary outline-none border-text-clr-light text-white h-12"
        />

        {/* CONFIRM PASSWORD */}
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className="bg-primary outline-none border-text-clr-light text-white h-12"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-btn-primary text-slate-900 font-semibold h-12"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </div>
  );
}
