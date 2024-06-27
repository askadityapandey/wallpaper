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
    <img src={data.image.secure_url} alt={data.image.public_id} class="image" />
    <button class="download-button" on:click={downloadImage}>Download</button>
    <p class="contributor">Contributor: {data.image.contributor || 'Unknown'}</p>
  </div>
{:else}
  <p>Image not found</p>
{/if}

<style>
  /* Your styles here */
</style>