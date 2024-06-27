<script>
  export let data;

  function downloadImage() {
    if (data.image) {
      window.open(data.image.secure_url, '_blank');
    }
  }
</script>

{#if data.image}
  <div class="image-container">
    <div class="image-wrapper">
      <img src={data.image.secure_url} alt={data.image.public_id} class="image" />
    </div>
    <div class="image-info">
      <h2>Image Details</h2>
      <p class="contributor">Contributor: {data.image.contributor || 'Unknown'}</p>
      <button class="download-button" on:click={downloadImage}>Download</button>
    </div>
  </div>
{:else}
  <p>Image not found</p>
{/if}

<style>
  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #f0f0f0;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .image-wrapper {
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
  }

  .image-wrapper:hover {
    transform: scale(1.02);
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-info {
    margin-top: 2rem;
    text-align: center;
  }

  h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 1rem;
  }

  .contributor {
    font-style: italic;
    color: #666;
    margin-bottom: 1rem;
  }

  .download-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .download-button:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }

  .download-button:active {
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    .image-container {
      flex-direction: row;
      align-items: flex-start;
    }

    .image-wrapper {
      width: 60%;
    }

    .image-info {
      width: 40%;
      margin-top: 0;
      margin-left: 2rem;
      text-align: left;
    }
  }
</style>