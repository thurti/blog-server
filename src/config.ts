const config: {
    PORT: number,
    POSTS: string,
    ORIGIN: string,
    STATIC: string,
    FRONTEND_INDEX: string,
    FRONTEND_INDEX_NOSCRIPT: string,
    FRONTEND_APP: string,
    BROWSERS: any
  } = {
    PORT: parseInt(process.env.PORT as string) || 3000,
    POSTS: process.env.POSTS || `${__dirname}/posts`,
    ORIGIN: process.env.ORIGIN || "http://localhost",
    STATIC: process.env.STATIC || `${__dirname}/static`,
    FRONTEND_INDEX: process.env.FRONTEND_INDEX || '',
    FRONTEND_INDEX_NOSCRIPT: process.env.FRONTEND_INDEX_NOSCRIPT || '',
    FRONTEND_APP: process.env.FRONTEND_APP || '',
    BROWSERS: {
      "ie": "12",
      "edge": "80",
      "chrome": "80",
      "firefox": "74",
      "safari": "13.7",
      "opera": "67",
      "ios": "13.7",
      "android": "89"
    }
};

export default config;