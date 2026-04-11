import React from "react";
import { LoginForm } from "../../components/LoginForm";
import { SignupForm } from "../../components/SignupForm";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
      <div>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <LoginForm />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        <SignupForm />
      </div>
    </div>
  );
}
