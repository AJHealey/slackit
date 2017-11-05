
const https = require("https");
const Post = require("./Post.js").Post;
const REDDIT_URL = "https://www.reddit.com/";

/**
 *
 * @param subreddit(String|*|s
 * @param callback
 */
function getRandomPostFrom(subreddit, callback) {
    https.get(urlForHotPostsOf(subreddit), function(response) {
        let body = '';
        response.on('data', function(chunk) {
            body += chunk;
        }).on('end', function() {
            callback(parseResponse(JSON.parse(body)));
        }).on('error', function(e) {
            console.error("Error during the call to the Reddit API: " + e.message);
        });
    });
}

/**
 *
 * @param posts
 * @returns {*}
 */
function parseResponse(posts) {
    if(posts.kind === 'Listing' && posts.data) {
        return parseListing(posts.data);
    }
}

/**
 *
 * @param listing
 * @returns {*}
 */
function parseListing(listing) {
    if(listing.children) {
        let post = getRandomElementFrom(listing.children);
        console.log(post);
        return Post.from(post.data)
    }
}

/**
 * Construct the url from which the posts will be retrieved
 * @param subreddit - subreddit that will be used to get a post
 * @returns {string} the url used to gather the posts from the given subreddit
 */
function urlForHotPostsOf(subreddit) {
    return REDDIT_URL + `r/${subreddit}/hot/.json`;
}

/**
 * Get a random element from the given array
 * @param array - the array from which the element will be selected
 * @returns {*} - an element from array
 */
function getRandomElementFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

module.exports.getRandomPostFrom = getRandomPostFrom;
