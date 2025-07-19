const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Define Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'CloudDriveUploads', // Folder name on Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // Allowed file types
    public_id: (req, file) => {
      // Optional safety check in case req.user isn't available
      const username = req.user?.username || 'anonymous';
      return `${username}-${Date.now()}`;
    }
  }
});

module.exports = {
  cloudinary,
  storage
};
