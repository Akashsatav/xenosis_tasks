document.getElementById('generate-btn').addEventListener('click', generateRandomImage);

function generateRandomImage() {
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = 'Loading...';

    // Fetch a random image from the Pixabay API
    fetch('https://pixabay.com/api/?key=45141689-9b7b438bf36a7315ff427ee44&q=nature&image_type=photo&per_page=3&random=true')
         .then(response => response.json())
        .then(data => {
            // Clear the loading text
            imageContainer.innerHTML = '';

            if (data.hits && data.hits.length > 0) {
                // Select a random image from the fetched results
                const randomImage = data.hits[Math.floor(Math.random() * data.hits.length)];

                // Create an image element and set the src to the random image URL
                const img = document.createElement('img');
                img.src = randomImage.webformatURL;
                img.alt = 'Random Image';

                // Append the image to the container
                imageContainer.appendChild(img);
            } else {
                imageContainer.innerHTML = 'No images found. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error fetching image:', error);
            imageContainer.innerHTML = 'Failed to load image. Please try again.';
        });
}

