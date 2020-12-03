const config: {
    PORT: number,
    POSTS: string,
    ORIGIN: string,
    STATIC: string,
    TEMPLATES: string,
    FRONTEND_INDEX: string,
    FRONTEND_APP: string,
    FRONTEND_ROUTES: string,
  } = {
    PORT: parseInt(process.env.PORT as string) || 3000,
    POSTS: process.env.POSTS || `${__dirname}/posts`,
    ORIGIN: process.env.ORIGIN || "http://localhost",
    STATIC: process.env.STATIC || `${__dirname}/static`,
    TEMPLATES: process.env.TEMPLATES || `${__dirname}/templates`,
    FRONTEND_INDEX: process.env.FRONTEND_INDEX || '',
    FRONTEND_APP: process.env.FRONTEND_APP || '',
    FRONTEND_ROUTES: process.env.FRONTEND_ROUTES || '',
};

export default config;