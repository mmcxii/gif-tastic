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

function initialButtons(arr) {
    for (let i = 0; i < arr.length; i++) {
        btn(arr[i]);
    }
}

function gifCard(id, url, rating) {
    const $gifCard = $(`<div class="gif-card" id='${id}' data-playing=false>`);
    const $gifRating = $('<div class="gif-rating">').text(rating);
    const $gifImg = $(`<img class='gif-img' src='${url}'>`);

    $gifCard.append($gifRating).append($gifImg);

    $('#gifs').append($gifCard);
}

function btn(text) {
    const $btn = $(`<button class="btn">`).text(text);

    $('#options').append($btn);
}

function getRes(req) {
    const queryURL = `https://api.giphy.com/v1/gifs/search?q=${slugify(
        req
    )}&api_key=vJdz7OAM8teqL32SLGGOQW1KDNmgHztb&limit=10`;

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function(res) {
        console.log(res.data); //
        $.each(res.data, (i, gif) => {
            gifCard(gif.id, gif.images['original_still'].url, gif.rating);
        });
    });
}

function playPause(playing, id, current) {
    if (playing === 'false') {
        $(`#${id} > .gif-img`).attr(
            'src',
            `https://media2.giphy.com/media/${id}/giphy.gif?cid=${id}&rid=giphy.gif`
        );
        current.dataset.playing = 'true';
    } else {
        $(`#${id} > .gif-img`).attr(
            'src',
            `https://media0.giphy.com/media/${id}/giphy_s.gif?cid=${id}&rid=giphy_s.gif`
        );
        current.dataset.playing = 'false';
    }
}

function clearGifs() {
    $('#gifs').empty();
}

function slugify(req) {
    return req.replace(/\s+/g, '+').toLowerCase();
}

$(document).ready(function() {
    initialButtons(topics);

    $('#clear-gifs-btn').on('click', clearGifs);

    $('#options').on('click', '.btn', function() {
        getRes(this.innerText);
    });

    $('#gifs').on('click', '.gif-card', function() {
        playPause(this.dataset.playing, this.id, this);
    });

    $('#search-group').submit((e) => {
        const $input = $('#search-field');
        btn($input.val());
        getRes($input.val());

        $input.val('');
        e.preventDefault();
    });
});
