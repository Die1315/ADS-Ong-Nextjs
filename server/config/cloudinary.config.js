const { v2: cloudinary } = require("cloudinary");

async function uploadImage(image) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  try {
    const result = await new Promise((resolve) => {
      cloudinary.uploader.upload_stream((error, uploadResult) => {
          return resolve(uploadResult);
      }).end(image);
    });
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}

module.exports = {
  "uploadImage": uploadImage
};
