export default {
    PORT: process.env.PORT || 3000,
    POSTS: process.env.POSTS || `${__dirname}/posts`,
    ORIGIN: process.env.ORIGIN || "http://localhost",
    STATIC: process.env.STATIC || `${__dirname}/static`,
    TEMPLATES: process.env.TEMPLATES || `${__dirname}/templates`
};