<script>
    const cloudName = ''; // Replace with your Cloudinary cloud name
    const imageId = 'w-1';
    const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${imageId}`;

    // Provide meaningful alt text for the image
    const altText = 'Description of the image'; // Replace with an actual description of the image
</script>

<style>
    .image {
        max-width: 100%;
        height: auto;
    }
</style>

<img src={imageUrl} alt={altText} class="image">
