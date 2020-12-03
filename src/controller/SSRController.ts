import { Request, Response } from "express";
import { readFileSync } from "fs";
import path from "path";
import config from '../config';
import PostDirReader from "../lib/PostDirReader";
import SvelteRenderer from '../lib/SvelteRenderer';
import Posts from "../model/Posts";

const reader = new PostDirReader(config.POSTS);
const posts = new Posts(reader);

const frontend_index = readFileSync(path.resolve(config.FRONTEND_INDEX)).toString();
const App = require(path.resolve(config.FRONTEND_APP));
const svelteRenderer = new SvelteRenderer(App, frontend_index);


export async function getIndex(req: Request, res: Response): Promise<Response> {
  try {
    const post = await posts.all();
    const html = svelteRenderer.render('Index', req.params, post);
    return res.send(html);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getAbout(req: Request, res: Response): Promise<Response> {
  try {
    const html = svelteRenderer.render('About', req.params, []);
    return res.send(html);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getSinglePost(req: Request, res: Response): Promise<Response> {
  try {
    const post = await posts.getBySlug(req.params.slug);
    const html = svelteRenderer.render('Single', req.params, post);
    return res.send(html);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getPostsByTag(req: Request, res: Response): Promise<Response> {
  try {
    const post = await posts.getByTag(req.params.tag);
    const html = svelteRenderer.render('Tag', req.params, post);
    return res.send(html);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
