
import { json } from '@sveltejs/kit';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export async function GET() {
  try {
    const result = await cloudinary.v2.api.resources({
      type: 'upload',
      max_results: 100
    });

    const filteredImages = result.resources.filter(resource =>
      !resource.public_id.startsWith('samples/') &&
      !resource.public_id.includes('/samples/') // This covers nested "samples" folders
    );

    return json(filteredImages);
  } catch (error) {
    console.error('Error fetching images:', error);
    return json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}