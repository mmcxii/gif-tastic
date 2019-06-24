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
    // Pieces
    const $gifCard = $(`<div class="gif-card" id='${id}' data-playing=false>`);
    const $gifRating = $('<div class="gif-rating">').text(rating);
    const $gifImg = $(`<img class='gif-img' src='${url}'>`);

    // Build card
    $gifCard.append($gifRating).append($gifImg);

    // Display card
    $('#gifs').append($gifCard);
}

// Button for gif topic
function btn(text) {
    // Build button
    const $btn = $(`<button class="btn">`).text(text);

    // Display button
    $('#options').append($btn);
}

/* Functionality */

// Sends a request to the api and makes a gif card for each result
function getRes(req) {
    // Construct url with api key and slugified request
    const apiKey = 'vJdz7OAM8teqL32SLGGOQW1KDNmgHztb';
    const queryURL = `https://api.giphy.com/v1/gifs/search?q=${slugify(
        req
    )}&api_key=${apiKey}&limit=10`;

    // Make a request using ajax
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function(res) {
        // Make a gif card for each gif returned
        $.each(res.data, (i, gif) => {
            gifCard(gif.id, gif.images['original_still'].url, gif.rating);
        });
    });
}

/* On click */

// Play/ pause functionality
function playPause(playing, id, current) {
    // If the gif is stopped, start it
    if (playing === 'false') {
        // Select correct gif by id
        $(`#${id} > .gif-img`).attr(
            'src',
            `https://media2.giphy.com/media/${id}/giphy.gif?cid=${id}&rid=giphy.gif`
        );
        // Mark gif as playing
        current.dataset.playing = 'true';

        // If the gif is playing, stop it
    } else {
        // Select correct gif by id
        $(`#${id} > .gif-img`).attr(
            'src',
            `https://media0.giphy.com/media/${id}/giphy_s.gif?cid=${id}&rid=giphy_s.gif`
        );
        // Mark gif as stopped
        current.dataset.playing = 'false';
    }
}

// Removes all gifs from display
function clearGifs() {
    // Empty the display
    $('#gifs').empty();
}

/* Helper */

// Repleaces spaces with + and sets input to lower case
function slugify(req) {
    return req.replace(/\s+/g, '+').toLowerCase();
}

/* Intialize */

// Load functions and on clicks when document is loaded
$(document).ready(function() {
    initialButtons(topics);

    // Assign the clear gifs button its function
    $('#clear-gifs-btn').on('click', clearGifs);

    // Assign all buttons the ability to get gifs
    $('#options').on('click', '.btn', function() {
        getRes(this.innerText);
    });

    // Assign all gifs the ability to play and pause
    $('#gifs').on('click', '.gif-card', function() {
        playPause(this.dataset.playing, this.id, this);
    });

    // Search form functionality
    $('#search-group').submit((e) => {
        const $input = $('#search-field');

        // Create a button for searched term and get gifs
        btn($input.val());
        getRes($input.val());

        // Empty search field
        $input.val('');
        e.preventDefault();
    });
});
