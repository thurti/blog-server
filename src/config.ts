export default {
    PORT: process.env.PORT || 3000,
    POSTS: process.env.POSTS || `${__dirname}/posts`,
    ORIGIN: process.env.ORIGIN || "http://localhost",
    STATIC: process.env.STATIC || `${__dirname}/static`,
    TEMPLATES: process.env.TEMPLATES || `${__dirname}/templates`,
    FRONTEND: process.env.FRONTEND || `${__dirname}/frontend`,
    FRONTEND_INDEX: process.env.FRONTEND_INDEX || `${__dirname}/frontend/public/index.html`,
    FRONTEND_SINGLE: process.env.FRONTEND_SINGLE || `${__dirname}/frontend/src/views/Single.svelte`
};