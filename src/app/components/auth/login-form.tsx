import { useAuthStore } from "@/app/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const LoginForm = () => {
  const { login, isAuthenticated, isLoading, error } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push("/dashboard");
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const credentials = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    await login(credentials);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <label className="text-sm font-medium text-neutral-200">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-300 focus:border-neutral-400 outline-none transition-all placeholder:text-neutral-400"
          placeholder="name@whatever.com"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-neutral-200">Password</label>
        <input
          type="password"
          name="password"
          required
          className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-300 focus:border-neutral-400 outline-none transition-all placeholder:text-neutral-400"
          placeholder="••••••••"
        />
      </div>

      {error && <div className="p-1 text-xs text-red-400">[ {error} ]</div>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 text-white font-medium rounded-lg transition-all focus:ring-2 focus:ring-neutral-300"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
            Signing in...
          </span>
        ) : (
          "Sign In"
        )}
      </button>

      <div className="text-center text-sm text-neutral-500">
        <a
          href="/forgot-password"
          className="hover:text-neutral-700 underline underline-offset-4"
        >
          Forgot password?
        </a>
      </div>

      <p className="text-center text-sm text-neutral-500">
        No account?{" "}
        <a
          href="/signup"
          className="text-neutral-600 hover:text-neutral-100 underline underline-offset-4"
        >
          Register
        </a>
      </p>
    </form>
  );
};
