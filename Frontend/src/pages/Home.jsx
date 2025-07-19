import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("https://securenest-t72z.onrender.com/profile", {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401) {
          navigate("/login");
        } else if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setLoading(false);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await fetch("https://securenest-t72z.onrender.com/logout", {
      method: "GET",
      credentials: "include",
    });
    navigate("/login");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoadingUpload(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://securenest-t72z.onrender.com/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setUploadSuccess(true);
        setShowPopup(false);
        setFile(null);
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoadingUpload(false);
    }
  };

  if (loading) return null;

  return (
    <>
      {/* ✅ Upload success toast */}
      {uploadSuccess && (
        <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-3 rounded shadow-lg animate-slide-in">
          ✅ File uploaded successfully!
        </div>
      )}

      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage:
            "url('https://private-user-images.githubusercontent.com/133925969/468239147-909242cf-d477-4422-b7c7-3cc8d9adc4d7.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTI4ODQ4MjcsIm5iZiI6MTc1Mjg4NDUyNywicGF0aCI6Ii8xMzM5MjU5NjkvNDY4MjM5MTQ3LTkwOTI0MmNmLWQ0NzctNDQyMi1iN2M3LTNjYzhkOWFkYzRkNy5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNzE5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDcxOVQwMDIyMDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wY2Q2NTg5MjdkY2QzZjFmNzQ1ZmMyYTFmYTk3NjQzYTkxYzdiNmU4YmNhNDYwMWM3MTY2YzA3ZjNiYWJmZmUzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.Ty_Hap7WrQUJ_iUQco_76n9as0nanEpQh1JKY9xYaZ8')",
        }}
      >
        {/* Main Card */}
        <div className="backdrop-blur-md bg-white/70 rounded-xl shadow-lg p-10 text-center max-w-xl w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to CloudDrive</h1>
          <p className="text-gray-600 mb-8">Securely store, access, and share your files in the cloud.</p>

          <div className="flex justify-center gap-6">
            <button
              onClick={() => setShowPopup(true)}
              className="cursor-pointer text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-lg px-6 py-3 transition"
            >
              Upload
            </button>
            <a
              href="/mygallery"
              className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-lg text-lg px-6 py-3 transition"
            >
              My Gallery
            </a>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 text-red-500 hover:text-red-700 underline cursor-pointer"
          >
            Logout  
          </button>
        </div>

        {/* Upload Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <form
              onSubmit={handleFileUpload}
              className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Your File</h2>
              <p className="text-gray-600 mb-4">Drag and drop your files here or click to select.</p>

              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 
                      A5.5 5.5 0 0 0 5.2 5.02C5.1 5 5 5 5 5a4 4 0 0 0 0 8h2.2M10 15V6m0 
                      0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max 800x400px)</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {/* Upload Button with Spinner */}
              <button
                type="submit"
                disabled={loadingUpload}
                className="cursor-pointer mt-6 w-full flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-lg px-6 py-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingUpload && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                )}
                {loadingUpload ? "Uploading..." : "Upload File"}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl cursor-pointer"
              >
                ×
              </button>
            </form>
          </div>
        )}
      </div>

    </>
  );
}

export default Home;
