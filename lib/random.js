let seed = null;

// simple seeded random number generator
function seeded_random() {
    if (seed === null) {
        return Math.random();
    }

    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
}

function set_seed(new_seed) {
    seed = new_seed;
}

function random_int(min, max) {
    return Math.floor(seeded_random() * (max - min + 1)) + min;
}

function random_choice(arr) {
    return arr[random_int(0, arr.length - 1)];
}

function string(length) {
    const len = length || random_int(5, 12);
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < len; i++) {
        result += chars[random_int(0, chars.length - 1)];
    }

    return result;
}

function number(min, max) {
    const min_val = min !== undefined ? min : 1;
    const max_val = max !== undefined ? max : 100;
    return random_int(min_val, max_val);
}

function boolean() {
    return seeded_random() > 0.5;
}

function email() {
    const first_name = string(random_int(5, 10));
    const domain = random_choice([
        'gmail.com',
        'yahoo.com',
        'outlook.com',
        'example.com',
        'test.com'
    ]);
    return `${first_name}@${domain}`;
}

function uuid() {
    const hex_chars = '0123456789abcdef';
    let result = '';

    for (let i = 0; i < 32; i++) {
        if (i === 12) {
            result += '4'; // version 4
        } else if (i === 16) {
            result += hex_chars[random_int(8, 11)]; // variant bits
        } else {
            result += hex_chars[random_int(0, 15)];
        }

        // add hyphens at standard uuid positions
        if (i === 7 || i === 11 || i === 15 || i === 19) {
            result += '-';
        }
    }

    return result;
}

module.exports = {
    set_seed,
    random_int,
    random_choice,
    string,
    number,
    boolean,
    email,
    uuid
};
