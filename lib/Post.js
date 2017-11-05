class Post {
    constructor(title, author, content, link, origin, isNsfw) {
        this.title = title;
        this.author = author;
        this.content = content;
        this.link = link;
        this.origin = origin;
        this.isNsfw = isNsfw;
    }

    static from(redditPost) {
        let title = redditPost.title;
        let author = `u/${redditPost.author}`;
        let content = redditPost.thumbnail;
        let link = `http://www.reddit.com${redditPost.permalink}`;
        let origin = `r/${redditPost.subreddit}`;
        let isNsfw = redditPost.over_18;

        return new Post(title, author, content, link, origin, isNsfw)
    }
}

module.exports.Post = Post;