let topics = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
    'Option 9',
    'Option 10',
];

function initialButtons(arr) {
    for (let i = 0; i < arr.length; i++) {
        btn(arr[i]);
    }
}

function btn(text) {
    $('#options').append($('<button class="btn">').text(text));
}

function getRes(req) {
    const xhr = $.get(
        `http://api.giphy.com/v1/gifs/search?q=
        ${slugifyReq(req)}
        &api_key=vJdz7OAM8teqL32SLGGOQW1KDNmgHztb&limit=10`
    );

    let out = [];

    xhr.done(function(req) {
        for (let i = 0; i < req.data.length; i++) {
            out.push(req.data[i].title);
        }
        console.log(out);
        return out;
    });
}

function slugifyReq(req) {
    return req.replace(/\s+/g, '+').toLowerCase();
}

function addGifs(req) {
    const res = getRes(req);

    console.log(res);
}
initialButtons(topics);

addGifs('hi');
