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
    .image-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    .image {
      max-width: 100%;
      height: auto;
    }
  </style>
  
  <div class="image-grid">
    {#each images as image}
      <img 
        src={image.secure_url} 
        alt={image.public_id} 
        class="image"
      />
    {/each}
  </div>