import { error } from '@sveltejs/kit';
import { CLOUD_NAME, API_KEY, API_SECRET } from '$env/static/private';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

export async function load({ params }) {
  try {
    const result = await cloudinary.v2.api.resource(params.id);
    return { image: result };
  } catch (err) {
    console.error('Error fetching image:', err);
    throw error(404, 'Image not found');
  }
}