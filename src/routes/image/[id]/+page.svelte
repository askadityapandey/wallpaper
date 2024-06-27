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
    background-color: #1D1F20; /* Dark background to match gradient-border */
    margin: var(--borderWidth);
    border-radius: 12px; /* Slightly smaller than the outer radius */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6rem;
    max-width: 1400px; /* Increased from 1200px */
    margin: 0 auto;
    background-color: #070014;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .image-wrapper {
    width: 100%;
    height: 0;
    padding-bottom: 75%; /* Changed from 56.25% for a 4:3 aspect ratio */
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
    width: 100%; /* Added to ensure full width in column layout */
  }

  h2 {
    font-size: 2.5rem; /* Increased from 2rem */
    color: #333;
    margin-bottom: 1rem;
  }

  .contributor {
    font-style: italic;
    color: #666;
    margin-bottom: 1rem;
    font-size: 1.2rem; /* Increased font size */
  }

  .download-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 1rem 2rem; /* Increased padding */
    font-size: 1.2rem; /* Increased font size */
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

  @media (min-width: 968px) { /* Increased from 768px for larger screens */
    .image-container {
      flex-direction: row;
      align-items: flex-start;
    }

    .image-wrapper {
      width: 70%; /* Increased from 60% */
    }

    .image-info {
      width: 30%; /* Decreased from 40% */
      margin-top: 0;
      margin-left: 2rem;
      text-align: left;
    }
    .gradient-border {
    --borderWidth: 3px;
    background: #1D1F20;
    position: relative;
    border-radius: 15px;
  }

  .gradient-border:after {
    content: '';
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
    border-radius: 15px;
    z-index: -1;
    animation: animatedgradient 3s ease alternate infinite;
    background-size: 300% 300%;
  }

  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  }
</style>