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
    const post = await posts.getByTag('home');
    const html = svelteRenderer.render('Home', req.params, post);
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
    const html = svelteRenderer.render('PostSingle', req.params, post);
    return res.send(html);
  } catch (error) {
    const html = svelteRenderer.render('NotFound', req.params, {
      error: error
    });
    return res.status(404).send(html);
  }
}

export async function getPostsByTag(req: Request, res: Response): Promise<Response> {
  try {
    req.params.title = "Tag";
    req.params.slug = req.params.tag;
    
    const post = await posts.getByTag(req.params.tag);
    const html = svelteRenderer.render('Tag', req.params, post);
    return res.send(html);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
