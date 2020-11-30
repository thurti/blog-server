import { Request, Response } from "express";
import config from '../config';
import PostDirReader from "../lib/PostDirReader";
import Posts from "../model/Posts";
import path from 'path';
import 'svelte/register';
import { readFileSync } from "fs";

const reader = new PostDirReader(config.POSTS);
const posts = new Posts(reader);

const frontend_index = readFileSync(path.resolve(config.FRONTEND_INDEX));
const Single = require(path.resolve(config.FRONTEND_SINGLE)).default;

export async function getSinglePost(req: Request, res: Response): Promise<Response> {
  try {
    const post = await posts.getBySlug(req.params.slug);
    const {html, css, head} = Single.render({
      content: post,
      generate: 'ssr',
      hydrate: true
    });

    const parsed_html = frontend_index.toString()
                          .replace(/<!-- SSR_META -->/g, head)
                          .replace(/<!-- SSR_CSS -->/g, css.code)
                          .replace(/<!-- SSR_HTML -->/g, html);

    return res.send(parsed_html);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getPostsByTag(req: Request, res: Response): Promise<Response> {
  return res.send('test');
}