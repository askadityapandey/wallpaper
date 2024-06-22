<!-- src/routes/+page.svelte -->
<script>
  import { onMount } from 'svelte';

  let images = [];

  onMount(async () => {
    const response = await fetch('/api/images');
    if (response.ok) {
      images = await response.json();
    } else {
      console.error('Failed to fetch images');
    }
  });
</script>

<style>
  .bento-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }
  .image-card {
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    transition: transform 0.3s ease;
  }
  .image-card:hover {
    transform: scale(1.05);
  }
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<div class="bento-grid">
  {#each images as image}
    <a href={`/image/${image.public_id}`} class="image-card">
      <img 
        src={image.secure_url} 
        alt={image.public_id} 
        class="image"
      />
    </a>
  {/each}
</div>