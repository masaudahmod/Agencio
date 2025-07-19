import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("https://your-backend-url.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Invalid email or password");
      }

      // Success → You can redirect or set auth state here
      console.log("✅ Login success:", data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 rounded-xl p-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Agencio
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="">
            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="Password"
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {passwordVisible ? (
                  <FaEye className="cursor-pointer" />
                ) : (
                  <FaEyeSlash className="cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          <div className="text-sm text-balance">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </div>

          {/* Demo */}
          <div className="text-xs text-center text-gray-500 mt-4">
            <p className="font-semibold">Demo Credentials</p>
            <p>Admin: superAdmin@example.com / superAdmin123</p>
            <p>Designer: designer@example.com / designer123</p>
          </div>
        </form>
      </div>
    </div>
  );
}
