<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let images = [];
  let currentImage = null;
  let imageId;
  let error = null;

  $: {
    const pathParts = $page.url.pathname.split('/');
    imageId = pathParts.length > 2 ? pathParts[2] : null;
    console.log('Current imageId:', imageId); // Add this log
  }

  onMount(async () => {
    if (imageId) {
      try {
        const response = await fetch(`/api/image/${imageId}`);
        if (response.ok) {
          currentImage = await response.json();
        } else {
          throw new Error('Failed to fetch image');
        }
      } catch (err) {
        console.error('Error:', err);
        error = err.message;
      }
    } else {
      try {
        const response = await fetch('/api/images');
        if (response.ok) {
          images = await response.json();
        } else {
          throw new Error('Failed to fetch images');
        }
      } catch (err) {
        console.error('Error:', err);
        error = err.message;
      }
    }
  });

  function downloadImage() {
    if (currentImage) {
      window.open(currentImage.secure_url, '_blank');
    }
  }
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
    .image-container {
      max-width: 800px;
      margin: 2rem auto;
      text-align: center;
    }
    .download-button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .contributor {
      margin-top: 1rem;
      font-style: italic;
    }
  </style>
  
  {#if error}
  <p>Error: {error}</p>
{:else if imageId}
  {#if currentImage}
    <div class="image-container">
      <img src={currentImage.secure_url} alt={currentImage.public_id} class="image" />
      <button class="download-button" on:click={downloadImage}>Download</button>
      <p class="contributor">Contributor: {currentImage.contributor || 'Unknown'}</p>
    </div>
  {:else}
    <p>Loading image...</p>
  {/if}
{:else}
  {#if images.length > 0}
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
  {:else}
    <p>Loading images...</p>
  {/if}
{/if}