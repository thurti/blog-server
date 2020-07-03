# Simple Node.js Markdown Blog

>**This repo is for documentation purpose only. It is not meant to be used in production. But feel free to use the code anyway...**

This is a simple node.js blog backend. The app reads markdown files from a directory, parses the front-matter meta data and returns all as json. It also has a simple HTML fallback for the js-is-evil folks.

## Usage
1) Create `.env` file
```env
PORT=5678
POSTS="/path/to/markdown/files"
STATIC="/path/to/static/files" //eg. images used in markdown files
ORIGIN="http://localhost:3000" //Access-Control-Allow-Origin header
```

2) `npm run dev`
3) JSON API
    - `http://localhost:3000/api/posts`
    - `http://localhost:3000/api/posts/[slug]`
4) HTML Fallback
    - `http://localhost:3000/`
    - `http://localhost:3000/[slug]`

## Markdown File with Frontmatter
Markdown files should have the following attributes in frontmatter. More attributes can be added.

**path/to/markdown/files/example_post.md**
```md
---
title: 'My First Blog Post'
slug: 'my-first-post'
created_at: '2019-01-01'
published: true
---

# Hello World!
```

## Development

```
npm run dev     //run app with ts-node
npm run watch   //run tests with ts-mocha
npm run build   //build typescript to /build
npm start       //run app from /build
```