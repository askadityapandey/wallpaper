import { Cloudinary } from 'cloudinary-core';
import { config } from 'dotenv';

config();

const cloudinary = new Cloudinary({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  secure: true
});

export default cloudinary;
