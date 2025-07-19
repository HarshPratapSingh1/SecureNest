import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyGallery = () => {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [modalImage, setModalImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://securenest-t72z.onrender.com/mygallery", { withCredentials: true })
      .then((res) => {
        if (Array.isArray(res.data)) setImages(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch gallery:", err);
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      });
  }, [navigate]);

  const handleDelete = async (url) => {
    try {
      const res = await axios.delete(
        `https://securenest-t72z.onrender.com/delete?url=${encodeURIComponent(url)}`,
        { withCredentials: true }
      );

      setMessage(res.data.message || "Image deleted");
      setImages((prev) => prev.filter((img) => img.url !== url));
    } catch (err) {
      setMessage("Failed to delete image.");
      console.error("Delete error:", err);
    }
  };

  const openModal = (url) => {
    setModalImage(url);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center py-10 px-4"
      style={{
        backgroundImage:
          "url('https://private-user-images.githubusercontent.com/133925969/468240144-887f3049-d577-47c7-a56c-0c2fd0e632bc.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTI4ODU3MDAsIm5iZiI6MTc1Mjg4NTQwMCwicGF0aCI6Ii8xMzM5MjU5NjkvNDY4MjQwMTQ0LTg4N2YzMDQ5LWQ1NzctNDdjNy1hNTZjLTBjMmZkMGU2MzJiYy5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNzE5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDcxOVQwMDM2NDBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1lNjRjYTAyOGI4ZmRmNGRmYjRiYzk5MzJmZmQzNmYxMDM1Mjc1YjU1YTc1MTIwNTEyMzdjMTU2NTc0YzdhYWVmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.TcjPuJoYrZZoB88nx3yeVhusaDX7po42VGvpmHbS3v0')",
      }}
    >
      <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-10 w-full max-w-6xl">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-8">
          My Uploaded Files
        </h2>

        {message && (
          <div className="text-center mb-4 text-red-500 font-semibold">{message}</div>
        )}

        {images.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven’t uploaded any files yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((upload, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition duration-300 cursor-pointer"
              >
                <img
                  src={upload.url}
                  alt={`Uploaded ${idx}`}
                  className="w-full h-48 object-cover"
                  onClick={() => openModal(upload.url)}
                />
                <div className="p-3 text-sm text-gray-600">
                  Uploaded on: {new Date(upload.uploadedAt).toLocaleString()}
                </div>
                <div className="px-3 pb-3">
                  <button
                    onClick={() => handleDelete(upload.url)}
                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 text-sm cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/home")}
            className="inline-block bg-blue-600 hover:bg-blue-900 text-white font-medium py-2 px-6 rounded-lg cursor-pointer"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg overflow-hidden max-w-2xl w-full p-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-6 text-gray-800 hover:text-red-600 text-3xl font-bold cursor-pointer"
            >
              &times;
            </button>

            <img
              src={modalImage}
              alt="Full View"
              className="w-full h-auto rounded mb-4"
            />

            <div className="text-center">
              <a
                href={`https://securenest-t72z.onrender.com/download?url=${encodeURIComponent(
                  modalImage
                )}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGallery;
