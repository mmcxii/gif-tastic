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

// Load buttons based on topics array
function initialButtons(arr) {
    for (let i = 0; i < arr.length; i++) {
        // Makes a button for each topic
        btn(arr[i]);
    }
}

// Gif card with image and rating displayed
function gifCard(id, url, rating) {
    // Select target
    const gifs = document.getElementById('gifs');

    // Pieces
    const gifCard = document.createElement('div');
    gifCard.setAttribute('class', 'gif-card');
    gifCard.setAttribute('id', id);
    gifCard.setAttribute('data-playing', 'false');

    const gifRating = document.createElement('div');
    gifRating.setAttribute('class', 'gif-rating');
    gifRating.textContent = rating;

    const gifImg = document.createElement('img');
    gifImg.setAttribute('class', 'gif-img');
    gifImg.setAttribute('src', url);

    // Build card
    gifCard.appendChild(gifRating);
    gifCard.appendChild(gifImg);

    // Display card
    gifs.appendChild(gifCard);
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
                gifCard(gif.id, gif.images['original_still'].url, gif.rating);
            });
        });
}

/* On click */

// Play/ pause functionality
function playPause(playing, id, current) {
    // Select correct gif by id
    const currentGif = document.querySelector(`#${id} > .gif-img`);

    if (playing === 'false') {
        // If the gif is stopped, start it
        currentGif.setAttribute(
            'src',
            `https://media2.giphy.com/media/${id}/giphy.gif?cid=${id}&rid=giphy.gif`
        );

        // Mark gif as playing
        current.dataset.playing = 'true';
    } else {
        // If the gif is playing, stop it
        currentGif.setAttribute(
            'src',
            `https://media0.giphy.com/media/${id}/giphy_s.gif?cid=${id}&rid=giphy_s.gif`
        );

        // Mark gif as stopped
        current.dataset.playing = 'false';
    }
}

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

/* Intialize */

// Load functions and on clicks when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load initial buttons
    initialButtons(topics);

    // Assign the clear gifs button its function
    const clearGifsBtn = document.getElementById('clear-gifs-btn');
    clearGifsBtn.onclick = clearGifs;

    // Assign all buttons the ability to get gifs
    const options = document.getElementById('options');
    options.addEventListener('click', (e) => {
        // Only buttons are selected, not parent
        if (e.target !== e.currentTarget) {
            getRes(e.target.textContent);
        }
        e.stopPropagation();
    });

    // Assign all gifs the ability to play and pause
    const gifs = document.getElementById('gifs');
    gifs.addEventListener('click', (e) => {
        // Only cards are selected, not parent
        if (e.target !== e.currentTarget) {
            // Selects card when image is clicked
            const card = e.target.parentNode;
            playPause(card.dataset.playing, card.id, card);
        }
        e.stopPropagation();
    });

    // Search form functionality
    const searchGroup = document.getElementById('search-group');
    searchGroup.addEventListener('submit', (e) => {
        const input = document.getElementById('search-field');

        // Create a button for searched term and get gifs
        btn(input.value);
        getRes(input.value);

        // Empty search field
        input.value = '';
        e.preventDefault();
    });
});
