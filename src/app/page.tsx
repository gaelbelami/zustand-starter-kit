"use client";
import { LoginForm } from "./components/auth/login-form";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className=" p-8 rounded-xl shadow-sm border border-neutral-100">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
