<script>
  import { onMount } from 'svelte';
  import cloudinary from '../cloudinary';

  let images = [];

  onMount(async () => {
    try {
      const response = await fetch(`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/list/your_tag.json`);
      const data = await response.json();
      images = data.resources;
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  });
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {#each images as image}
    <img src={cloudinary.url(image.public_id)} alt={image.public_id} class="w-full h-auto" />
  {/each}
</div>

<style>
  img {
    transition: transform 0.2s;
  }
  img:hover {
    transform: scale(1.05);
  }
</style>
