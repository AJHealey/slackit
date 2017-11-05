const https = require("https");
const SLACK_ENDPOINT = "hooks.slack.com";


/**
 * Send a post to a workspace through the Slack API.
 *
 * @param {url} hook: path to the hook linked to the concerned workspace
 * @param {Post} post: the post that will be sent to Slack
 */
function sendPost(hook, post) {
    let options = {
        hostname: SLACK_ENDPOINT,
        port: 443,
        path: hook,
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    };

    let request = https.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

    request.write(JSON.stringify(formatResponse(post)));
    request.end();
}

/**
 * Format the object that will be sent to the Slack API
 *
 * The post will be shown to the whole channel
 *
 * @param {Post} post - the post that will be injected into the object sent to Slack
 * @returns {{response_type: string, attachments: *[]}}
 */
function formatResponse(post) {
    return {
        response_type: "in_channel",
        attachments: [createAttachmentFrom(post)]
    }
}

/**
 * Format the attachment that will represent the Reddit post
 *
 * @param {Post} redditPost - the reddit post that will be sent to the user
 * @returns {{fallback: string, color: string, author_name: string, author_link: string, title: string, title_link: string, image_url: string}}
 */
function createAttachmentFrom(redditPost) {
    return {
        fallback: `A post from ${redditPost.origin}`,
        color: "#36a64f",
        author_name: redditPost.author,
        author_link: `http://www.reddit.com/${redditPost.author}`,
        title: redditPost.title,
        title_link: redditPost.link,
        image_url: redditPost.content,
    }
}

module.exports.sendPost = sendPost;
