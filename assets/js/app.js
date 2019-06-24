let topics = [
    'dogs',
    'tacos',
    'snow',
    'hockey',
    'cats',
    'sugar glider',
    'gallagher',
    'cricket',
    'mountains',
    'stuff',
];

function initialButtons(arr) {
    for (let i = 0; i < arr.length; i++) {
        btn(arr[i]);
    }
}

function gifCard(url, rating) {
    const $gifCard = $('<div class="gif-card">');
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
        $.each(res.data, (i, gif) => {
            gifCard(gif.images['downsized'].url, gif.rating);
        });
    });
}

const $searchForm = $('#search-group');

$searchForm.submit((e) => {
    const $input = $('#search-field');
    btn($input.val());
    getRes($input.val());

    $input.val('');
    e.preventDefault();
});

function search(req) {
    btn(req);
    getRes(req);
}

function slugify(req) {
    return req.replace(/\s+/g, '+').toLowerCase();
}

$(document).ready(function() {
    initialButtons(topics);

    $('#options').on('click', '.btn', function() {
        getRes(this.innerText);
    });
});
