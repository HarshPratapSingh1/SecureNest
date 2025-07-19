// src/pages/Landing.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) navigate("/home");
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white px-4">
      <header className="text-center mt-8">
        <h1 className="text-5xl font-bold text-blue-700 tracking-tight drop-shadow-sm">
          SecureNest
        </h1>
        <p className="mt-3 text-lg sm:text-xl text-gray-600 font-medium">
          Securely upload and view your photos in the cloud
        </p>
      </header>

      {/* <div className="mt-8 w-full max-w-sm sm:max-w-md mx-auto rounded-xl shadow-lg overflow-hidden bg-white p-4">
        <Lottie animationData={animationData} loop={true} className="w-full h-auto" />
      </div> */}
      <div className="mt-8 flex space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition duration-300 cursor-pointer"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition duration-300 cursor-pointer"
        >
          Register
        </button>
      </div>

      <footer className="mt-12 text-sm text-gray-500 text-center">
        &copy; {new Date().getFullYear()} SecureNest. All rights reserved.
      </footer>
    </div>
  );
}

export default Index;
