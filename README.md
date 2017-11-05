[![Build Status](https://travis-ci.org/Dot-squad/slackit.svg?branch=master)](https://travis-ci.org/Dot-squad/slackit)
# Slackit
This is the code used to deploy an endpoint used with a slack app to post a random post from the given subreddit.


## Geddit - Reddit request
The first part of the app is to query a post from a subreddit. It retrieves the "hot" posts from it and select one of them randomly. The data is then stored in a Post object and sent to the "slackit" lib.


## Slackit - Slack formatting
This lib format a "Post" object and send it to a Slack hook endpoint.


## Resources
*[Reddit API](https://www.reddit.com/dev/api/)
*[Slack API](https://api.slack.com/)
*[Node HTTPS lib](https://nodejs.org/api/https.html)
