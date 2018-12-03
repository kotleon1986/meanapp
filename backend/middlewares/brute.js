const ExpressBrute = require('express-brute');
const MemcachedStore = require('express-brute-memcached');
let store;

if (process.env.NODE_ENV === 'development'){
    store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
} else {
    // stores state with memcached
    store = new MemcachedStore(['127.0.0.1'], {
        prefix: 'NoConflicts'
    });
}

const bruteforce = new ExpressBrute(store, {
    freeRetries: 10
});
module.exports = bruteforce;
