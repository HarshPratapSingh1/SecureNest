import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [popup, setPopup] = useState({ message: "", type: "" });

  // Load saved theme preference from localStorage on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Apply and save dark mode preference when it changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showPopup = (message, type = "error") => {
    setPopup({ message, type });
    setTimeout(() => setPopup({ message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://securenesttt.netlify.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        showPopup("Login successful", "success");
        setTimeout(() => navigate("/home"), 1000);
      } else {
        showPopup(data.message || "Invalid credentials!");
      }
    } catch (err) {
      console.error("Login error:", err);
      showPopup("Something went wrong. Try again.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-500 relative z-0 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-800 via-gray-900 to-black"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      {popup.message && (
        <div
          className={`absolute top-6 z-50 px-6 py-3 rounded-md text-white font-medium transition-all duration-300 shadow-lg ${
            popup.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {popup.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md p-10 backdrop-blur-lg rounded-3xl shadow-xl border transition-colors duration-500 ${
          isDarkMode
            ? "bg-white/10 border-gray-700"
            : "bg-white/90 border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Welcome Back 👋
          </h2>
          <button
            type="button"
            onClick={toggleDarkMode}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l.707.707M21 12h-1M4 12H3m16.243 4.243l-.707-.707M4.222 19.778l.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21.64 13.65A9 9 0 0110.35 2.36a9 9 0 1011.29 11.29z" />
              </svg>
            )}
          </button>
        </div>

        <div className="mb-6">
          <label
            htmlFor="username"
            className={`block mb-2 text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Email
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="password"
            className={`block mb-2 text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 pr-12 rounded-lg bg-white/80 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-blue-500 dark:text-gray-400 cursor-pointer"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4.5C7.305 4.5 3.135 7.262 1.5  12c1.635 4.738 5.805 7.5 10.5 7.5s8.865-2.762 10.5-7.5C20.865 7.262 16.695 4.5 12 4.5zM12 16.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" />
                  <path d="M12 10.5a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 12 10.5z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.686 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.228 7-9.542 7s-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md cursor-pointer"
        >
          Login
        </button>

        <p className={`mt-6 text-center text-sm ${!isDarkMode ? "text-gray-800" : "text-gray-200"}`}>
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
