// Variables
let topics = [
    'dogs',
    'tacos',
    'snow',
    'ragdoll cats',
    'futurama',
    'nursing memes',
    'rare puppers',
    'drunk bitches',
    'mountains',
    'vape nash',
];

/* Components */

// Gif card with image and rating displayed
function gifCard(id, still, url, rating) {
    // Select target
    const gifs = document.getElementById('gifs');

    // Pieces
    const gifCard = document.createElement('div');
    setAttributes(gifCard, { class: 'gif-card', id: id, 'data-playing': 'false' });

    const gifRating = document.createElement('div');
    gifRating.setAttribute('class', 'gif-rating');
    gifRating.textContent = rating;

    const gifImg = document.createElement('img');
    setAttributes(gifImg, { class: 'gif-img', src: still, 'data-alt': url });

    // Build card
    gifCard.appendChild(gifRating);
    gifCard.appendChild(gifImg);

    // Display card
    gifs.prepend(gifCard);
}

// Button for gif topic
function btn(text) {
    // Select target
    const options = document.getElementById('options');

    // Build button
    const btn = document.createElement('button');
    btn.setAttribute('class', 'btn');
    btn.textContent = text;

    // Display button
    options.appendChild(btn);
}

/* Functionality */

// Sends a request to the api and makes a gif card for each result
function getRes(req) {
    // Construct url with api key and slugified request
    const apiKey = 'vJdz7OAM8teqL32SLGGOQW1KDNmgHztb';
    const queryURL = `https://api.giphy.com/v1/gifs/search?q=${slugify(
        req
    )}&api_key=${apiKey}&limit=10`;

    // Make request using fetch api
    fetch(queryURL)
        .then((res) => res.json())
        .then((data) => {
            data.data.forEach((gif) => {
                gifCard(
                    gif.id,
                    gif.images['original_still'].url,
                    gif.images['original'].url,
                    gif.rating
                );
            });
        })
        .catch((error) => console.error(error));
}

/* On click */

// Removes all gifs from display
function clearGifs() {
    // Select target
    const gifs = document.getElementById('gifs');

    // Empty the display
    while (gifs.firstChild) gifs.removeChild(gifs.firstChild);
}

/* Helper */

// Repleaces spaces with + and sets input to lower case
function slugify(req) {
    return req.replace(/\s+/g, '+').toLowerCase();
}

// Sets multiple attributes for an element at once
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Renders Buttons
function renderButtons(arr) {
    // Empties previous buttons
    const options = document.getElementById('options');
    while (options.firstChild) options.removeChild(options.firstChild);

    // Makes a button for each topic
    arr.forEach((topic) => {
        btn(topic);
    });
}

/* Intialize */

// Load functions and on clicks when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load initial buttons
    renderButtons(topics);

    // Assign the clear gifs button its function
    const clearGifsBtn = document.getElementById('clear-gifs-btn');
    clearGifsBtn.onclick = clearGifs;

    // Assign all buttons the ability to get gifs
    const options = document.getElementById('options');
    options.addEventListener('click', (e) => {
        // Only buttons are selected, not parent
        if (!e.target.matches('.btn')) {
            return;
        } else {
            getRes(e.target.textContent);
        }
    });

    // Assign all gifs the ability to play and pause
    const gifs = document.getElementById('gifs');
    gifs.addEventListener('click', (e) => {
        // Only cards are selected, not parent
        if (!e.target.matches('.gif-img')) {
            return;
        } else {
            // Selects card when image is clicked
            const temp = e.target.src;
            e.target.src = e.target.dataset.alt;
            e.target.dataset.alt = temp;
        }
    });

    // Search form functionality
    const searchGroup = document.getElementById('search-group');
    searchGroup.addEventListener('submit', (e) => {
        e.preventDefault();

        const input = document.getElementById('search-field');

        // Stores topic in array and re-renders buttons
        topics.push(input.value);
        renderButtons(topics);

        // Displays gifs
        getRes(input.value);

        // Empty search field
        input.value = '';
    });
});
