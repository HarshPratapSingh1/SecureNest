// src/pages/Landing.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/animation_lk2xje3v.json";

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) navigate("/home");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <header className="my-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600">Cloud Gallery</h1>
        <p className="mt-2 text-lg text-gray-600">Securely upload and view your photos in the cloud</p>
      </header>

      <div className="w-full max-w-md mx-auto">
        <Lottie animationData={animationData} loop={true} />
      </div>

      <div className="mt-6 space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Register
        </button>
      </div>

      <footer className="mt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Cloud Gallery. All rights reserved.
      </footer>
    </div>
  );
}

export default Index;
